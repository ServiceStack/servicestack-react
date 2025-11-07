import React, { useMemo } from 'react'
import type { TextareaInputProps } from './types'
import { errorResponse, humanize, omit, toPascalCase } from '@servicestack/client'
import { input, filterClass } from './css'
import { useApiState } from '../use/context'

/**
 * TextareaInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const TextareaInput: React.FC<TextareaInputProps & React.HTMLAttributes<HTMLTextAreaElement>> = (props) => {
  const {
    status,
    id,
    inputClass,
    filterClass: filterClassFn,
    label,
    labelClass,
    help,
    placeholder,
    value,
    onChange,
    className,
    ...restProps
  } = props

  const apiState = useApiState()
  const useLabel = label ?? humanize(toPascalCase(id))
  const usePlaceholder = placeholder ?? useLabel

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
        'shadow-sm ' + input.base,
        errorField
          ? 'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300'
          : 'text-gray-900 ' + input.valid,
        inputClass
      ],
      'TextareaInput',
      filterClassFn
    ),
    [errorField, inputClass, filterClassFn]
  )

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <div className="mt-1 relative">
        <textarea
          name={id}
          id={id}
          className={cls}
          placeholder={usePlaceholder}
          value={value ?? ''}
          onChange={handleInput}
          aria-invalid={errorField != null}
          aria-describedby={`${id}-error`}
          {...omit(restProps, ['class'])}
        />
      </div>
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
  )
}

TextareaInput.displayName = 'TextareaInput'

export default TextareaInput
