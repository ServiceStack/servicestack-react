import React, { useMemo } from 'react'
import type { HtmlFormatProps } from '@/components/types'
import { humanify, uniqueKeys } from '@servicestack/client'
import { isPrimitive } from '@/use/utils'
import { formatValue } from '@/use/formatters'
import { grid } from '../components/css'

export default function HtmlFormat(props: HtmlFormatProps) {
    const {
        value,
        depth = 0,
        fieldAttrs,
        classes = (type: 'object' | 'array', tag: 'div' | 'table' | 'thead' | 'th' | 'tr' | 'td', depth: number, cls: string, index?: number) => {
            return cls
        }
    } = props

    const isScalar = useMemo(() => isPrimitive(value), [value])
    const isArray = useMemo(() => Array.isArray(value), [value])
    const keyFmt = (s: string) => humanify(s)
    const getAttrs = (k: string) => fieldAttrs ? fieldAttrs(k) : null
    const fields = useMemo(() => uniqueKeys(value), [value])
    const rows = (val: any) => val ? Object.keys(val).map(k => ({ key: keyFmt(k), val: val[k] })) : []

    const formattedValue = useMemo(() => formatValue(value), [value])

    // Scalar value
    if (isScalar) {
        return (
            <div className={depth === 0 ? 'prose html-format' : ''}>
                <div dangerouslySetInnerHTML={{ __html: formattedValue }} />
            </div>
        )
    }

    // Array value
    if (isArray) {
        return (
            <div className={depth === 0 ? 'prose html-format' : ''}>
                <div className={classes('array', 'div', depth, grid.gridClass)}>
                    {isPrimitive(value[0]) ? (
                        <div>[ {value.join(', ')} ]</div>
                    ) : (
                        <div className={classes('array', 'div', depth, grid.grid2Class)}>
                            <div className={classes('array', 'div', depth, grid.grid3Class)}>
                                <div className={classes('array', 'div', depth, grid.grid4Class)}>
                                    <table className={classes('object', 'table', depth, grid.tableClass)}>
                                        <thead className={classes('array', 'thead', depth, grid.theadClass)}>
                                            <tr>
                                                {fields.map(k => (
                                                    <th key={k} className={classes('array', 'th', depth, grid.theadCellClass + ' whitespace-nowrap')}>
                                                        <b></b>{keyFmt(k)}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {value.map((row: any, index: number) => (
                                                <tr key={index} className={classes('array', 'tr', depth, index % 2 === 0 ? 'bg-white' : 'bg-gray-50', index)}>
                                                    {fields.map(k => (
                                                        <td key={k} className={classes('array', 'td', depth, grid.tableCellClass)}>
                                                            <HtmlFormat
                                                                value={row[k]}
                                                                fieldAttrs={fieldAttrs}
                                                                depth={depth + 1}
                                                                classes={classes}
                                                                {...getAttrs(k)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Object value
    return (
        <div className={depth === 0 ? 'prose html-format' : ''}>
            <div>
                <table className={classes('object', 'table', depth, 'table-object')}>
                    <tbody>
                        {rows(value).map(row => (
                            <tr key={row.key} className={classes('object', 'tr', depth, '')}>
                                <th className={classes('object', 'th', depth, 'align-top py-2 px-4 text-left text-sm font-medium tracking-wider whitespace-nowrap')}>
                                    {row.key}
                                </th>
                                <td className={classes('object', 'td', depth, 'align-top py-2 px-4 text-sm')}>
                                    <HtmlFormat
                                        value={row.val}
                                        fieldAttrs={fieldAttrs}
                                        depth={depth + 1}
                                        classes={classes}
                                        {...getAttrs(row.key)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
