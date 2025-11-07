import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import type { ApiState } from '@/types'
import type { TagInputProps } from '@/components/types'
import { errorResponse, humanize, toPascalCase, trimEnd } from '@servicestack/client'
import { filterClass } from './css'
import { useApiState } from '../use/context'

/**
 * TagInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const TagInput: React.FC<TagInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof TagInputProps>> = ({
  id,
  type,
  inputClass,
  filterClass: filterClassFn,
  label,
  labelClass,
  help,
  value,
  delimiters = [','],
  allowableValues,
  string,
  maxVisibleItems = 300,
  converter,
  status,
  onChange,
  ...attrs
}) => {
  const apiState = useApiState()
  const [inputValue, setInputValue] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState<string | undefined>()
  const [cancelBlur, setCancelBlur] = useState(false)
  const txtInputRef = useRef<HTMLInputElement>(null)

  // Converter function
  const convertValue = useCallback((values: string | string[]) => {
    return converter ? converter(values) : values
  }, [converter])

  // Model array - convert value to array of strings
  const modelArray = useMemo(() => {
    const converted = convertValue(value || [])
    const items = Array.isArray(converted) ? converted : [converted]
    return items.flatMap(v =>
      typeof v === 'string' && v.trim().length > 0
        ? v.split(',').filter(x => x.trim())
        : []
    )
  }, [value, convertValue])

  // Filtered values for autocomplete dropdown
  const filteredValues = useMemo(() => {
    const inputLower = inputValue.toLowerCase()
    if (!allowableValues || allowableValues.length === 0) return []

    return allowableValues.length < 1000
      ? allowableValues.filter(x => !modelArray.includes(x) && x.toLowerCase().includes(inputLower))
      : allowableValues.filter(x => !modelArray.includes(x) && x.startsWith(inputLower))
  }, [inputValue, allowableValues, modelArray])

  const useType = type || 'text'
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

  const cls = useMemo(() => filterClass(
    [
      'w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none',
      errorField
        ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500'
        : 'shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500',
      inputClass
    ],
    'TagInput',
    filterClassFn
  ), [errorField, inputClass, filterClassFn])

  const updateValue = useCallback((newValue: string[]) => {
    const ev = string ? newValue.join(',') : newValue
    onChange?.(ev)
  }, [string, onChange])

  const removeTag = useCallback((tag: string) => {
    updateValue(modelArray.filter(x => x !== tag))
  }, [modelArray, updateValue])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (document.activeElement === e.currentTarget) {
      txtInputRef.current?.focus()
    }
  }

  const expand = useCallback(() => {
    setExpanded(true)
    setCancelBlur(true)
  }, [])

  const onFocus = () => {
    expand()
  }

  const currentTag = useCallback(() => {
    if (inputValue.length === 0) return ''
    let tag = trimEnd(inputValue.trim(), ',')
    if (tag[0] === ',') tag = tag.substring(1)
    tag = tag.trim()

    return tag.length === 0 && expanded && filteredValues.length > 0
      ? active
      : tag
  }, [inputValue, expanded, filteredValues, active])

  const add = useCallback((tag?: string) => {
    if (!tag || tag.length === 0) return
    const newValue = Array.from(modelArray)
    if (newValue.indexOf(tag) === -1) {
      newValue.push(tag)
    }
    updateValue(newValue)
    setInputValue('')
    setExpanded(false)
  }, [modelArray, updateValue])

  const onBlur = useCallback(() => {
    add(currentTag())
    setCancelBlur(false)
    setTimeout(() => {
      setCancelBlur(curr => {
        if (!curr) setExpanded(false)
        return curr
      })
    }, 200)
  }, [add, currentTag])

  const scrollActiveIntoView = useCallback(() => {
    setTimeout(() => {
      const el = document.querySelector(`#${id}-tag li.active`) as HTMLElement
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' } as ScrollIntoViewOptions)
      }
    }, 0)
  }, [id])

  const onlyScrollActiveIntoViewIfNeeded = useCallback(() => {
    setTimeout(() => {
      const el = document.querySelector(`#${id}-tag li.active`) as HTMLElement
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
    if (e.key === 'Backspace' && inputValue.length === 0) {
      if (modelArray.length > 0) {
        removeTag(modelArray[modelArray.length - 1]!)
      }
    }

    if (!allowableValues || allowableValues.length === 0) return

    if (e.code === 'Escape' || e.code === 'Tab') {
      setExpanded(false)
    } else if (e.code === 'Home') {
      setActive(filteredValues[0])
      scrollActiveIntoView()
    } else if (e.code === 'End') {
      setActive(filteredValues[filteredValues.length - 1])
      scrollActiveIntoView()
    } else if (e.code === 'ArrowDown') {
      setExpanded(true)
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
      if (active && expanded) {
        add(active)
        e.preventDefault()
      } else {
        setExpanded(false)
      }
    } else {
      setExpanded(filteredValues.length > 0)
    }
  }, [inputValue, modelArray, removeTag, allowableValues, filteredValues, active, expanded, add, scrollActiveIntoView, onlyScrollActiveIntoViewIfNeeded])

  const keyPress = useCallback((e: React.KeyboardEvent) => {
    const tag = currentTag()
    if (tag && tag.length > 0) {
      const isDelim = delimiters.some(x => x === e.key)
      if (isDelim) e.preventDefault()
      const isEnter = e.key === 'Enter' || e.key === 'NumpadEnter'
      if (isEnter || (e.key.length === 1 && isDelim)) {
        add(tag)
        return
      }
    }
  }, [currentTag, delimiters, add])

  const handlePastedText = useCallback((txt?: string) => {
    if (!txt) return
    const re = new RegExp(`\\n|\\t|${delimiters.join('|')}`)
    const newTags = Array.from(modelArray)
    const tags = txt.split(re).map(x => x.trim())
    tags.forEach(tag => {
      if (newTags.indexOf(tag) === -1) {
        newTags.push(tag)
      }
    })
    updateValue(newTags)
    setInputValue('')
  }, [delimiters, modelArray, updateValue])

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const text = e.clipboardData?.getData('Text')
    handlePastedText(text)
  }, [handlePastedText])

  const setActiveOption = useCallback((option: string) => {
    setActive(option)
  }, [])

  return (
    <div className={attrs.className} id={`${id}-tag`} onMouseMove={() => setCancelBlur(true)}>
      {useLabel && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
      )}
      <div className="mt-1 relative">
        <input type="hidden" id={id} name={id} value={modelArray.join(',')} />
        <div className={cls} onClick={handleClick} onFocus={onFocus} tabIndex={-1}>
          <div className="flex flex-wrap pb-1.5">
            {modelArray.map((tag, idx) => (
              <div key={idx} className="pt-1.5 pl-1">
                <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
                  {tag}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeTag(tag)
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
                type={useType}
                role="combobox"
                aria-controls="options"
                aria-expanded="false"
                autoComplete="off"
                spellCheck="false"
                name={`${id}-txt`}
                id={`${id}-txt`}
                className="p-0 dark:bg-transparent rounded-md border-none focus:!border-none focus:!outline-none"
                style={{ boxShadow: 'none !important', width: `${inputValue.length + 1}ch` }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                aria-invalid={errorField != null}
                aria-describedby={`${id}-error`}
                onKeyDown={keyDown}
                onKeyPress={keyPress}
                onPaste={onPaste}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={() => setExpanded(true)}
                {...attrs}
              />
            </div>
          </div>
        </div>
        {expanded && filteredValues.length > 0 && (
          <ul
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            onKeyDown={keyDown}
            id={`${id}-options`}
            role="listbox"
          >
            {filteredValues.slice(0, maxVisibleItems).map((option, idx) => (
              <li
                key={idx}
                className={`${option === active ? 'active bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-100'} relative cursor-default select-none py-2 pl-3 pr-9`}
                onMouseOver={() => setActiveOption(option)}
                onClick={() => add(option)}
                role="option"
                tabIndex={-1}
              >
                <span className="block truncate">{option}</span>
              </li>
            ))}
          </ul>
        )}

        {errorField && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
}

export default TagInput
