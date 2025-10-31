import React, { useMemo } from 'react'
import type { MarkupModelProps } from '@/components/types'
import { humanize } from '@servicestack/client'
import MarkupFormat from './MarkupFormat'

export default function MarkupModel({ value }: MarkupModelProps) {
  const { basic, complex } = useMemo(() => {
    const fields = Object.keys(value)
    const basic: {[k:string]:any} = {}
    const complex: {[k:string]:any} = {}

    fields.forEach(k => {
      const v = value[k]
      const t = typeof v
      if (v == null || t === 'function' || t === 'symbol') {
        basic[k] = `(${v == null ? 'null' : t})`
      } else if (t === 'object') {
        complex[k] = v
      } else {
        basic[k] = v
      }
    })

    return { basic, complex }
  }, [value])

  return (
    <table className="my-2 w-full">
      <tbody>
        {Object.entries(basic).map(([k, v]) => (
          <tr key={k} className="leading-7">
            <th className="px-2 text-left align-top">{humanize(k)}</th>
            <td className="align-top"><MarkupFormat value={v} /></td>
          </tr>
        ))}
        {Object.entries(complex).map(([k, v]) => (
          <React.Fragment key={k}>
            <tr className="my-2 leading-7">
              <td colSpan={2} className="px-2 bg-indigo-700 text-white">{humanize(k)}</td>
            </tr>
            <tr className="leading-7">
              <td colSpan={2} className="px-2 align-top"><MarkupFormat value={v} /></td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  )
}
