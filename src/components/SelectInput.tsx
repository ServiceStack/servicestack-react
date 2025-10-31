import { useMemo, useContext } from 'react'
import type { SelectInputProps } from '@/components/types'
import { errorResponse, humanize, omit, toPascalCase } from "@servicestack/client"
import { filterClass as filterClassFn } from "./css"
import { ApiStateContext } from './TextInput'

export default function SelectInput({
  id,
  label,
  value: modelValue,
  onChange,
  status,
  entries,
  values,
  options,
  inputClass,
  labelClass,
  filterClass,
  className,
  ...attrs
}: SelectInputProps & { className?: string }) {

  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])

  const ctx = useContext(ApiStateContext)
  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status ?? (ctx as any)?.error?.current }, id)
  , [status, ctx, id])

  const kvpValues = useMemo(() =>
    entries || (values
      ? values.map(x => ({ key: x, value: x }))
      : options
        ? Object.keys(options).map(key => ({ key, value: options[key] }))
        : [])
  , [entries, values, options])

  const cls = useMemo(() => filterClassFn([
    'mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none',
    !errorField
      ? 'shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
      : 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500',
    inputClass
  ], 'SelectInput', filterClass), [errorField, inputClass, filterClass])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={className}>
      {useLabel && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
      )}
      <select
        id={id}
        name={id}
        className={cls}
        value={modelValue ?? ''}
        onChange={handleChange}
        aria-invalid={errorField != null}
        aria-describedby={`${id}-error`}
        {...omit(attrs, ['class'])}
      >
        {kvpValues.map(entry => (
          <option key={entry.key} value={entry.key}>{entry.value}</option>
        ))}
      </select>
      {errorField && (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
      )}
    </div>
  )
}
