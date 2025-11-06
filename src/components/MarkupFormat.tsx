import React, { useMemo } from 'react'
import type { MarkupFormatProps } from '@/components/types'
import { useFiles } from '@/use/files'
import Icon from './Icon'
import HtmlFormat from './HtmlFormat'

export default function MarkupFormat(props: MarkupFormatProps) {
    const { value, imageClass = 'w-8 h-8' } = props
    const { getMimeType } = useFiles()

    const type = useMemo(() => {
        const v = value
        let type: string = typeof value
        const mimeType = type === 'string' && v.length ? getMimeType(v) : null

        if (type === 'string' && v.length) {
            const url = v.startsWith('https://') || v.startsWith('http://')
            const path = url || v[0] === '/'

            if (path && mimeType?.startsWith('image/')) {
                return 'image'
            } else if (url) {
                return 'link'
            }
        }

        return type
    }, [value, getMimeType])

    if (type === 'link') {
        return (
            <a href={value} className="text-indigo-600">
                {value}
            </a>
        )
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
