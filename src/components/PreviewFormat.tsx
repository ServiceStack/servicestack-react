import React, { useMemo } from 'react'
import type { PreviewFormatProps } from '@/components/types'
import { isComplexType } from '@/use/utils'
import { formatValue } from '@/use/formatters'

export default function PreviewFormat(props: PreviewFormatProps) {
    const {
        value,
        format,
        includeIcon = true,
        includeCount = true,
        maxFieldLength = 150,
        maxNestedFields = 2,
        maxNestedFieldLength = 30,
        ...attrs
    } = props

    const isArray = useMemo(() => Array.isArray(value), [value])

    const formattedValue = useMemo(() => {
        return formatValue(value, format, {
            includeIcon,
            includeCount,
            maxFieldLength,
            maxNestedFields,
            maxNestedFieldLength,
            ...attrs
        })
    }, [value, format, includeIcon, includeCount, maxFieldLength, maxNestedFields, maxNestedFieldLength, attrs])

    if (isComplexType(value)) {
        return (
            <span>
                {includeCount && isArray && <span className="mr-2">{value.length}</span>}
                <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
            </span>
        )
    }

    return <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
}
