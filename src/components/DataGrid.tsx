import { useRef, useMemo } from 'react'
import type { Breakpoint, FormatInfo, MetadataPropertyType } from '@/types'
import type { DataGridProps } from '@/components/types'
import { grid } from './css'
import { humanify, map, uniqueKeys, mapGet } from '@servicestack/client'
import { useMetadata } from '@/use/metadata'
import { getTypeName } from '@/use/utils'
import CellFormat from './CellFormat'
import PreviewFormat from './PreviewFormat'

export default function DataGrid({
  id: _id = 'DataGrid',
  items = [],
  type,
  tableStyle = "stripedRows",
  selectedColumns,
  gridClass: gridClassProp,
  grid2Class: grid2ClassProp,
  grid3Class: grid3ClassProp,
  grid4Class: grid4ClassProp,
  tableClass: tableClassProp,
  tbodyClass: tbodyClassProp,
  theadClass: theadClassProp,
  theadRowClass: theadRowClassProp,
  theadCellClass: theadCellClassProp,
  headerTitles,
  headerTitle,
  visibleFrom,
  rowClass,
  rowStyle,
  isSelected,
  onHeaderSelected,
  onRowSelected,
  children
}: DataGridProps & { children?: any }) {
  const refResults = useRef<HTMLDivElement | null>(null)

  const { typeOf, typeProperties } = useMetadata()
  const typeName = useMemo(() => getTypeName(type), [type])
  const metaType = useMemo(() => typeOf(typeName), [typeName])
  const typeProps = useMemo(() => typeProperties(metaType), [metaType])

  function headerFormat(column: string) {
    const title = headerTitles && mapGet(headerTitles, column) || column
    return headerTitle
      ? headerTitle(title)
      : humanify(title)
  }

  function columnProp(column: string) {
    const columnLower = column.toLowerCase()
    return typeProps.find(x => x.name.toLowerCase() == columnLower)
  }

  function columnFormat(column: string) {
    const prop = columnProp(column)
    if (prop?.format)
      return prop.format
    if (prop?.type == 'TimeSpan' || prop?.type == 'TimeOnly')
      return { method: 'time' }
    return null
  }

  const cellBreakpoints = {
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

  function getTableRowStyle(item: any, i: number) {
    return rowStyle
      ? rowStyle(item, i)
      : undefined
  }

  // Extract column slots from children
  const columnSlots = useMemo(() => {
    if (!children) return []
    const slots: string[] = []
    // This is a simplified version - in real implementation you'd need to handle React children properly
    return slots
  }, [children])

  const visibleColumns = useMemo(() => {
    const ret = (typeof selectedColumns == 'string' ? selectedColumns.split(',') : selectedColumns) ||
      (columnSlots.length > 0 ? columnSlots : uniqueKeys(items))

    const formatMap = typeProps.reduce((acc: { [k: string]: FormatInfo | undefined }, x: MetadataPropertyType) => {
      acc[x.name!.toLowerCase()] = x.format; return acc
    }, {})
    return ret.filter(x => formatMap[x.toLowerCase()]?.method != 'hidden')
  }, [selectedColumns, columnSlots, items, typeProps])

  // Helper to get slot content for a column
  const getSlot = (_column: string, _type: 'header' | 'cell', _item?: any) => {
    if (!children) return null
    // This is simplified - real implementation would need proper React children handling
    return null
  }

  if (!items.length) return null

  return (
    <div ref={refResults} className={gridClass}>
      <div className={grid2Class}>
        <div className={grid3Class}>
          <div className={grid4Class}>
            <table className={tableClass}>
              <thead className={theadClass}>
                <tr className={theadRowClass}>
                  {visibleColumns.map(column => (
                    <td
                      key={column}
                      className={`${cellClass(column)} ${theadCellClass} text-gray-500 dark:text-gray-400`}
                    >
                      <div onClick={(e) => onHeaderSelected?.(column, e as any)}>
                        {getSlot(column, 'header') || (
                          <div className="flex justify-between items-center">
                            <span className="mr-1 select-none">
                              {headerFormat(column)}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody className={tbodyClass}>
                {items.map((item, i) => (
                  <tr
                    key={i}
                    className={getTableRowClass(item, i)}
                    style={getTableRowStyle(item, i) as any}
                    onClick={(e) => onRowSelected?.(item, e as any)}
                  >
                    {visibleColumns.map(column => (
                      <td key={column} className={`${cellClass(column)} ${grid.tableCellClass}`}>
                        {getSlot(column, 'cell', item) || (
                          columnProp(column) ? (
                            <CellFormat type={metaType!} propType={columnProp(column)!} value={item} />
                          ) : (
                            <PreviewFormat value={mapGet(item, column)} format={columnFormat(column) ?? undefined} />
                          )
                        )}
                      </td>
                    ))}
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
