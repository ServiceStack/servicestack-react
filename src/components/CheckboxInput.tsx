import React, { useMemo } from 'react'
import type { CheckboxInputProps } from './types'
import { errorResponse, humanize, omit, toPascalCase } from '@servicestack/client'
import { filterClass } from './css'
import { useApiState } from '../use/context'

/**
 * CheckboxInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const CheckboxInput: React.FC<CheckboxInputProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>> = (props) => {
  const {
    value,
    status,
    id,
    inputClass,
    filterClass: filterClassFn,
    label,
    labelClass,
    help,
    onChange,
    className,
    ...restProps
  } = props

  const apiState = useApiState()
  const useLabel = label ?? humanize(toPascalCase(id))

  // Use status prop if provided, otherwise fall back to apiState error
  const responseStatus = useMemo(() =>
    status || apiState?.error,
    [status, apiState?.error]
  )

  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus }, id),
    [responseStatus, id]
  )

  const cls = useMemo(() =>
    filterClass(
      [
        'focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800',
        inputClass
      ],
      'CheckboxInput',
      filterClassFn
    ),
    [inputClass, filterClassFn]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked)
    }
  }

  return (
    <div className={`relative flex items-start ${className ?? ''}`}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={value ?? false}
          onChange={handleChange}
          className={cls}
          {...omit(restProps, ['class'])}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={id}
          className={`font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}
        >
          {useLabel}
        </label>
        {errorField ? (
          <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>
            {errorField}
          </p>
        ) : help ? (
          <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
            {help}
          </p>
        ) : null}
      </div>
    </div>
  )
}

CheckboxInput.displayName = 'CheckboxInput'

export default CheckboxInput
