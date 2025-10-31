import { useState, useRef, useMemo, useContext } from 'react'
import type { TagInputProps } from '@/components/types'
import { $1, errorResponse, humanize, map, omit, toPascalCase, trimEnd } from "@servicestack/client"
import { filterClass as filterClassFn } from "./css"
import { ApiStateContext } from './TextInput'

export default function TagInput({
  id,
  type,
  label,
  labelClass,
  help,
  value: modelValue = [],
  onChange,
  status,
  inputClass,
  filterClass,
  className,
  allowableValues,
  string,
  converter,
  delimiters = [','],
  maxVisibleItems = 300,
  ...attrs
}: TagInputProps & { className?: string }) {
  const txtInputRef = useRef<HTMLInputElement>(null)
  const [active, setActive] = useState<string>()
  const [expanded, setExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [cancelBlur, setCancelBlur] = useState(false)

  function converterFn(values: string | string[]) {
    return converter ? converter(values) : values
  }

  const modelArray = useMemo(() => {
    const converted = converterFn(modelValue)
    return (map(converted, v => typeof v == 'string'
      ? v.trim().length == 0 ? [] : v.split(',')
      : v) || []) as string[]
  }, [modelValue, converter])

  const filteredValues = useMemo(() => {
    const inputLower = inputValue.toLowerCase()
    if (!allowableValues || allowableValues.length == 0) return []

    return allowableValues.length < 1000
      ? allowableValues.filter(x => !modelArray.includes(x) && x.toLowerCase().includes(inputLower))
      : allowableValues.filter(x => !modelArray.includes(x) && x.startsWith(inputLower))
  }, [allowableValues, modelArray, inputValue])

  const useType = useMemo(() => type || 'text', [type])
  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])

  const ctx = useContext(ApiStateContext)
  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status ?? (ctx as any)?.error?.current }, id)
  , [status, ctx, id])

  const cls = useMemo(() => filterClassFn([
    'w-full cursor-text flex flex-wrap sm:text-sm rounded-md dark:text-white dark:bg-gray-900 border focus-within:border-transparent focus-within:ring-1 focus-within:outline-none',
    errorField
      ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus-within:outline-none focus-within:ring-red-500 focus-within:border-red-500'
      : 'shadow-sm border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500 focus-within:border-indigo-500',
    inputClass
  ], 'TagInput', filterClass), [errorField, inputClass, filterClass])

  const removeTag = (tag: string) => updateValue(modelArray.filter(x => x != tag))

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (document.activeElement === e.target) {
      txtInputRef.current?.focus()
    }
  }

  function expand() {
    setExpanded(true)
    setCancelBlur(true)
  }

  function onFocus() {
    expand()
  }

  function onBlur() {
    add(currentTag())
    setCancelBlur(false)
    setTimeout(() => {
      if (!cancelBlur) setExpanded(false)
    }, 200)
  }

  function updateValue(newValue: string[]) {
    const ev = string ? newValue.join(',') : newValue
    onChange?.(ev as any)
  }

  function keyDown(e: React.KeyboardEvent) {
    if (e.key == "Backspace" && inputValue.length == 0) {
      if (modelArray.length > 0) {
        removeTag(modelArray[modelArray.length - 1]!)
      }
    }
    if (!allowableValues || allowableValues.length == 0) return

    if (e.code == 'Escape' || e.code == 'Tab') {
      setExpanded(false)
    } else if (e.code == 'Home') {
      setActive(filteredValues[0])
      scrollActiveIntoView()
    } else if (e.code == 'End') {
      setActive(filteredValues[filteredValues.length-1])
      scrollActiveIntoView()
    } else if (e.code == 'ArrowDown') {
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
    } else if (e.code == 'ArrowUp') {
      if (!active) {
        setActive(filteredValues[filteredValues.length-1])
      } else {
        const currIndex = filteredValues.indexOf(active)
        setActive(currIndex - 1 >= 0
          ? filteredValues[currIndex - 1]
          : filteredValues[filteredValues.length-1])
      }
      onlyScrollActiveIntoViewIfNeeded()
    } else if (e.code == 'Enter') {
      if (active && expanded) {
        add(active)
        e.preventDefault()
      } else {
        setExpanded(false)
      }
    } else {
      setExpanded(filteredValues.length > 0)
    }
  }

  function currentTag() {
    if (inputValue.length == 0) return ''
    let tag = trimEnd(inputValue.trim(), ',')
    if (tag[0] == ',') tag = tag.substring(1)
    tag = tag.trim()

    return tag.length == 0 && expanded && filteredValues.length > 0
      ? active
      : tag
  }

  function keyPress(e: React.KeyboardEvent) {
    const tag = currentTag()
    if (tag && tag.length > 0) {
      const isDelim = delimiters.some(x => x == e.key)
      if (isDelim) e.preventDefault()
      const isEnter = e.key == "Enter" || e.key == "NumpadEnter"
      if (isEnter || (e.key.length == 1 && isDelim)) {
        add(tag)
        return
      }
    }
  }

  const scrollOptions: any = { behavior: "smooth", block: "nearest", inline: "nearest", scrollMode:'if-needed' }

  function scrollActiveIntoView() {
    setTimeout(() => {
      let el = $1(`#${id}-tag li.active`)
      if (el) {
        el.scrollIntoView(scrollOptions)
      }
    }, 0)
  }

  function onlyScrollActiveIntoViewIfNeeded() {
    setTimeout(() => {
      let el = $1(`#${id}-tag li.active`)
      if (el) {
        if ('scrollIntoViewIfNeeded' in el) {
          (el as any).scrollIntoViewIfNeeded(scrollOptions)
        } else {
          el.scrollIntoView(scrollOptions)
        }
      }
    }, 0)
  }

  function add(tag?: string) {
    if (!tag || tag.length === 0) return
    const newValue = Array.from(modelArray)
    if (newValue.indexOf(tag) == -1) {
      newValue.push(tag)
    }
    updateValue(newValue)
    setInputValue('')
    setExpanded(false)
  }

  function onPaste(e: React.ClipboardEvent) {
    e.preventDefault()
    e.stopPropagation()
    const text = e.clipboardData?.getData('Text')
    handlePastedText(text)
  }

  function handlePastedText(txt?: string) {
    if (!txt) return
    const re = new RegExp(`\\n|\\t|${delimiters.join('|')}`)
    const newTags = Array.from(modelArray)
    const tags = txt.split(re).map(x => x.trim())
    tags.forEach(tag => {
      if (newTags.indexOf(tag) == -1) {
        newTags.push(tag)
      }
    })
    updateValue(newTags)
    setInputValue('')
  }

  const filteredAttrs = omit(attrs, ['class', 'required'])

  return (
    <div className={className} id={`${id}-tag`} onMouseMove={() => setCancelBlur(true)}>
      {useLabel && (
        <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
      )}
      <div className="mt-1 relative">
        <input type="hidden" id={id} name={id} value={modelArray.join(',')} />
        <button className={cls} onClick={handleClick} onFocus={() => setExpanded(true)} tabIndex={-1}>
          <div className="flex flex-wrap pb-1.5">
            {modelArray.map(tag => (
              <div key={tag} className="pt-1.5 pl-1">
                <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="flex-shrink-0 ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 dark:text-indigo-500 hover:bg-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-500 dark:hover:text-indigo-400 focus:outline-none focus:bg-indigo-500 focus:text-white dark:focus:text-black"
                  >
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7"></path>
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
                {...filteredAttrs}
              />
            </div>
          </div>
        </button>
        {expanded && filteredValues.length > 0 && (
          <ul
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
            onKeyDown={keyDown}
            id={`${id}-options`}
            role="listbox"
          >
            {filteredValues.slice(0, maxVisibleItems).map(option => (
              <li
                key={option}
                className={`${option === active ? 'active bg-indigo-600 text-white' : 'text-gray-900 dark:text-gray-100'} relative cursor-default select-none py-2 pl-3 pr-9`}
                onMouseOver={() => setActive(option)}
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

      {errorField ? (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>{errorField}</p>
      ) : help ? (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>{help}</p>
      ) : null}
    </div>
  )
}
