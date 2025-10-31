import type { InputDescriptionProps } from '@/components/types'

export default function InputDescription({ id, description }: InputDescriptionProps) {
  if (!description) return null

  return (
    <div
      key="description"
      className="mt-2 text-sm text-gray-500"
      id={`${id}-description`}
      aria-describedby={`${id}-description`}
    >
      <div>{description}</div>
    </div>
  )
}
