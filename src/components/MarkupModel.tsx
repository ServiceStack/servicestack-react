import React, { useMemo } from 'react'
import type { MarkupModelProps } from '@/components/types'
import { humanize } from '@servicestack/client'
import MarkupFormat from './MarkupFormat'

export default function MarkupModel(props: MarkupModelProps) {
    const { value } = props

    const { basic, complex } = useMemo(() => {
        const fields = Object.keys(value)
        const basic: { [k: string]: any } = {}
        const complex: { [k: string]: any } = {}

        fields.forEach(k => {
            const v = value[k]
            const t = typeof v
            if (v == null || t === 'function' || t === 'symbol') {
                basic[k] = `(${v == null ? 'null' : t})`
            }
            else if (t === 'object') {
                complex[k] = v
            } else {
                basic[k] = v
            }
        })

        return { basic, complex }
    }, [value])

    return (
        <table className={props.tableClass ?? "my-2 w-full"}>
            <tbody>
                {Object.entries(basic).map(([k, v]) => (
                    <tr key={k} className={props.basicTrClass ?? "leading-7"}>
                        <th className={props.basicThClass ?? "px-2 text-left align-top"}>{humanize(k)}</th>
                        <td className={props.basicTdClass ?? "align-top"}>
                            <MarkupFormat value={v} />
                        </td>
                    </tr>
                ))}
                {Object.entries(complex).map(([k, v]) => (
                    <React.Fragment key={k}>
                        <tr className={props.complexTitleTrClass ?? "my-2 leading-7"}>
                            <th colSpan={2} className={props.complexTitleTdClass ?? "px-2 bg-indigo-700 text-white"}>
                                {humanize(k)}
                            </th>
                        </tr>
                        <tr className={props.complexBodyTrClass ?? "leading-7"}>
                            <td colSpan={2} className={props.complexBodyTdClass ?? "px-2 align-top"}>
                                <MarkupFormat value={v} />
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    )
}
