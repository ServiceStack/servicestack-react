import { forwardRef, useImperativeHandle, useRef, useMemo, useContext, createContext } from 'react'
import type { TextInputProps, TextInputRef } from '@/components/types'
import type { ApiState } from "@/types"
import { errorResponse, humanize, omit, toPascalCase } from "@servicestack/client"
import { input, filterClass } from './css'
import { textInputValue } from '@/use/utils'

export const ApiStateContext = createContext<ApiState | undefined>(undefined)

const TextInput = forwardRef<TextInputRef, TextInputProps & { className?: string }>(({
  id,
  type,
  label,
  labelClass,
  help,
  placeholder,
  value: modelValue,
  onChange,
  status,
  inputClass,
  filterClass: filterClassProp,
  className,
  ...attrs
}, ref) => {
  const inputElement = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputElement.current?.focus()
  }))

  const useType = useMemo(() => type || 'text', [type])
  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])
  const usePlaceholder = useMemo(() => placeholder ?? useLabel, [placeholder, useLabel])
  
  const fixShadow = (cls: string) => {
    return type === 'range' ? cls.replace('shadow-sm ', '') : cls
  }

  const ctx = useContext(ApiStateContext)
  const errorField = useMemo(() => 
    errorResponse.call({ responseStatus: status ?? (ctx as any)?.error?.current }, id)
  , [status, ctx, id])

  const cls = useMemo(() => 
    filterClass([
      input.base, 
      errorField ? input.invalid : fixShadow(input.valid), 
      inputClass
    ], 'TextInput', filterClassProp)
  , [errorField, inputClass, filterClassProp, type])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = textInputValue(useType, e.target.value)
    onChange?.(newValue)
  }

  return (
    <div className={className}>
      {useLabel && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
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
          value={textInputValue(useType, modelValue) as string}
          onChange={handleInput}
          aria-invalid={errorField != null}
          aria-describedby={`${id}-error`}
          step="any"
          {...omit(attrs, ['value'])}
        />
        {errorField && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {errorField ? (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
      ) : help ? (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>{help}</p>
      ) : null}
    </div>
  )
})

TextInput.displayName = 'TextInput'

export default TextInput

