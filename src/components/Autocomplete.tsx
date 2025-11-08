import React, { useState, useMemo, useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import type { ApiState } from '../types'
import type { AutocompleteProps } from '@/components/types'
import { errorResponse, humanize, toPascalCase } from '@servicestack/client'
import { focusNextElement } from '@/use/utils'
import { input } from './css'
import { useApiState } from '../use/context'

export interface AutocompleteRef {
  toggle(expand: boolean): void
}

/**
 * Autocomplete component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const Autocomplete = forwardRef<AutocompleteRef, AutocompleteProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof AutocompleteProps>>(({
  id,
  label,
  help,
  placeholder,
  multiple = false,
  required,
  options = [],
  value,
  match,
  viewCount = 100,
  pageSize = 8,
  status,
  onChange,
  children,
  className,
  ...attrs
}, ref) => {
  const [expanded, setExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [active, setActive] = useState<any | null>(null)
  const [take, setTake] = useState(viewCount)
  const [filteredValues, setFilteredValues] = useState<any[]>([])
  const txtInputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  const cls = useMemo(() => {
    if (multiple) {
      return [
        'w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none',
        errorField
          ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500'
          : 'shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500'
      ].join(' ')
    }
    return [
      input.base,
      errorField ? input.invalid : input.valid
    ].join(' ')
  }, [errorField, multiple])

  const filteredOptions = useMemo(() => {
    let ret = !inputValue
      ? options
      : options.filter(x => match(x, inputValue)).slice(0, take)
    return ret
  }, [inputValue, options, match, take])

  const navKeys = ['Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'Enter', 'PageUp', 'PageDown', 'Home', 'End']

  const setActiveOption = useCallback((option: any) => {
    setActive(option)
    const currIndex = filteredValues.indexOf(option)
    if (currIndex > Math.floor(take * 0.9)) {
      setTake(prev => prev + viewCount)
      refresh()
    }
  }, [filteredValues, take, viewCount])

  const delims = [',', '\n', '\t']

  const handlePastedText = useCallback((txt?: string) => {
    if (!txt) return

    const multipleValues = delims.some(x => txt.includes(x))
    if (!multiple || !multipleValues) {
      const matches = options.filter(x => match(x, txt))
      if (matches.length === 1) {
        select(matches[0])
        setExpanded(false)
        focusNextElement()
      }
    } else if (multipleValues) {
      const re = new RegExp(`\\r|\\n|\\t|,`)
      const values = txt.split(re).filter(x => x.trim())
      const matches = values.map(val => options.find(x => match(x, val))).filter(x => !!x)
      if (matches.length > 0) {
        setInputValue('')
        setExpanded(false)
        setActive(null)
        let newValues = Array.from(value || [])
        matches.forEach(option => {
          if (hasOption(option)) {
            newValues = newValues.filter(x => x !== option)
          } else {
            newValues.push(option)
          }
        })
        onChange?.(newValues)
        focusNextElement()
      }
    }
  }, [multiple, options, match, value, onChange])

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData?.getData('Text')
    handlePastedText(text)
  }, [handlePastedText])

  const keyUp = useCallback((e: React.KeyboardEvent) => {
    if (navKeys.indexOf(e.code))
      return
    update()
  }, [navKeys])

  const scrollActiveIntoView = useCallback(() => {
    setTimeout(() => {
      const el = document.querySelector(`#${id}-autocomplete li.active`) as HTMLElement
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' } as ScrollIntoViewOptions)
      }
    }, 0)
  }, [id])

  const onlyScrollActiveIntoViewIfNeeded = useCallback(() => {
    setTimeout(() => {
      const el = document.querySelector(`#${id}-autocomplete li.active`) as HTMLElement
      if (el) {
        if ('scrollIntoViewIfNeeded' in el) {
          (el as any).scrollIntoViewIfNeeded({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' } as ScrollIntoViewOptions)
        }
      }
    }, 0)
  }, [id])

  const keyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.shiftKey || e.ctrlKey || e.altKey) return

    if (!expanded) {
      if (e.code === 'ArrowDown') {
        setExpanded(true)
        setActive(filteredValues[0])
      }
      return
    }

    if (e.code === 'Escape') {
      if (expanded) {
        e.stopPropagation()
        setExpanded(false)
      }
    } else if (e.code === 'Tab') {
      setExpanded(false)
    } else if (e.code === 'Home') {
      setActive(filteredValues[0])
      scrollActiveIntoView()
    } else if (e.code === 'End') {
      setActive(filteredValues[filteredValues.length - 1])
      scrollActiveIntoView()
    } else if (e.code === 'ArrowDown') {
      if (!active) {
        setActive(filteredValues[0])
      } else {
        const currIndex = filteredValues.indexOf(active)
        setActive(currIndex + 1 < filteredValues.length
          ? filteredValues[currIndex + 1]
          : filteredValues[0])
      }
      onlyScrollActiveIntoViewIfNeeded()
    } else if (e.code === 'ArrowUp') {
      if (!active) {
        setActive(filteredValues[filteredValues.length - 1])
      } else {
        const currIndex = filteredValues.indexOf(active)
        setActive(currIndex - 1 >= 0
          ? filteredValues[currIndex - 1]
          : filteredValues[filteredValues.length - 1])
      }
      onlyScrollActiveIntoViewIfNeeded()
    } else if (e.code === 'Enter') {
      if (active) {
        select(active)
        if (!multiple) {
          e.preventDefault()
          focusNextElement()
        }
      } else {
        setExpanded(false)
      }
    }
  }, [expanded, filteredValues, active, multiple, scrollActiveIntoView, onlyScrollActiveIntoViewIfNeeded])

  const toggle = useCallback((expand: boolean) => {
    setExpanded(expand)
    if (!expand)
      return
    refresh()
    txtInputRef.current?.focus()
  }, [])

  useImperativeHandle(ref, () => ({
    toggle
  }), [toggle])

  const onInputClick = useCallback(() => {
    // When in single-select mode with a value, toggle the dropdown
    if (!multiple && value) {
      setExpanded(prev => !prev)
      if (!expanded) {
        refresh()
      }
    } else {
      update()
    }
  }, [multiple, value, expanded])

  const update = useCallback(() => {
    setExpanded(true)
    refresh()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setExpanded(false)
      }
    }

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [expanded])

  const hasOption = useCallback((option: any) => {
    if (!Array.isArray(value)) return false

    // For objects, compare by key property if it exists
    if (option && typeof option === 'object' && 'key' in option) {
      return value.some(v => v && typeof v === 'object' && 'key' in v && v.key === option.key)
    }

    // For primitives, use indexOf
    return value.indexOf(option) >= 0
  }, [value])

  const select = useCallback((option: any) => {
    if (multiple) {
      let newValues = Array.from(value || [])
      if (hasOption(option)) {
        // Remove the option - use proper comparison for objects
        if (option && typeof option === 'object' && 'key' in option) {
          newValues = newValues.filter(x => !(x && typeof x === 'object' && 'key' in x && x.key === option.key))
        } else {
          newValues = newValues.filter(x => x !== option)
        }
      } else {
        newValues.push(option)
      }
      setActive(null)
      onChange?.(newValues)
      // Don't clear input or close dropdown in multiple mode - keep it open for more selections
    } else {
      setInputValue('')
      setExpanded(false)
      let val = option
      onChange?.(val)
    }
  }, [multiple, value, hasOption, onChange])

  const refresh = useCallback(() => {
    setFilteredValues(filteredOptions)
  }, [filteredOptions])

  useEffect(() => {
    refresh()
  }, [inputValue, refresh])

  // Render item helper
  const renderItem = useCallback((option: any) => {
    if (typeof option === 'string') {
      return children ? (children as any)({ key: option, value: option }) : <span className="block truncate">{option}</span>
    }
    return children ? (children as any)(option) : <span className="block truncate">{JSON.stringify(option)}</span>
  }, [children])

  return (
    <div id={`${id}-autocomplete`} className={className} ref={containerRef}>
      {useLabel && (
        <label htmlFor={`${id}-text`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {useLabel}
        </label>
      )}

      <div className="relative mt-1">
        {multiple ? (
          <div className={cls} onClick={onInputClick} tabIndex={-1}>
            <div className="flex flex-wrap pb-1.5">
              {Array.isArray(value) && value.map((option, idx) => (
                <div key={idx} className="pt-1.5 pl-1">
                  <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
                    {renderItem(option)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (Array.isArray(value)) {
                          onChange?.(value.filter(v => v !== option))
                        }
                      }}
                      className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                    >
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                </div>
              ))}
              <div className="pt-1.5 pl-1 shrink">
                <input
                  ref={txtInputRef}
                  id={`${id}-text`}
                  type="text"
                  role="combobox"
                  aria-controls="options"
                  aria-expanded="false"
                  autoComplete="off"
                  spellCheck="false"
                  className="p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none"
                  style={{ boxShadow: 'none !important', width: `${inputValue.length + 1}ch` }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={!value || (Array.isArray(value) && value.length === 0) ? placeholder : ''}
                  onKeyDown={keyDown}
                  onKeyUp={keyUp}
                  onClick={onInputClick}
                  onPaste={onPaste}
                  required={false}
                  {...attrs}
                />
              </div>
            </div>
          </div>
        ) : (
          <input
            ref={txtInputRef}
            id={`${id}-text`}
            type="text"
            role="combobox"
            aria-controls="options"
            aria-expanded="false"
            autoComplete="off"
            spellCheck="false"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={cls}
            placeholder={multiple || !value ? placeholder : ''}
            readOnly={!multiple && !!value && !expanded}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            onClick={onInputClick}
            onPaste={onPaste}
            required={false}
            {...attrs}
          />
        )}

        <button
          type="button"
          onClick={() => toggle(!expanded)}
          className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
          tabIndex={-1}
        >
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {expanded && (
          <ul
            className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            onKeyDown={keyDown}
            id={`${id}-options`}
            role="listbox"
          >
            {filteredValues.map((option, idx) => (
              <li
                key={idx}
                className={`${option === active ? 'active bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-100'} relative cursor-default select-none py-2 pl-3 pr-9`}
                onMouseOver={() => setActiveOption(option)}
                onClick={() => select(option)}
                role="option"
                tabIndex={-1}
              >
                {renderItem(option)}

                {hasOption(option) && (
                  <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${option === active ? 'text-white' : 'text-indigo-600'}`}>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {!expanded && !multiple && value && (
          <div onKeyDown={keyDown} className="h-8 -mt-8 ml-3 pt-0.5 pointer-events-none">
            {renderItem(value)}
          </div>
        )}

        {errorField && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" tabIndex={-1}>
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {errorField && <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>}
      {!errorField && help && <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>{help}</p>}
    </div>
  )
})

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
