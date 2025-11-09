import React, { forwardRef, useImperativeHandle, useRef, useMemo } from 'react'
import type { TextInputProps, TextInputRef } from './types'
import { errorResponse, humanize, omit, toPascalCase } from '@servicestack/client'
import { input, filterClass } from './css'
import { textInputValue } from '../use/utils'
import { useApiState } from '../use/context'

/**
 * TextInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 *
 * @example
 * ```tsx
 * // With explicit status prop
 * <TextInput id="email" status={responseStatus} />
 *
 * // Within a form component (uses context automatically)
 * <AutoForm type={MyDto}>
 *   <TextInput id="email" />
 * </AutoForm>
 * ```
 */
const TextInput = forwardRef<TextInputRef, TextInputProps & Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'>>(
  (props, ref) => {
    const {
      status,
      id,
      type = 'text',
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

    const inputElement = useRef<HTMLInputElement>(null)
    const apiState = useApiState()

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputElement.current?.focus()
      }
    }))

    const useType = type || 'text'
    const useLabel = label ?? humanize(toPascalCase(id))
    const usePlaceholder = placeholder ?? useLabel

    const fixShadow = (cls: string) => {
      return type === 'range' ? cls.replace('shadow-sm ', '') : cls
    }

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
        [input.base, errorField ? input.invalid : fixShadow(input.valid), inputClass],
        'TextInput',
        filterClassFn
      ),
      [errorField, inputClass, filterClassFn, type]
    )

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const newValue = textInputValue(useType, e.target.value)
        onChange(newValue)
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
        <div className={fixShadow('mt-1 relative')}>
          <input
            ref={inputElement}
            type={useType}
            name={id}
            id={id}
            className={cls}
            placeholder={usePlaceholder}
            value={textInputValue(useType, value)}
            onChange={handleInput}
            aria-invalid={errorField != null}
            aria-describedby={`${id}-error`}
            step="any"
            {...omit(restProps, ['class', 'value'])}
          />
          {errorField && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
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
)

TextInput.displayName = 'TextInput'

export default TextInput
