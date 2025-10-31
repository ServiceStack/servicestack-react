import { useMemo, useContext } from 'react'
import type { TextareaInputProps } from '@/components/types'
import { errorResponse, humanize, omit, toPascalCase } from "@servicestack/client"
import { input, filterClass as filterClassFn } from "./css"
import { ApiStateContext } from './TextInput'

export default function TextareaInput({
  id,
  label,
  placeholder,
  help,
  value: modelValue,
  onChange,
  status,
  inputClass,
  labelClass,
  filterClass,
  className,
  ...attrs
}: TextareaInputProps & { className?: string }) {

  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])
  const usePlaceholder = useMemo(() => placeholder ?? useLabel, [placeholder, useLabel])

  const ctx = useContext(ApiStateContext)
  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status ?? (ctx as any)?.error?.current }, id)
  , [status, ctx, id])

  const cls = useMemo(() => filterClassFn(['shadow-sm ' + input.base,
    errorField
      ? 'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300'
      : 'text-gray-900 ' + input.valid, inputClass], 'TextareaInput', filterClass), [errorField, inputClass, filterClass])

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={className}>
      {useLabel && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
      )}
      <div className="mt-1 relative">
        <textarea
          name={id}
          id={id}
          className={cls}
          placeholder={usePlaceholder}
          onChange={handleInput}
          value={modelValue ?? ''}
          aria-invalid={errorField != null}
          aria-describedby={`${id}-error`}
          {...omit(attrs, ['class'])}
        />
      </div>
      {errorField ? (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
      ) : help ? (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>{help}</p>
      ) : null}
    </div>
  )
}
