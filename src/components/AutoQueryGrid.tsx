import React, { useState, useMemo, useEffect, useCallback, useRef, useImperativeHandle, forwardRef, useContext, type CSSProperties, type ReactNode } from 'react'
import type { JsonServiceClient } from '@servicestack/client'
import type { ApiPrefs, ApiResponse, Column, ColumnSettings, MetadataPropertyType, GridAllowOptions, GridShowOptions } from '@/types'
import type { AutoQueryGridProps } from '@/components/types'
import { ApiResult, appendQueryString, combinePaths, delaySet, leftPart, mapGet, queryString, rightPart } from '@servicestack/client'
import { Apis, createDto, getPrimaryKey, isComplexProp, typeProperties, useMetadata } from '@/use/metadata'
import { a, grid } from './css'
import { asOptions, asStrings, copyText, getTypeName, parseJson, pushState, uniqueIgnoreCase } from '@/use/utils'
import { canAccess, useAuth } from '@/use/auth'
import { Sole } from '@/use/config'
import { ClientContext } from '@/use/context'
import EnsureAccess from './EnsureAccess'
import EnsureAccessDialog from './EnsureAccessDialog'
import FilterColumn from './grids/FilterColumn'
import FilterViews from './grids/FilterViews'
import QueryPrefs from './grids/QueryPrefs'
import { useConfig } from '@/use/config'
import AutoCreateForm from './AutoCreateForm'
import AutoEditForm from './AutoEditForm'
import AutoViewForm from './AutoViewForm'
import ErrorSummary from './ErrorSummary'
import Loading from './Loading'
import DataGrid from './DataGrid'
import SettingsIcons from './SettingsIcons'
import Alert from './Alert'

export interface AutoQueryGridRef {
    update: () => Promise<void>
    search: (args: any) => Promise<void>
    createRequestArgs: () => Record<string, any>
    reset: () => void
    createDone: () => void
    createSave: () => Promise<void>
    editDone: () => void
    editSave: () => Promise<void>
    forceUpdate: () => void
    setEdit: (props: any) => void
    edit: any
    createForm: any
    editForm: any
    apiPrefs: ApiPrefs
    results: any[]
    skip: number
    take: number
    total: number
}

// Event handlers and callbacks
interface AutoQueryGridCallbacks {
    onHeaderSelected?: (name: string, e: React.MouseEvent) => void
    onRowSelected?: (item: any, ev: React.MouseEvent) => void
    onNav?: (args: any) => void
}

// Slot/children props
interface AutoQueryGridSlots {
    children?: ReactNode
    toolbar?: ReactNode
    toolbarButtons?: (props: { toolbarButtonClass: string }) => ReactNode
    createForm?: (props: {
        type: string
        configure: (field: any) => void
        done: () => void
        save: () => Promise<void>
    }) => ReactNode
    editForm?: (props: {
        model: any
        type: string
        deleteType: string | null
        configure: (field: any) => void
        done: () => void
        save: () => Promise<void>
    }) => ReactNode
    viewForm?: (props: {
        model: any
        apis: Apis
        done: () => void
    }) => ReactNode
    formHeader?: (props: {
        form: 'create' | 'edit'
        formInstance: any
        apis: Apis
        type?: string
        model?: any
        id?: any
        updateModel: (props: any) => void
    }) => ReactNode
    formFooter?: (props: {
        form: 'create' | 'edit'
        formInstance: any
        apis: Apis
        type?: string
        model?: any
        id?: any
        updateModel: (props: any) => void
    }) => ReactNode
    columnSlots?: Record<string, (props: any) => ReactNode>
    headerSlots?: Record<string, (props: any) => ReactNode>
}

// Combined props for internal use
type AutoQueryGridComponentProps = AutoQueryGridProps & AutoQueryGridCallbacks & AutoQueryGridSlots

export const AutoQueryGrid = forwardRef<AutoQueryGridRef, AutoQueryGridComponentProps>((props, ref) => {
    const {
        id = 'AutoQueryGrid',
        skip: initialSkip = 0,
        onHeaderSelected,
        onRowSelected,
        onNav,
        children,
        toolbar,
        toolbarButtons,
        createForm: createFormSlot,
        editForm: editFormSlot,
        viewForm: viewFormSlot,
        formHeader,
        formFooter,
        columnSlots,
        headerSlots,
        ...restProps
    } = props

    const client = useContext(ClientContext)
    if (!client) {
        throw new Error('AutoQueryGrid must be used within a ClientContext.Provider')
    }

    const { config, autoQueryGridDefaults } = useConfig()
    const aqd = autoQueryGridDefaults
    const storage = config.storage!

    // State
    const [columns, setColumns] = useState<Column[]>([])
    const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())
    const [editApi, setEditApi] = useState<ApiResponse>(new ApiResult<any>())
    const [open, setOpen] = useState<"filters" | null>(null)
    const [create, setCreate] = useState(false)
    const [editId, setEditId] = useState<any>()
    const [edit, setEdit] = useState<any>()
    const [showQueryPrefs, setShowQueryPrefs] = useState(false)
    const [showFilters, setShowFilters] = useState<{ column: Column, topLeft: { x: number, y: number } } | null>(null)
    const [skip, setSkip] = useState(initialSkip)
    const [copiedApiUrl, setCopiedApiUrl] = useState(false)
    const [apiPrefs, setApiPrefs] = useState<ApiPrefs>({ take: 25 })
    const [apiLoading, setApiLoading] = useState(false)
    const [forceUpdateCounter, setForceUpdateCounter] = useState(0)

    // Refs
    const createFormRef = useRef<any>(null)
    const editFormRef = useRef<any>(null)

    // Constants
    const allAllow = 'filtering,queryString,queryFilters'.split(',') as GridAllowOptions[]
    const allShow = 'copyApiUrl,downloadCsv,filtersView,newItem,pagingInfo,pagingNav,preferences,refresh,resetPreferences,toolbar,forms'.split(',') as GridShowOptions[]
    const defaultTake = 25

    // Computed values
    const allowOptions = useMemo<{ [k: string]: boolean }>(
        () => props.deny ? asOptions(allAllow, props.deny) : asOptions(allAllow, aqd.deny),
        [props.deny, aqd.deny]
    )

    const showOptions = useMemo<{ [k: string]: boolean }>(
        () => props.hide ? asOptions(allShow, props.hide) : asOptions(allShow, aqd.hide),
        [props.hide, aqd.hide]
    )

    const allow = useCallback((target: GridAllowOptions) => {
        return allowOptions[target]
    }, [allowOptions])

    const show = useCallback((target: GridShowOptions) => {
        return showOptions[target]
    }, [showOptions])

    const tableStyle = useMemo(() => props.tableStyle ?? aqd.tableStyle, [props.tableStyle, aqd.tableStyle])
    const gridClass = useMemo(() => props.gridClass ?? grid.getGridClass(tableStyle), [props.gridClass, tableStyle])
    const grid2Class = useMemo(() => props.grid2Class ?? grid.getGrid2Class(tableStyle), [props.grid2Class, tableStyle])
    const grid3Class = useMemo(() => props.grid3Class ?? grid.getGrid3Class(tableStyle), [props.grid3Class, tableStyle])
    const grid4Class = useMemo(() => props.grid4Class ?? grid.getGrid4Class(tableStyle), [props.grid4Class, tableStyle])
    const tableClass = useMemo(() => props.tableClass ?? grid.getTableClass(tableStyle), [props.tableClass, tableStyle])
    const theadClass = useMemo(() => props.theadClass ?? grid.getTheadClass(tableStyle), [props.theadClass, tableStyle])
    const theadRowClass = useMemo(() => props.theadRowClass ?? grid.getTheadRowClass(tableStyle), [props.theadRowClass, tableStyle])
    const theadCellClass = useMemo(() => props.theadCellClass ?? grid.getTheadCellClass(tableStyle), [props.theadCellClass, tableStyle])
    const toolbarButtonClass = useMemo(() => props.toolbarButtonClass ?? grid.toolbarButtonClass, [props.toolbarButtonClass])

    const getTableRowClass = useCallback((item: any, i: number) => {
        if (props.rowClass) return props.rowClass(item, i)
        const canUpdate = !!apis.AnyUpdate
        const itemPk = primaryKey?.name ? mapGet(item, primaryKey.name) : null
        const isSelected = itemPk == editId
        return grid.getTableRowClass(props.tableStyle, i, isSelected, canUpdate)
    }, [props.rowClass, props.tableStyle, editId])

    const { metadataApi, typeOf, apiOf, filterDefinitions } = useMetadata()
    const { invalidAccessMessage, user } = useAuth()

    const typeName = useMemo(() => getTypeName(props.type), [props.type])

    const apis = useMemo(() => {
        let opNames = asStrings(props.apis)
        return opNames.length > 0
            ? Apis.from(opNames.map(x => apiOf(x)).filter(x => x != null).map(x => x!))
            : Apis.forType(typeName, metadataApi)
    }, [props.apis, typeName, metadataApi, apiOf])

    const dataModelName = useMemo(() => typeName || apis.AnyQuery?.dataModel.name, [typeName, apis])
    const modelTitle = useMemo(() => props.modelTitle || dataModelName, [props.modelTitle, dataModelName])
    const newButtonLabel = useMemo(() => props.newButtonLabel || `New ${modelTitle}`, [props.newButtonLabel, modelTitle])

    const definitions = useMemo(() => props.filterDefinitions || filterDefinitions, [props.filterDefinitions, filterDefinitions])

    const viewModel = useMemo(() => typeOf(apis.AnyQuery?.viewModel?.name || apis.AnyQuery?.dataModel.name), [apis, typeOf])

    const getColumnSlots = useMemo(() => {
        const slotColumns = Object.keys(columnSlots || {}).map(x => x.toLowerCase())
        return typeProperties(viewModel)
            .filter(p => slotColumns.includes(p.name.toLowerCase()) || slotColumns.includes(p.name.toLowerCase() + '-header'))
            .map(x => x.name)
    }, [viewModel, columnSlots])

    function getSelectedColumns() {
        let selectedCols = asStrings(props.selectedColumns)
        return selectedCols.length > 0
            ? selectedCols
            : getColumnSlots.length > 0
                ? getColumnSlots
                : []
    }

    const viewModelColumns = useMemo(() => {
        let selectedCols = getSelectedColumns()
        let selectedLower = selectedCols.map(x => x.toLowerCase())
        const viewProps = typeProperties(viewModel)
        return selectedLower.length > 0
            ? selectedLower.map(x => viewProps.find(p => p.name.toLowerCase() === x)).filter(x => x != null) as MetadataPropertyType[]
            : viewProps
    }, [viewModel, props.selectedColumns, getColumnSlots])

    const filteredColumns = useMemo(() => {
        let viewColumns = viewModelColumns.map(x => x.name)
        let filterColumns = asStrings(apiPrefs.selectedColumns).map(x => x.toLowerCase())
        return filterColumns.length > 0
            ? viewColumns.filter(x => filterColumns.includes(x.toLowerCase()))
            : viewColumns
    }, [viewModelColumns, apiPrefs.selectedColumns])

    const properties = useMemo(() => typeProperties(typeOf(typeName || apis.AnyQuery?.dataModel.name)), [typeName, apis, typeOf])
    const primaryKey = useMemo(() => getPrimaryKey(typeOf(typeName || apis.AnyQuery?.dataModel.name)), [typeName, apis, typeOf])

    const take = useMemo(() => apiPrefs.take ?? defaultTake, [apiPrefs.take])
    const results = useMemo<any[]>(() => (api.response ? mapGet(api.response, 'results') : null) ?? [], [api.response])
    const total = useMemo<number>(() => (api.response?.total || results.length) ?? 0, [api.response?.total, results.length])

    const canFirst = useMemo(() => skip > 0, [skip])
    const canPrev = useMemo(() => skip > 0, [skip])
    const canNext = useMemo(() => results.length >= take, [results.length, take])
    const canLast = useMemo(() => results.length >= take, [results.length, take])

    const hasPrefs = useMemo(() =>
        columns.some(x => x.settings.filters.length > 0 || !!x.settings.sort) || apiPrefs.selectedColumns,
        [columns, apiPrefs.selectedColumns]
    )

    const filtersCount = useMemo(() =>
        columns.map(x => x.settings.filters.length).reduce((acc, x) => acc + x, 0),
        [columns]
    )

    const warn = (msg: string) => `<span class="text-yellow-700">${msg}</span>`

    const invalidState = useMemo(() => {
        if (!metadataApi)
            return warn(`AppMetadata not loaded, see <a class="${a.blue}" href="https://docs.servicestack.net/vue/use-metadata" target="_blank">useMetadata()</a>`)
        let opNames = asStrings(props.apis)
        let invalidApis = opNames.map(op => apiOf(op) == null ? op : null).filter(x => x != null)
        if (invalidApis.length > 0)
            return warn(`Unknown API${invalidApis.length > 1 ? 's' : ''}: ${invalidApis.join(', ')}`)
        let aq = apis
        if (aq.empty)
            return warn(`Mising DataModel in property 'type' or AutoQuery APIs to use in property 'apis'`)
        if (!aq.AnyQuery)
            return warn(`No Query API was found`)
        return null
    }, [metadataApi, props.apis, apis, apiOf])

    const invalidAccess = useMemo(() => apis.AnyQuery && invalidAccessMessage(apis.AnyQuery), [apis.AnyQuery, invalidAccessMessage, user])
    const invalidCreateAccess = useMemo(() => apis.Create && invalidAccessMessage(apis.Create), [apis.Create, invalidAccessMessage, user])
    const invalidUpdateAccess = useMemo(() => apis.AnyUpdate && invalidAccessMessage(apis.AnyUpdate), [apis.AnyUpdate, invalidAccessMessage, user])

    const canCreate = useMemo(() => canAccess(apis.Create), [apis.Create, user])
    const canUpdate = useMemo(() => canAccess(apis.AnyUpdate), [apis.AnyUpdate, user])
    const canDelete = useMemo(() => canAccess(apis.Delete), [apis.Delete, user])

    // Helper functions
    const prefsCacheKey = useCallback(() =>
        `${id}/ApiPrefs/${typeName || apis.AnyQuery?.dataModel.name}`,
        [id, typeName, apis]
    )

    const columnCacheKey = useCallback((name: string) =>
        `Column/${id}:${typeName || apis.AnyQuery?.dataModel.name}.${name}`,
        [id, typeName, apis]
    )

    const canFilter = useCallback((column: string) => {
        if (column) {
            if (props.canFilter)
                return props.canFilter(column)

            const prop = properties.find(x => x.name.toLowerCase() == column.toLowerCase())
            if (prop) {
                return !isComplexProp(prop)
            }
        }
        return false
    }, [props.canFilter, properties])

    const updateUrl = useCallback((args: Record<string, any>) => {
        onNav?.(args)
        if (!allow('queryString')) return
        pushState(args)
    }, [onNav, allow])

    const skipTo = useCallback(async (value: number) => {
        let newSkip = skip + value
        if (newSkip < 0)
            newSkip = 0

        const lastPage = Math.floor(total / take) * take
        if (newSkip > lastPage)
            newSkip = lastPage

        setSkip(newSkip)
        updateUrl({ skip: newSkip || undefined })
        await update()
    }, [skip, total, take, updateUrl])

    const setEditIdValue = useCallback(async (pkName: string, pkValue: any) => {
        setEdit(null)
        setEditId(pkValue)
        if (!pkName || !pkValue) return

        let requestDto = createDto(apis.AnyQuery!, { [pkName]: pkValue })
        const apiResult = await client.api(requestDto)
        if (apiResult.succeeded) {
            let result = mapGet(apiResult.response, 'results')?.[0]
            if (!result) {
                console.warn(`API ${apis.AnyQuery?.request.name}(${pkName}:${pkValue}) returned no results`)
            }
            setEdit(result)
        }
    }, [apis, client])

    const handleRowSelected = useCallback(async (item: any, ev: React.MouseEvent) => {
        onRowSelected?.(item, ev)
        const pkName = primaryKey?.name
        const pkValue = pkName ? mapGet(item, pkName) : null
        if (!pkName || !pkValue) return
        updateUrl({ edit: pkValue })
        setEditIdValue(pkName, pkValue)
    }, [onRowSelected, primaryKey, updateUrl, setEditIdValue])

    const handleHeaderSelected = useCallback((name: string, e: React.MouseEvent) => {
        if (!allow('filtering')) return
        let elTarget = e.target as HTMLElement
        if (canFilter(name) && elTarget?.tagName !== 'TD') {
            let tableRect = elTarget?.closest('TABLE')?.getBoundingClientRect()
            let column = columns.find(x => x.name.toLowerCase() == name.toLowerCase())
            if (column && tableRect) {
                let filterDialogWidth = 318
                let minLeft = tableRect.x + filterDialogWidth + 10
                setShowFilters({
                    column,
                    topLeft: {
                        x: Math.max(Math.floor(e.clientX + filterDialogWidth / 2), minLeft),
                        y: tableRect.y + 45,
                    }
                })
            }
        }

        onHeaderSelected?.(name, e)
    }, [allow, canFilter, columns, onHeaderSelected])

    const onFilterDone = useCallback(() => {
        setShowFilters(null)
    }, [])

    const saveApiPrefs = useCallback(async (prefs: ApiPrefs) => {
        setShowQueryPrefs(false)
        setApiPrefs(prefs)
        storage.setItem(prefsCacheKey(), JSON.stringify(prefs))
        await update()
    }, [prefsCacheKey, storage])

    const setCreateModel = useCallback((props: any) => {
        if (!createFormRef.current) return
        Object.assign(createFormRef.current?.model, props)
        forceUpdateInternal()
    }, [])

    const setEditModel = useCallback((props: any) => {
        setEdit(prev => ({ ...prev, ...props }))
        forceUpdateInternal()
    }, [])

    const forceUpdateInternal = useCallback(() => {
        createFormRef.current?.forceUpdate()
        editFormRef.current?.forceUpdate()
        setForceUpdateCounter(prev => prev + 1)
    }, [])

    const createRequestArgs = useCallback(() => {
        let args: any = {
            include: 'total',
            take: take,
        }
        let selectedColumns = asStrings(apiPrefs.selectedColumns || props.selectedColumns)
        if (selectedColumns.length > 0) {
            let pk = primaryKey
            if (pk && !selectedColumns.includes(pk.name))
                selectedColumns = [pk.name, ...selectedColumns]

            // Include FK Id for [Ref] complex props
            const metaProps = properties
            const refProps: string[] = []
            selectedColumns.forEach(column => {
                const prop = metaProps.find(x => x.name.toLowerCase() == column.toLowerCase())
                if (prop?.ref?.selfId) {
                    refProps.push(prop.ref.selfId)
                }
                // If they have a custom slot defined, include any [Ref] props it might use
                const slot = columnSlots?.[column]
                if (slot) {
                    refProps.push(...metaProps.filter(x => x.ref?.selfId?.toLowerCase() == column.toLowerCase()).map(x => x.name))
                }
            })
            refProps.forEach(column => {
                if (!selectedColumns.includes(column))
                    selectedColumns.push(column)
            })

            args.fields = uniqueIgnoreCase(selectedColumns).join(',')
        }

        let orderBy: string[] = []
        columns.forEach(c => {
            if (c.settings.sort) orderBy.push((c.settings.sort === 'DESC' ? '-' : '') + c.name)
            c.settings.filters.forEach(filter => {
                let k = filter.key.replace('%', c.name)
                args[k] = filter.value
            })
        })
        if (props.filters) {
            Object.keys(props.filters).forEach(k => {
                args[k] = props.filters![k]
            })
        }
        if (allow('queryString') && allow('queryFilters')) {
            const search = location.search ? location.search : location.hash.includes('?') ? '?' + rightPart(location.hash, '?') : ''
            let qs = queryString(search)
            Object.keys(qs).forEach(k => {
                let field = viewModelColumns.find(x => x.name.toLowerCase() === k.toLowerCase())
                if (field) {
                    args[k] = qs[k]
                }
            })
            if (typeof qs.skip != 'undefined') {
                const num = parseInt(qs.skip)
                if (!isNaN(num)) {
                    setSkip(num)
                    args.skip = num
                }
            }
        }
        if (typeof args.skip == 'undefined' && skip > 0) {
            args.skip = skip
        }

        if (orderBy.length > 0) {
            args.orderBy = orderBy.join(',')
        }
        return args
    }, [take, apiPrefs.selectedColumns, props.selectedColumns, props.filters, primaryKey, properties, columns, allow, viewModelColumns, skip, columnSlots])

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    const search = useCallback(async (args: any) => {
        const op = apis.AnyQuery
        if (!op) {
            console.error('No Query API was found')
            return
        }
        let requestDto = createDto(op, args)

        let r = await client.api(requestDto)
        let complete = delaySet((x: boolean) => {
            setApi(prev => ({ ...prev, response: undefined, error: undefined }))
            setApiLoading(x)
            if (!isIOS) {
                setApi(r)
            } else {
                // Fix for iOS which doesn't pick up reactive update on initial onload
                setTimeout(() => setApi(r), 0)
            }
        })
        complete()

        let results = mapGet(r.response as any, 'results') || []
        if (!r.succeeded || results.length == 0) return
    }, [apis, client])

    const update = useCallback(async () => {
        await search(createRequestArgs())
    }, [search, createRequestArgs])

    const refresh = useCallback(async () => {
        await update()
    }, [update])

    const onFilterSave = useCallback(async (settings: ColumnSettings) => {
        let column = showFilters?.column
        if (column) {
            // Update the column object directly first (for immediate use in createRequestArgs)
            column.settings = settings
            storage.setItem(columnCacheKey(column.name), JSON.stringify(settings))

            // Then update the columns state immutably to trigger re-render
            setColumns(prevColumns => prevColumns.map(col =>
                col.name === column.name
                    ? { ...col, settings }
                    : col
            ))

            await update()
        }
        setShowFilters(null)
    }, [showFilters, columnCacheKey, storage, update])

    const filtersChanged = useCallback(async (column: Column) => {
        // Column is already mutated by the caller, just save to storage
        storage.setItem(columnCacheKey(column.name), JSON.stringify(column.settings))

        // Update the columns state immutably to trigger re-render
        setColumns(prevColumns => prevColumns.map(col =>
            col.name === column.name
                ? { ...col, settings: column.settings }
                : col
        ))

        await update()
    }, [columnCacheKey, storage, update])

    const downloadCsv = useCallback(() => {
        const apiUrl = createApiUrl("csv")
        copyText(apiUrl)
        if (typeof window != 'undefined') window.open(apiUrl)
    }, [])

    const copyApiUrl = useCallback(() => {
        const apiUrl = createApiUrl("json")
        copyText(apiUrl)
        setCopiedApiUrl(true)
        setTimeout(() => setCopiedApiUrl(false), 3000)
    }, [])

    const createApiUrl = useCallback((ext = "json") => {
        const args = createRequestArgs()
        const url = `/api/${apis.AnyQuery?.request.name}`
        const absoluteUrl = combinePaths(client.baseUrl, appendQueryString(url, { ...args, jsconfig: "edv" }))
        const formatUrl = absoluteUrl.indexOf('?') >= 0
            ? leftPart(absoluteUrl, '?') + "." + ext + "?" + rightPart(absoluteUrl, '?')
            : absoluteUrl + ".json"
        return formatUrl
    }, [createRequestArgs, apis, client.baseUrl])

    const resetPreferences = useCallback(async () => {
        // Mutate columns directly first (for immediate use in createRequestArgs)
        columns.forEach(column => {
            column.settings = { filters: [] }
            storage.removeItem(columnCacheKey(column.name))
        })

        // Then update columns state immutably to trigger re-render
        setColumns(prevColumns => prevColumns.map(column => ({
            ...column,
            settings: { filters: [] }
        })))

        setApiPrefs({ take: defaultTake })
        storage.removeItem(prefsCacheKey())
        await update()
    }, [columns, columnCacheKey, prefsCacheKey, storage, update, defaultTake])

    const onShowNewItem = useCallback(() => {
        setCreate(true)
        updateUrl({ create: null })
    }, [updateUrl])

    const editDone = useCallback(() => {
        setEdit(null)
        setEditId(null)
        updateUrl({ edit: undefined })
    }, [updateUrl])

    const createDone = useCallback(() => {
        setCreate(false)
        updateUrl({ create: undefined })
    }, [updateUrl])

    const editSave = useCallback(async () => {
        await update()
        editDone()
    }, [update, editDone])

    const createSave = useCallback(async () => {
        await update()
        createDone()
    }, [update, createDone])

    const reset = useCallback(() => {
        setApi(new ApiResult<any>())
        setEditApi(new ApiResult<any>())
        setCreate(false)
        setEditId(null)
        setEdit(null)
        setShowQueryPrefs(false)
        setShowFilters(null)
        setSkip(initialSkip)
        setCopiedApiUrl(false)
        setApiPrefs({ take: defaultTake })
        setApiLoading(false)

        const prefs = props.prefs || parseJson(storage.getItem(prefsCacheKey()))
        if (prefs) setApiPrefs(prefs)

        setColumns(viewModelColumns.map(p => ({
            name: p.name,
            type: p.type,
            meta: p,
            settings: Object.assign({
                filters: []
            },
                parseJson(storage.getItem(columnCacheKey(p.name)))
            )
        })))

        if (!isNaN(initialSkip)) {
            setSkip(initialSkip)
        }
        let pkName = primaryKey?.name
        if (allow('queryString')) {
            const search = location.search ? location.search : location.hash.includes('?') ? '?' + rightPart(location.hash, '?') : ''
            let qs = queryString(search)
            if (typeof qs.create != 'undefined') {
                setCreate(typeof qs.create != 'undefined')
            }
            else if (pkName && (typeof qs.edit == 'string' || typeof qs.edit == 'number')) {
                setEditIdValue(pkName, qs.edit)
            }
        }
        if (props.create === true) {
            setCreate(true)
        }
        if (pkName && props.edit != null) {
            setEditIdValue(pkName, props.edit)
        }
    }, [initialSkip, props.prefs, props.create, props.edit, storage, prefsCacheKey, viewModelColumns, columnCacheKey, primaryKey, allow, setEditIdValue])

    // Mount effect
    useEffect(() => {
        reset()
        update()

        if (Sole.interceptors.has('AutoQueryGrid.new')) {
            Sole.interceptors.invoke('AutoQueryGrid.new', { props })
        }
    }, [])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
        update,
        search,
        createRequestArgs,
        reset,
        createDone,
        createSave,
        editDone,
        editSave,
        forceUpdate: forceUpdateInternal,
        setEdit: setEditModel,
        edit,
        createForm: createFormRef.current,
        editForm: editFormRef.current,
        apiPrefs,
        results,
        skip,
        take,
        total,
    }), [update, search, createRequestArgs, reset, createDone, createSave, editDone, editSave, forceUpdateInternal, setEditModel, edit, apiPrefs, results, skip, take, total])

    // Render helpers
    const configureField = props.configureField

    // Render
    if (invalidState) {
        return (
            <div>
                <Alert type="warn">
                    <div dangerouslySetInnerHTML={{ __html: invalidState }} />
                </Alert>
            </div>
        )
    }

    if (invalidAccess) {
        return (
            <div>
                <EnsureAccess invalidAccess={invalidAccess} />
            </div>
        )
    }

    return (
        <div className="pt-1">
            {show('forms') && create && apis.Create && (
                <div>
                    {invalidCreateAccess ? (
                        <EnsureAccessDialog
                            title={`Create ${modelTitle}`}
                            invalidAccess={invalidCreateAccess}
                            alertClass="text-yellow-700"
                            onDone={createDone}
                        />
                    ) : createFormSlot ? (
                        createFormSlot({
                            type: apis.Create.request.name,
                            configure: configureField!,
                            done: createDone,
                            save: createSave
                        })
                    ) : (
                        <AutoCreateForm
                            ref={createFormRef}
                            type={apis.Create.request.name}
                            configureField={configureField}
                            onDone={createDone}
                            onSave={createSave}
                        >
                            {formHeader && formHeader({
                                form: 'create',
                                formInstance: createFormRef.current,
                                apis,
                                type: dataModelName,
                                updateModel: setCreateModel
                            })}
                            {formFooter && formFooter({
                                form: 'create',
                                formInstance: createFormRef.current,
                                apis,
                                type: dataModelName,
                                updateModel: setCreateModel
                            })}
                        </AutoCreateForm>
                    )}
                </div>
            )}

            {show('forms') && edit && apis.AnyUpdate && (
                <div>
                    {invalidUpdateAccess ? (
                        <EnsureAccessDialog
                            title={`Update ${modelTitle}`}
                            invalidAccess={invalidUpdateAccess}
                            alertClass="text-yellow-700"
                            onDone={editDone}
                        />
                    ) : editFormSlot ? (
                        editFormSlot({
                            model: edit,
                            type: apis.AnyUpdate.request.name,
                            deleteType: canDelete ? apis.Delete!.request.name : null,
                            configure: configureField!,
                            done: editDone,
                            save: editSave
                        })
                    ) : (
                        <AutoEditForm
                            ref={editFormRef}
                            value={edit}
                            type={apis.AnyUpdate.request.name}
                            deleteType={canDelete ? apis.Delete!.request.name : null}
                            configureField={configureField}
                            onDone={editDone}
                            onSave={editSave}
                            onDelete={editSave}
                        >
                            {formHeader && formHeader({
                                form: 'edit',
                                formInstance: editFormRef.current,
                                apis,
                                type: dataModelName,
                                model: edit,
                                id: editId,
                                updateModel: setEditModel
                            })}
                            {formFooter && formFooter({
                                form: 'edit',
                                formInstance: editFormRef.current,
                                apis,
                                type: dataModelName,
                                model: edit,
                                id: editId,
                                updateModel: setEditModel
                            })}
                        </AutoEditForm>
                    )}
                </div>
            )}

            {show('forms') && edit && !apis.AnyUpdate && (
                <div>
                    {viewFormSlot ? (
                        viewFormSlot({
                            model: edit,
                            apis,
                            done: editDone
                        })
                    ) : (
                        <AutoViewForm
                            model={edit}
                            apis={apis}
                            deleteType={canDelete ? apis.Delete!.request.name : null}
                            onDone={editDone}
                            onSave={editSave}
                            onDelete={editSave}
                        />
                    )}
                </div>
            )}

            {toolbar ? (
                toolbar
            ) : show('toolbar') ? (
                <div>
                    {showQueryPrefs && (
                        <QueryPrefs
                            columns={viewModelColumns}
                            prefs={apiPrefs}
                            onDone={() => setShowQueryPrefs(false)}
                            onSave={saveApiPrefs}
                        />
                    )}
                    <div className="pl-1 pt-1 flex flex-wrap">
                        <div className="flex mt-1">
                            {show('preferences') && (
                                <button
                                    type="button"
                                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                                    title={`${modelTitle} Preferences`}
                                    onClick={() => setShowQueryPrefs(!showQueryPrefs)}
                                >
                                    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <g strokeWidth="1.5" fill="none">
                                            <path d="M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18" stroke="currentColor" />
                                        </g>
                                    </svg>
                                </button>
                            )}

                            {show('pagingNav') && (
                                <>
                                    <button
                                        type="button"
                                        className={`pl-2 ${canFirst ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
                                        title="First page"
                                        disabled={!canFirst}
                                        onClick={() => skipTo(-total)}
                                    >
                                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6l6 6zM6 6h2v12H6z" fill="currentColor" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className={`pl-2 ${canPrev ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
                                        title="Previous page"
                                        disabled={!canPrev}
                                        onClick={() => skipTo(-take)}
                                    >
                                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z" fill="currentColor" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className={`pl-2 ${canNext ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
                                        title="Next page"
                                        disabled={!canNext}
                                        onClick={() => skipTo(take)}
                                    >
                                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className={`pl-2 ${canLast ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`}
                                        title="Last page"
                                        disabled={!canLast}
                                        onClick={() => skipTo(total)}
                                    >
                                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6l-6-6zM16 6h2v12h-2z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>

                        {show('pagingInfo') && (
                            <div className="flex mt-1">
                                <div className="px-4 text-lg text-black dark:text-white">
                                    {apiLoading && <span>Querying...</span>}
                                    {results.length > 0 && (
                                        <span>
                                            <span className="hidden xl:inline">Showing Results </span>
                                            {skip + 1} - {Math.min(skip + results.length, total)} <span> of {total}</span>
                                        </span>
                                    )}
                                    {!apiLoading && results.length === 0 && api.completed && <span>No Results</span>}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap">
                            {show('refresh') && (
                                <div className="pl-2 mt-1">
                                    <button type="button" onClick={refresh} title="Refresh" className={toolbarButtonClass}>
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 0 0 5.07 8m-1.008 5a8.001 8.001 0 0 0 14.868 3" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {show('downloadCsv') && (
                                <div className="pl-2 mt-1">
                                    <button type="button" onClick={downloadCsv} title="Download CSV" className={toolbarButtonClass}>
                                        <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path d="M28.781 4.405h-10.13V2.018L2 4.588v22.527l16.651 2.868v-3.538h10.13A1.162 1.162 0 0 0 30 25.349V5.5a1.162 1.162 0 0 0-1.219-1.095zm.16 21.126H18.617l-.017-1.889h2.487v-2.2h-2.506l-.012-1.3h2.518v-2.2H18.55l-.012-1.3h2.549v-2.2H18.53v-1.3h2.557v-2.2H18.53v-1.3h2.557v-2.2H18.53v-2h10.411z" fill="#20744a" fillRule="evenodd" />
                                            <path fill="#20744a" d="M22.487 7.439h4.323v2.2h-4.323z" />
                                            <path fill="#20744a" d="M22.487 10.94h4.323v2.2h-4.323z" />
                                            <path fill="#20744a" d="M22.487 14.441h4.323v2.2h-4.323z" />
                                            <path fill="#20744a" d="M22.487 17.942h4.323v2.2h-4.323z" />
                                            <path fill="#20744a" d="M22.487 21.443h4.323v2.2h-4.323z" />
                                            <path fill="#fff" fillRule="evenodd" d="M6.347 10.673l2.146-.123l1.349 3.709l1.594-3.862l2.146-.123l-2.606 5.266l2.606 5.279l-2.269-.153l-1.532-4.024l-1.533 3.871l-2.085-.184l2.422-4.663l-2.238-4.993z" />
                                        </svg>
                                        <span className="text-green-900 dark:text-green-100">Excel</span>
                                    </button>
                                </div>
                            )}

                            {show('copyApiUrl') && (
                                <div className="pl-2 mt-1">
                                    <button type="button" onClick={copyApiUrl} title="Copy API URL" className={toolbarButtonClass}>
                                        {copiedApiUrl ? (
                                            <svg className="w-5 h-5 mr-1 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <g fill="none">
                                                    <path d="M8 4v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.242a2 2 0 0 0-.602-1.43L16.083 2.57A2 2 0 0 0 14.685 2H10a2 2 0 0 0-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M16 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                        )}
                                        <span className="whitespace-nowrap">Copy URL</span>
                                    </button>
                                </div>
                            )}

                            {hasPrefs && show('resetPreferences') && (
                                <div className="pl-2 mt-1">
                                    <button type="button" onClick={resetPreferences} title="Reset Preferences & Filters" className={toolbarButtonClass}>
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {show('filtersView') && filtersCount > 0 && (
                                <div className="pl-2 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(open == 'filters' ? null : 'filters')}
                                        className={toolbarButtonClass}
                                        aria-expanded="false"
                                    >
                                        <svg className="flex-none w-5 h-5 mr-2 text-gray-400 dark:text-gray-500 group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                        </svg>
                                        <span className="mr-1">
                                            {filtersCount} {filtersCount == 1 ? "Filter" : "Filters"}
                                        </span>
                                        {open != 'filters' ? (
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}

                            {show('newItem') && apis.Create && canCreate && (
                                <div className="pl-2 mt-1">
                                    <button type="button" onClick={onShowNewItem} title={modelTitle} className={toolbarButtonClass}>
                                        <svg className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
                                        </svg>
                                        <span className="whitespace-nowrap">{newButtonLabel}</span>
                                    </button>
                                </div>
                            )}

                            {toolbarButtons && toolbarButtons({ toolbarButtonClass })}
                        </div>
                    </div>
                </div>
            ) : null}

            {open == 'filters' && (
                <FilterViews
                    className="border-y border-gray-200 dark:border-gray-800 py-8 my-2"
                    definitions={definitions}
                    columns={columns}
                    onDone={() => setOpen(null)}
                    onChange={filtersChanged}
                />
            )}

            {(editApi.error ?? api.error) && <ErrorSummary status={editApi.error ?? api.error} />}
            {apiLoading && !editApi.error && !api.error && <Loading className="p-2" />}

            {showFilters && (
                <div>
                    <FilterColumn
                        definitions={definitions}
                        column={showFilters.column}
                        topLeft={showFilters.topLeft}
                        onDone={onFilterDone}
                        onSave={onFilterSave}
                    />
                </div>
            )}

            {results.length > 0 && (
                <DataGrid
                    id={id}
                    items={results}
                    type={props.type}
                    selectedColumns={filteredColumns}
                    className="mt-1"
                    tableStyle={tableStyle}
                    gridClass={gridClass}
                    grid2Class={grid2Class}
                    grid3Class={grid3Class}
                    grid4Class={grid4Class}
                    tableClass={tableClass}
                    theadClass={theadClass}
                    theadRowClass={theadRowClass}
                    theadCellClass={theadCellClass}
                    tbodyClass={props.tbodyClass}
                    rowClass={getTableRowClass}
                    onRowSelected={handleRowSelected}
                    rowStyle={props.rowStyle}
                    headerTitle={props.headerTitle}
                    headerTitles={props.headerTitles}
                    visibleFrom={props.visibleFrom}
                    onHeaderSelected={handleHeaderSelected}
                    slots={{
                        header: ({ column, label }: { column: string, label: string }) => {
                            if (allow('filtering') && canFilter(column)) {
                                const col = columns.find((x: Column) => x.name.toLowerCase() === column.toLowerCase())
                                const isOpen = showFilters?.column.name === column
                                return (
                                    <div className="cursor-pointer flex justify-between items-center hover:text-gray-900 dark:hover:text-gray-50">
                                        <span className="mr-1 select-none">
                                            {label}
                                        </span>
                                        <SettingsIcons column={col} isOpen={isOpen} />
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="flex justify-between items-center">
                                        <span className="mr-1 select-none">{label}</span>
                                    </div>
                                )
                            }
                        },
                        ...headerSlots,
                        ...columnSlots
                    }}
                >
                    {children}
                </DataGrid>
            )}
        </div>
    )
})

AutoQueryGrid.displayName = 'AutoQueryGrid'

export default AutoQueryGrid
