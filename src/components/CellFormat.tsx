import React, { useMemo } from 'react'
import type { MetadataPropertyType, FormatInfo, RefInfo } from '@/types'
import type { CellFormatProps } from './types'
import { typeProperties, useMetadata } from '@/use/metadata'
import { mapGet } from '@servicestack/client'
import { isComplexType } from '@/use/utils'
import { formatValue } from '@/use/formatters'
import Icon from './Icon'

export default function CellFormat(props: CellFormatProps) {
    const { typeOf } = useMetadata()

    function propFormat(prop: MetadataPropertyType) {
        if (prop?.format)
            return prop.format
        if (prop?.type === 'TimeSpan' || prop?.type === 'TimeOnly')
            return { method: 'time' }
        return null
    }

    const formatInfo: FormatInfo | null = propFormat(props.propType as MetadataPropertyType)
    const value = mapGet(props.value, props.propType!.name!)

    const formattedValue = useMemo(() => {
        return formatValue(value, formatInfo, props)
    }, [value, formatInfo, props])

    const hFormatValue = <span dangerouslySetInnerHTML={{ __html: formattedValue }} />

    const hValue = useMemo(() => {
        if (isComplexType(value) && Array.isArray(value)) {
            return (
                <span>
                    <span className="mr-2">{value.length}</span>
                    {hFormatValue}
                </span>
            )
        }
        return hFormatValue
    }, [value, hFormatValue])

    const ref = props.propType?.ref as RefInfo
    if (!ref)
        return hValue

    const modelProps = typeProperties(props.type)
    const complexRefProp = modelProps.find(x => x.type === ref.model)
    if (!complexRefProp)
        return hValue

    const complexRefValue = mapGet(props.value, complexRefProp.name)
    const labelValue: any = complexRefValue && ref.refLabel && mapGet(complexRefValue, ref.refLabel)
    if (!labelValue)
        return hValue

    const refType = typeOf(ref.model)
    const image = refType?.icon

    return (
        <span className="flex" title={`${ref.model} ${value}`}>
            {image && <Icon image={image} className="w-5 h-5 mr-1" />}
            {labelValue}
        </span>
    )
}
