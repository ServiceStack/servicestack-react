import type { InputDescriptionProps } from '@/components/types'

export default function InputDescription({ id, description, className }: InputDescriptionProps) {
  if (!description) return null

  return (
    <div
      className={`mt-2 text-sm text-gray-500 ${className || ''}`}
      id={`${id}-description`}
      aria-describedby={`${id}-description`}
    >
      <div>{description}</div>
    </div>
  )
}
