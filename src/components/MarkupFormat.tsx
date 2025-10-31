import { useMemo } from 'react'
import type { MarkupFormatProps } from '@/components/types'
import { useFiles } from '@/use/files'
import Icon from './Icon'
import HtmlFormat from './HtmlFormat'

export default function MarkupFormat({ value, imageClass = 'w-8 h-8' }: MarkupFormatProps) {
  const { getMimeType } = useFiles()

  const { type } = useMemo(() => {
    const v = value
    let type: string = typeof value
    const mimeType = type === 'string' && v.length ? getMimeType(v) : null

    if (type === 'string' && v.length) {
      const url = v.startsWith('https://') || v.startsWith('http://')
      const path = url || v[0] === '/'

      if (path && mimeType?.startsWith('image/')) {
        type = 'image'
      } else if (url) {
        type = 'link'
      }
    }

    return { type, mimeType }
  }, [value, getMimeType])

  if (type === 'link') {
    return <a href={value} className="text-indigo-600">{value}</a>
  }

  if (type === 'image') {
    return (
      <a href={value} title={value} className="inline-block">
        <Icon src={value} className={imageClass} />
      </a>
    )
  }

  return <HtmlFormat value={value} />
}
