import React, { useState, useEffect, useMemo, useRef, useContext } from 'react'
import type { JsonServiceClient } from '@servicestack/client'
import type { ApiPrefs, ApiResponse, Column, ColumnSettings, MetadataPropertyType } from '@/types'
import type { ModalLookupProps } from './types'
import { ApiResult, delaySet, humanize, mapGet } from '@servicestack/client'
import { parseJson, getTypeName } from '@/use/utils'
import { useConfig } from '@/use/config'
import { Apis, createDto, Crud, getPrimaryKey, typeOf, typeProperties, useMetadata } from '@/use/metadata'
import { grid } from './css'
import { canAccess } from '@/use/auth'
import { ClientContext } from '@/use/context'
import ModalDialog from './ModalDialog'

import FilterColumn from './grids/FilterColumn'
import FilterViews from './grids/FilterViews'
import QueryPrefs from './grids/QueryPrefs'
import DataGrid from './DataGrid'
import AutoCreateForm from './AutoCreateForm'
import ErrorSummary from './ErrorSummary'
import Loading from './Loading'
import SettingsIcons from './SettingsIcons'

const asStrings = (o?: string | string[] | null) => typeof o == 'string' ? o.split(',') : o || []

export default function ModalLookup({
  id = 'ModalLookup',
  refInfo,
  skip: initialSkip = 0,
  prefs,
  selectedColumns: propSelectedColumns,
  allowFiltering = true,
  showPreferences = true,
  showPagingNav = true,
  showPagingInfo = true,
  showResetPreferences = true,
  showFiltersView = true,
  className,
  toolbarButtonClass: propToolbarButtonClass,
  canFilter: propCanFilter,
  modelTitle: propModelTitle,
  newButtonLabel: propNewButtonLabel,
  configureField,
  onDone
}: ModalLookupProps) {
  const { config } = useConfig()
  const { metadataApi, filterDefinitions } = useMetadata()
  const client = useContext(ClientContext)
  const storage = config.storage!

  // State
  const [apiPrefs, setApiPrefs] = useState<ApiPrefs>({ take: 25 })
  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())
  const [skip, setSkip] = useState(initialSkip)
  const [apiLoading, setApiLoading] = useState(false)
  const [open, setOpen] = useState<"filters" | null>(null)
  const [columns, setColumns] = useState<Column[]>([])
  const [showQueryPrefs, setShowQueryPrefs] = useState(false)
  const [showFilters, setShowFilters] = useState<{ column: Column, topLeft: { x: number, y: number } } | null>(null)
  const [create, setCreate] = useState(false)

  const createFormRef = useRef<any>(null)

  // Computed values
  const toolbarButtonClass = useMemo(() =>
    propToolbarButtonClass ?? grid.toolbarButtonClass,
    [propToolbarButtonClass]
  )

  const definitions = useMemo(() => filterDefinitions, [filterDefinitions])
  const defaultTake = 25

  const viewModel = useMemo(() => typeOf(refInfo.model), [refInfo.model])

  const viewModelColumns = useMemo(() => {
    const selectedCols = getSelectedColumns()
    const selectedLower = selectedCols.map(x => x.toLowerCase())
    const viewProps = typeProperties(viewModel)
    return selectedLower.length > 0
      ? selectedLower.map(x => viewProps.find(p => p.name.toLowerCase() === x)).filter(x => x != null) as MetadataPropertyType[]
      : viewProps
  }, [viewModel, propSelectedColumns])

  const filteredColumns = useMemo(() => {
    const viewColumns = viewModelColumns.map(x => x.name)
    const filterColumns = asStrings(apiPrefs.selectedColumns).map(x => x.toLowerCase())
    return filterColumns.length > 0
      ? viewColumns.filter(x => filterColumns.includes(x.toLowerCase()))
      : viewColumns
  }, [viewModelColumns, apiPrefs.selectedColumns])

  const take = useMemo(() => apiPrefs.take ?? defaultTake, [apiPrefs.take])
  const results = useMemo<any[]>(() =>
    (api.response ? mapGet(api.response, 'results') : null) ?? [],
    [api.response]
  )
  const total = useMemo<number>(() =>
    api.response?.total ?? results.length ?? 0,
    [api.response, results]
  )

  const canFirst = useMemo(() => skip > 0, [skip])
  const canPrev = useMemo(() => skip > 0, [skip])
  const canNext = useMemo(() => results.length >= take, [results, take])
  const canLast = useMemo(() => results.length >= take, [results, take])

  const hasPrefs = useMemo(() =>
    columns.some(x => x.settings.filters.length > 0 || !!x.settings.sort),
    [columns]
  )
  const filtersCount = useMemo(() =>
    columns.map(x => x.settings.filters.length).reduce((acc, x) => acc + x, 0),
    [columns]
  )
  const primaryKey = useMemo(() => getPrimaryKey(viewModel), [viewModel])

  const queryOp = useMemo(() =>
    metadataApi?.operations.find(op =>
      op.dataModel?.name == refInfo.model && Crud.isAnyQuery(op)
    ),
    [metadataApi, refInfo.model]
  )

  const typeName = useMemo(() => getTypeName(refInfo.model), [refInfo.model])
  const apis = useMemo(() => Apis.forType(typeName, metadataApi), [typeName, metadataApi])
  const dataModelName = useMemo(() => typeName || queryOp?.dataModel.name, [typeName, queryOp])
  const modelTitle = useMemo(() => propModelTitle || dataModelName, [propModelTitle, dataModelName])
  const newButtonLabel = useMemo(() => propNewButtonLabel || `New ${modelTitle}`, [propNewButtonLabel, modelTitle])
  const canCreate = useMemo(() => canAccess(apis.Create), [apis])

  // Functions
  function getSelectedColumns() {
    const selectedCols = asStrings(propSelectedColumns)
    return selectedCols.length > 0 ? selectedCols : []
  }

  function getTableRowClass(item: any, i: number) {
    return grid.getTableRowClass("fullWidth", i, false, true)
  }

  const prefsCacheKey = () => `${id}/ApiPrefs/${refInfo.model}`
  const columnCacheKey = (name: string) => `Column/${id}:${refInfo.model}.${name}`

  async function skipTo(value: number) {
    let newSkip = skip + value
    if (newSkip < 0) newSkip = 0

    const lastPage = Math.floor(total / take) * take
    if (newSkip > lastPage) newSkip = lastPage

    setSkip(newSkip)
    await update()
  }

  async function onRowSelected(item: any, ev: React.MouseEvent) {
    onDone?.(item)
  }

  function done() {
    onDone?.(null)
  }

  function onHeaderSelected(name: string, e: React.MouseEvent) {
    const elTarget = e.target as HTMLElement
    if (elTarget?.tagName !== 'TD') {
      const tableRect = elTarget?.closest('TABLE')?.getBoundingClientRect()
      const column = columns.find(x => x.name.toLowerCase() == name.toLowerCase())
      if (column && tableRect) {
        const filterDialogWidth = 318
        const div = (e.target as HTMLElement)?.tagName === 'DIV'
          ? e.target as HTMLElement
          : (e.target as HTMLElement)?.closest('DIV')
        const rect = div!.getBoundingClientRect()
        const minLeft = filterDialogWidth + 25
        setShowFilters({
          column,
          topLeft: {
            x: Math.max(Math.floor(rect.x + 25), minLeft),
            y: Math.floor(115)
          }
        })
      }
    }
  }

  function onFilterDone() {
    setShowFilters(null)
  }

  async function onFilterSave(settings: ColumnSettings) {
    const column = showFilters?.column
    if (column) {
      column.settings = settings
      storage.setItem(columnCacheKey(column.name), JSON.stringify(column.settings))
      await update()
    }
    setShowFilters(null)
  }

  async function filtersChanged(column: Column) {
    storage.setItem(columnCacheKey(column.name), JSON.stringify(column.settings))
    await update()
  }

  async function saveApiPrefs(prefs: ApiPrefs) {
    setShowQueryPrefs(false)
    setApiPrefs(prefs)
    storage.setItem(prefsCacheKey(), JSON.stringify(prefs))
    await update()
  }

  async function update() {
    await search(createRequestArgs())
  }

  async function search(args: any) {
    const op = queryOp
    if (!op) {
      console.error(`No Query API was found for ${refInfo.model}`)
      return
    }
    if (!client) {
      console.error('JsonServiceClient is not available. Make sure to wrap your app with ClientContext.Provider')
      return
    }
    const requestDto = createDto(op, args)
    const complete = delaySet(x => {
      setApi(prev => ({ ...prev, response: undefined, error: undefined }))
      setApiLoading(x)
    })
    const r = await client.api(requestDto)
    complete()
    setApi(r)
    const searchResults = mapGet(r.response as any, 'results') || []
    if (!r.succeeded || searchResults.length == 0) return
  }

  function createRequestArgs() {
    const args: any = {
      include: 'total',
      take: take,
    }
    const selectedCols = asStrings(apiPrefs.selectedColumns || propSelectedColumns)
    if (selectedCols.length > 0) {
      const pk = primaryKey
      if (pk && selectedCols.includes(pk.name))
        selectedCols.unshift(pk.name)
      args.fields = selectedCols.join(',')
    }
    const orderBy: string[] = []
    columns.forEach(c => {
      if (c.settings.sort) orderBy.push((c.settings.sort === 'DESC' ? '-' : '') + c.name)
      c.settings.filters.forEach(filter => {
        const k = filter.key.replace('%', c.name)
        args[k] = filter.value
      })
    })
    if (typeof args.skip == 'undefined' && skip > 0) {
      args.skip = skip
    }

    if (orderBy.length > 0) {
      args.orderBy = orderBy.join(',')
    }
    return args
  }

  async function resetPreferences() {
    columns.forEach(column => {
      column.settings = { filters: [] }
      storage.removeItem(columnCacheKey(column.name))
    })
    setColumns([...columns])
    await update()
  }

  function onShowNewItem() {
    setCreate(true)
  }

  function createDone() {
    setCreate(false)
  }

  async function createSave(result: any) {
    createDone()

    // Fetch the newly created entity using its ID
    if (result && result.id && queryOp && client) {
      const pk = getPrimaryKey(viewModel)
      if (pk) {
        const pkName = pk.name
        const pkValue = result.id

        const requestDto = createDto(queryOp, { [pkName]: pkValue })
        const apiResult = await client.api(requestDto)

        if (apiResult.succeeded) {
          const entity = mapGet(apiResult.response, 'results')?.[0]
          if (entity) {
            onDone?.(entity)
            return
          }
        }
      }
    }

    // Fallback to returning the result as-is if we couldn't fetch the entity
    onDone?.(result)
  }

  function setCreateModel(props: any) {
    if (!createFormRef.current) return
    Object.assign(createFormRef.current.model, props)
    console.log('setCreate', JSON.stringify(props, null, 2))
    createFormRef.current?.forceUpdate()
  }

  // Effects
  useEffect(() => {
    const loadedPrefs = prefs || parseJson(storage.getItem(prefsCacheKey()))
    if (loadedPrefs) setApiPrefs(loadedPrefs)

    setColumns(viewModelColumns.map(p => ({
      name: p.name,
      type: p.type,
      meta: p,
      settings: Object.assign(
        { filters: [] },
        parseJson(storage.getItem(columnCacheKey(p.name)))
      )
    })))

    if (!isNaN(initialSkip)) {
      setSkip(initialSkip)
    }

    update()
  }, [])

  if (!refInfo) return null

  return (
    <ModalDialog id={id} className={className} onDone={done} configureField={configureField}>
      <div className="pt-2 overflow-auto" style={{ minHeight: '620px' }}>
        <div className="mt-3 pl-5 flex flex-wrap items-center">
          <h3 className="hidden sm:block text-xl leading-6 font-medium text-gray-900 dark:text-gray-50 mr-3">
            Select <span className="hidden md:inline">{humanize(refInfo.model)}</span>
          </h3>

          <div className="flex pb-1 sm:pb-0">
            {showPreferences && (
              <button
                type="button"
                className="pl-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                title={`${refInfo.model} Preferences`}
                onClick={() => setShowQueryPrefs(!showQueryPrefs)}
              >
                <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g strokeWidth="1.5" fill="none">
                    <path d="M9 3H3.6a.6.6 0 0 0-.6.6v16.8a.6.6 0 0 0 .6.6H9M9 3v18M9 3h6M9 21h6m0-18h5.4a.6.6 0 0 1 .6.6v16.8a.6.6 0 0 1-.6.6H15m0-18v18" stroke="currentColor" />
                  </g>
                </svg>
              </button>
            )}

            {showPagingNav && (
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

          {showPagingInfo && (
            <div className="flex pb-1 sm:pb-0">
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

          {apis.Create && canCreate && (
            <div className="pl-2 mt-1">
              <button
                type="button"
                onClick={onShowNewItem}
                title={modelTitle}
                className={grid.toolbarButtonClass}
              >
                <svg className="w-5 h-5 mr-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor"></path>
                </svg>
                <span className="whitespace-nowrap">{newButtonLabel}</span>
              </button>
              {create && (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <AutoCreateForm
                    ref={createFormRef}
                    type={apis.Create.request.name}
                    configureField={configureField}
                    onDone={createDone}
                    onSave={createSave}
                  />
                </React.Suspense>
              )}
            </div>
          )}

          {hasPrefs && showResetPreferences && (
            <div className="pl-2">
              <button
                type="button"
                onClick={resetPreferences}
                title="Reset Preferences & Filters"
                className={toolbarButtonClass}
              >
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6.78 2.72a.75.75 0 0 1 0 1.06L4.56 6h8.69a7.75 7.75 0 1 1-7.75 7.75a.75.75 0 0 1 1.5 0a6.25 6.25 0 1 0 6.25-6.25H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 0Z" />
                </svg>
              </button>
            </div>
          )}

          <div className="flex pb-1 sm:pb-0">
            {showFiltersView && filtersCount > 0 && (
              <div className="pl-2">
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
          </div>
        </div>

        {open == 'filters' && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <FilterViews
              className="border-y border-gray-200 dark:border-gray-800 py-8 my-2"
              definitions={definitions}
              columns={columns}
              onDone={() => setOpen(null)}
              onChange={filtersChanged}
            />
          </React.Suspense>
        )}

        {showFilters && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <FilterColumn
              definitions={definitions}
              column={showFilters.column}
              topLeft={showFilters.topLeft}
              onDone={onFilterDone}
              onSave={onFilterSave}
            />
          </React.Suspense>
        )}

        {api.error ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ErrorSummary status={api.error} />
          </React.Suspense>
        ) : apiLoading ? (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Loading className="p-4" />
          </React.Suspense>
        ) : (
          <div>
            {results.length > 0 && (
              <React.Suspense fallback={<div>Loading...</div>}>
                <DataGrid
                  id={id}
                  items={results}
                  type={refInfo.model}
                  selectedColumns={filteredColumns}
                  tableStyle="fullWidth"
                  rowClass={getTableRowClass}
                  onRowSelected={onRowSelected}
                  onHeaderSelected={onHeaderSelected}
                />
              </React.Suspense>
            )}
          </div>
        )}
      </div>

      {showQueryPrefs && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <QueryPrefs
            columns={viewModelColumns}
            prefs={apiPrefs}
            onDone={() => setShowQueryPrefs(false)}
            onSave={saveApiPrefs}
          />
        </React.Suspense>
      )}
    </ModalDialog>
  )
}
