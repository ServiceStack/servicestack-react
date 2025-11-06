import React, { useMemo, useRef, CSSProperties } from 'react'
import type { Breakpoint, FormatInfo, MetadataPropertyType } from '@/types'
import type { DataGridProps } from '@/components/types'
import { form, grid } from './css'
import { humanify, map, uniqueKeys, mapGet } from '@servicestack/client'
import { useMetadata } from '@/use/metadata'
import { getTypeName } from '@/use/utils'
import CellFormat from './CellFormat'
import PreviewFormat from './PreviewFormat'

export default function DataGrid({
    id = 'DataGrid',
    items = [],
    tableStyle = "stripedRows",
    type,
    selectedColumns,
    className,
    gridClass: gridClassProp,
    grid2Class: grid2ClassProp,
    grid3Class: grid3ClassProp,
    grid4Class: grid4ClassProp,
    tableClass: tableClassProp,
    theadClass: theadClassProp,
    tbodyClass: tbodyClassProp,
    theadRowClass: theadRowClassProp,
    theadCellClass: theadCellClassProp,
    isSelected,
    headerTitle,
    headerTitles,
    visibleFrom,
    rowClass,
    rowStyle,
    onHeaderSelected,
    onRowSelected,
    children,
}: DataGridProps & { children?: React.ReactNode }) {

    const refResults = useRef<HTMLDivElement>(null)

    const { typeOf, typeProperties } = useMetadata()

    const typeName = useMemo(() => getTypeName(type), [type])
    const metaType = useMemo(() => typeOf(typeName), [typeName, typeOf])
    const typeProps = useMemo(() => typeProperties(metaType), [metaType, typeProperties])

    // Extract slots from children
    const slots = useMemo(() => {
        const slotMap: { [key: string]: React.ReactNode } = {}
        React.Children.forEach(children, child => {
            if (React.isValidElement(child) && (child.props as any).slot) {
                slotMap[(child.props as any).slot] = child
            }
        })
        return slotMap
    }, [children])

    const slotHeader = (column: string) => {
        const slotName = column.toLowerCase() + '-header'
        return Object.keys(slots).find(x => x.toLowerCase() === slotName)
    }

    const slotColumn = (column: string) => {
        return Object.keys(slots).find(x => x.toLowerCase() === column.toLowerCase())
    }

    const columnSlots = useMemo(() =>
        uniqueKeys(items).filter(k => !!(slots[k] || slots[k + '-header'])),
        [items, slots]
    )

    function headerFormat(column: string) {
        const title = headerTitles && mapGet(headerTitles, column) || column
        return headerTitle
            ? headerTitle(title)
            : humanify(title)
    }

    function columnProp(column: string): MetadataPropertyType | undefined {
        const columnLower = column.toLowerCase()
        return typeProps.find(x => x.name.toLowerCase() === columnLower)
    }

    function columnFormat(column: string): FormatInfo | null {
        const prop = columnProp(column)
        if (prop?.format)
            return prop.format
        if (prop?.type === 'TimeSpan' || prop?.type === 'TimeOnly')
            return { method: 'time' }
        return null
    }

    const cellBreakpoints: Record<Breakpoint | 'never', string> = {
        xs: 'xs:table-cell',
        sm: 'sm:table-cell',
        md: 'md:table-cell',
        lg: 'lg:table-cell',
        xl: 'xl:table-cell',
        '2xl': '2xl:table-cell',
        never: '',
    }

    function cellClass(column: string) {
        const breakpoint = visibleFrom && mapGet(visibleFrom, column) as Breakpoint
        return breakpoint && map(cellBreakpoints[breakpoint], cls => `hidden ${cls}`)
    }

    const gridClass = useMemo(() => gridClassProp ?? grid.getGridClass(tableStyle), [gridClassProp, tableStyle])
    const grid2Class = useMemo(() => grid2ClassProp ?? grid.getGrid2Class(tableStyle), [grid2ClassProp, tableStyle])
    const grid3Class = useMemo(() => grid3ClassProp ?? grid.getGrid3Class(tableStyle), [grid3ClassProp, tableStyle])
    const grid4Class = useMemo(() => grid4ClassProp ?? grid.getGrid4Class(tableStyle), [grid4ClassProp, tableStyle])
    const tableClass = useMemo(() => tableClassProp ?? grid.getTableClass(tableStyle), [tableClassProp, tableStyle])
    const tbodyClass = useMemo(() => tbodyClassProp ?? grid.getTbodyClass(tbodyClassProp), [tbodyClassProp])
    const theadClass = useMemo(() => theadClassProp ?? grid.getTheadClass(tableStyle), [theadClassProp, tableStyle])
    const theadRowClass = useMemo(() => theadRowClassProp ?? grid.getTheadRowClass(tableStyle), [theadRowClassProp, tableStyle])
    const theadCellClass = useMemo(() => theadCellClassProp ?? grid.getTheadCellClass(tableStyle), [theadCellClassProp, tableStyle])

    function getTableRowClass(item: any, i: number) {
        return rowClass
            ? rowClass(item, i)
            : grid.getTableRowClass(tableStyle, i, isSelected && isSelected(item) ? true : false, isSelected != null)
    }

    function getTableRowStyle(item: any, i: number): CSSProperties | undefined {
        return rowStyle
            ? rowStyle(item, i)
            : undefined
    }

    const visibleColumns = useMemo(() => {
        const ret = (typeof selectedColumns === 'string' ? selectedColumns.split(',') : selectedColumns) ||
            (columnSlots.length > 0 ? columnSlots : uniqueKeys(items))

        const formatMap = typeProps.reduce((acc: { [k: string]: FormatInfo | undefined }, x: MetadataPropertyType) =>
            { acc[x.name!.toLowerCase()] = x.format; return acc }, {})
        return ret.filter(x => formatMap[x.toLowerCase()]?.method !== 'hidden')
    }, [selectedColumns, columnSlots, items, typeProps])

    const handleHeaderSelected = (column: string, e: React.MouseEvent) => {
        if (onHeaderSelected) {
            onHeaderSelected(column, e)
        }
    }

    const handleRowSelected = (i: number, row: any, e: React.MouseEvent) => {
        if (onRowSelected) {
            onRowSelected(row, e)
        }
    }

    if (!items.length) return null

    return (
        <div ref={refResults} className={`${gridClass} ${className || ''}`}>
            <div className={grid2Class}>
                <div className={grid3Class}>
                    <div className={grid4Class}>
                        <table className={tableClass}>
                            <thead className={theadClass}>
                                <tr className={theadRowClass}>
                                    {visibleColumns.map(column => {
                                        const headerSlotName = slotHeader(column)
                                        const isOpen = false // You may want to pass this from parent or manage it

                                        return (
                                            <td
                                                key={column}
                                                className={`${cellClass(column)} ${theadCellClass} ${isOpen ? 'text-gray-900 dark:text-gray-50' : 'text-gray-500 dark:text-gray-400'}`}
                                            >
                                                <div onClick={(e) => handleHeaderSelected(column, e)}>
                                                    {slots[column + '-header'] ?
                                                        slots[column + '-header'] :
                                                        headerSlotName && slots[headerSlotName] ?
                                                            slots[headerSlotName] :
                                                            slots.header ?
                                                                React.cloneElement(slots.header as React.ReactElement, { column, label: headerFormat(column) } as any) :
                                                                <div className="flex justify-between items-center">
                                                                    <span className="mr-1 select-none">
                                                                        {headerFormat(column)}
                                                                    </span>
                                                                </div>
                                                    }
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {items.map((item, i) => (
                                    <tr
                                        key={i}
                                        className={getTableRowClass(item, i)}
                                        style={getTableRowStyle(item, i)}
                                        onClick={(e) => handleRowSelected(i, item, e)}
                                    >
                                        {visibleColumns.map(column => {
                                            const colSlotName = slotColumn(column)

                                            return (
                                                <td
                                                    key={column}
                                                    className={`${cellClass(column)} ${grid.tableCellClass}`}
                                                >
                                                    {slots[column] ?
                                                        React.cloneElement(slots[column] as React.ReactElement, item) :
                                                        colSlotName && slots[colSlotName] ?
                                                            React.cloneElement(slots[colSlotName] as React.ReactElement, item) :
                                                            columnProp(column) ?
                                                                <CellFormat type={metaType} propType={columnProp(column)!} value={item} /> :
                                                                <PreviewFormat value={mapGet(item, column)} format={columnFormat(column)} />
                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
