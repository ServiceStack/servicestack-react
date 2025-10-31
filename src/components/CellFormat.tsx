import type { CellFormatProps } from '@/components/types'
import type { MetadataPropertyType, FormatInfo, RefInfo } from '@/types'
import { typeProperties, useMetadata } from '@/use/metadata'
import { mapGet } from '@servicestack/client'
import { isComplexType } from '@/use/utils'
import { formatValue } from '@/use/formatters'
import Icon from './Icon'

export default function CellFormat({ type, propType, value, ...attrs }: CellFormatProps) {
  const { typeOf } = useMetadata()

  function propFormat(prop: MetadataPropertyType) {
    if (prop?.format)
      return prop.format
    if (prop?.type == 'TimeSpan' || prop?.type == 'TimeOnly')
      return { method: 'time' }
    return null
  }

  const formatInfo: FormatInfo | null = propFormat(propType as MetadataPropertyType)
  const fieldValue = mapGet(value, propType!.name!)
  const useAttrs = Object.assign({}, { type, propType, value }, attrs)

  const formattedValue = formatValue(fieldValue, formatInfo, useAttrs)

  const valueElement = isComplexType(fieldValue) && Array.isArray(fieldValue) ? (
    <span>
      <span className="mr-2">{fieldValue.length}</span>
      <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
    </span>
  ) : (
    <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
  )

  const ref = propType?.ref as RefInfo
  if (!ref)
    return valueElement

  const modelProps = typeProperties(type)
  const complexRefProp = modelProps.find(x => x.type === ref.model)
  if (!complexRefProp)
    return valueElement

  const complexRefValue = mapGet(value, complexRefProp.name)
  const labelValue: any = complexRefValue && ref.refLabel && mapGet(complexRefValue, ref.refLabel)
  if (!labelValue)
    return valueElement

  const refType = typeOf(ref.model)
  const image = refType?.icon

  return (
    <span className="flex" title={`${ref.model} ${value}`}>
      {image && <Icon image={image} className="w-5 h-5 mr-1" />}
      {labelValue}
    </span>
  )
}
