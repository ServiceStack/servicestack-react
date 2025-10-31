import { useMemo } from 'react'
import type { PreviewFormatProps } from '@/components/types'
import { isComplexType } from '@/use/utils'
import { formatValue } from '@/use/formatters'

export default function PreviewFormat({
  value,
  format,
  includeIcon = true,
  includeCount = true,
  maxFieldLength = 150,
  maxNestedFields = 2,
  maxNestedFieldLength = 30,
  ...attrs
}: PreviewFormatProps) {

  const isArray = useMemo(() => Array.isArray(value), [value])
  const formattedValue = useMemo(() => formatValue(value, format, attrs), [value, format, attrs])

  if (isComplexType(value)) {
    return (
      <span>
        {includeCount && isArray && <span className="mr-2">{(value as any[]).length}</span>}
        <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
      </span>
    )
  }

  return <span dangerouslySetInnerHTML={{ __html: formattedValue }} />
}
