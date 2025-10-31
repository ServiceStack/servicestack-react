import { useMemo, useContext } from 'react'
import type { CheckboxInputProps } from '@/components/types'
import { errorResponse, humanize, omit, toPascalCase } from "@servicestack/client"
import { filterClass as filterClassFn } from "./css"
import { ApiStateContext } from './TextInput'

export default function CheckboxInput({
  id,
  label,
  help,
  value: modelValue,
  onChange,
  status,
  inputClass,
  labelClass,
  filterClass,
  className,
  ...attrs
}: CheckboxInputProps & { className?: string }) {

  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])

  const ctx = useContext(ApiStateContext)
  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status ?? (ctx as any)?.error?.current }, id)
  , [status, ctx, id])

  const cls = useMemo(() => filterClassFn([
    'focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800',
    inputClass
  ], 'CheckboxInput', filterClass), [inputClass, filterClass])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked)
  }

  return (
    <div className={`relative flex items-start ${className ?? ''}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={modelValue ?? false}
          onChange={handleChange}
          className={cls}
          {...omit(attrs, ['class'])}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className={`font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
        {errorField ? (
          <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
        ) : help ? (
          <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>{help}</p>
        ) : null}
      </div>
    </div>
  )
}
