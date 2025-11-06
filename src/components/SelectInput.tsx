import React, { useMemo } from 'react'
import type { SelectInputProps } from './types'
import { errorResponse, humanize, omit, toPascalCase } from '@servicestack/client'
import { filterClass } from './css'

const SelectInput: React.FC<SelectInputProps & React.HTMLAttributes<HTMLSelectElement>> = (props) => {
  const {
    status,
    id,
    value,
    inputClass,
    filterClass: filterClassFn,
    label,
    labelClass,
    options,
    values,
    entries,
    onChange,
    className,
    ...restProps
  } = props

  const useLabel = label ?? humanize(toPascalCase(id))

  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status }, id),
    [status, id]
  )

  const kvpValues = useMemo(() => {
    if (entries) return entries
    if (values) return values.map(x => ({ key: x, value: x }))
    if (options) return Object.keys(options).map(key => ({ key, value: options[key] }))
    return []
  }, [entries, values, options])

  const cls = useMemo(() =>
    filterClass(
      [
        'mt-1 block w-full pl-3 pr-10 py-2 text-base focus:outline-none sm:text-sm rounded-md dark:text-white dark:bg-gray-900 dark:border-gray-600 disabled:bg-slate-50 dark:disabled:bg-slate-900 disabled:text-slate-500 disabled:border-slate-200 dark:disabled:border-slate-700 disabled:shadow-none',
        !errorField
          ? 'shadow-sm border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500'
          : 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500',
        inputClass
      ],
      'SelectInput',
      filterClassFn
    ),
    [errorField, inputClass, filterClassFn]
  )

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={className}>
      {useLabel && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}
        >
          {useLabel}
        </label>
      )}
      <select
        id={id}
        name={id}
        className={cls}
        value={value ?? ''}
        onChange={handleChange}
        aria-invalid={errorField != null}
        aria-describedby={`${id}-error`}
        {...omit(restProps, ['class'])}
      >
        {kvpValues.map((entry) => (
          <option key={entry.key} value={entry.key}>
            {entry.value}
          </option>
        ))}
      </select>
      {errorField && (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>
          {errorField}
        </p>
      )}
    </div>
  )
}

SelectInput.displayName = 'SelectInput'

export default SelectInput
