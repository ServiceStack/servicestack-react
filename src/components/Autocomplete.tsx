import { useState, useRef, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react'
import type { AutocompleteProps } from '@/components/types'
import { errorResponse, humanize, toPascalCase } from "@servicestack/client"
import { focusNextElement } from '@/use/utils'
import { input } from "./css"

const Autocomplete = forwardRef<{ toggle: (expand: boolean) => void }, AutocompleteProps & { children?: any }>(
  ({
    id,
    label,
    multiple = false,
    options = [],
    viewCount = 100,
    pageSize = 8,
    value,
    onChange,
    match,
    status,
    help,
    placeholder,
    children,
    ...attrs
  }, ref) => {
    const [expanded, setExpanded] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [active, setActiveState] = useState<any | null>(null)
    const [take, setTake] = useState(viewCount)
    const [filteredValues, setFilteredValues] = useState<any[]>([])

    const txtInput = useRef<HTMLInputElement | null>(null)

    useImperativeHandle(ref, () => ({
      toggle
    }))

    function hasOption(option: any) {
      return Array.isArray(value) && value.indexOf(option) >= 0
    }

    const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])

    const errorField = useMemo(() =>
      errorResponse.call({ responseStatus: status }, id),
      [status, id])

    const cls = useMemo(() => [input.base, errorField ? input.invalid : input.valid].join(' '), [errorField])

    const filteredOptions = useMemo(() => {
      let ret = !inputValue
        ? options
        : options.filter(x => match(x, inputValue)).slice(0, take)
      return ret
    }, [inputValue, options, match, take])

    const navKeys = ['Tab', 'Escape', 'ArrowDown', 'ArrowUp', 'Enter', 'PageUp', 'PageDown', 'Home', 'End']

    function setActive(option: any) {
      setActiveState(option)
      const currIndex = filteredValues.indexOf(option)
      if (currIndex > Math.floor(take * .9)) {
        setTake(prev => prev + viewCount)
        refresh()
      }
    }

    const delims = [',', '\n', '\t']

    function onPaste(e: React.ClipboardEvent) {
      const text = e.clipboardData?.getData('Text')
      handlePastedText(text)
    }

    function handlePastedText(txt?: string) {
      if (!txt) return

      const multipleValues = delims.some(x => txt.includes(x))
      if (!multiple || !multipleValues) {
        const matches = options.filter(x => match(x, txt))
        if (matches.length == 1) {
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
          setActiveState(null)
          let newValues = Array.from(value || [])
          matches.forEach(option => {
            if (hasOption(option)) {
              newValues = newValues.filter(x => x != option)
            } else {
              newValues.push(option)
            }
          })
          onChange?.(newValues)
          focusNextElement()
        }
      }
    }

    function keyUp(e: React.KeyboardEvent) {
      if (navKeys.indexOf(e.code))
        return
      update()
    }

    function keyDown(e: React.KeyboardEvent) {
      if (e.shiftKey || e.ctrlKey || e.altKey) return

      if (!expanded) {
        if (e.code == 'ArrowDown') {
          setExpanded(true)
          setActiveState(filteredValues[0])
        }
        return
      }
      if (e.code == 'Escape') {
        if (expanded) {
          e.stopPropagation()
          setExpanded(false)
        }
      }
      else if (e.code == 'Tab') {
        setExpanded(false)
      } else if (e.code == 'Home') {
        setActiveState(filteredValues[0])
        scrollActiveIntoView()
      } else if (e.code == 'End') {
        setActiveState(filteredValues[filteredValues.length - 1])
        scrollActiveIntoView()
      } else if (e.code == 'ArrowDown') {
        if (!active) {
          setActiveState(filteredValues[0])
        } else {
          const currIndex = filteredValues.indexOf(active)
          setActiveState(currIndex + 1 < filteredValues.length
            ? filteredValues[currIndex + 1]
            : filteredValues[0])
        }
        onlyScrollActiveIntoViewIfNeeded()
      } else if (e.code == 'ArrowUp') {
        if (!active) {
          setActiveState(filteredValues[filteredValues.length - 1])
        } else {
          const currIndex = filteredValues.indexOf(active)
          setActiveState(currIndex - 1 >= 0
            ? filteredValues[currIndex - 1]
            : filteredValues[filteredValues.length - 1])
        }
        onlyScrollActiveIntoViewIfNeeded()
      } else if (e.code == 'Enter') {
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
    }

    const scrollOptions: ScrollIntoViewOptions = { behavior: "smooth", block: "nearest", inline: "nearest" }

    function scrollActiveIntoView() {
      setTimeout(() => {
        let el = document.querySelector(`#${id}-autocomplete li.active`)
        if (el) {
          el.scrollIntoView(scrollOptions)
        }
      }, 0)
    }

    function onlyScrollActiveIntoViewIfNeeded() {
      setTimeout(() => {
        let el = document.querySelector(`#${id}-autocomplete li.active`)
        if (el) {
          if ('scrollIntoViewIfNeeded' in el) {
            (el as any).scrollIntoViewIfNeeded(scrollOptions)
          } else {
            el.scrollIntoView(scrollOptions)
          }
        }
      }, 0)
    }

    function toggle(expand: boolean) {
      setExpanded(expand)
      if (!expand)
        return
      update()
      txtInput.current?.focus()
    }

    function update() {
      setExpanded(true)
      refresh()
    }

    function select(option: any) {
      setInputValue('')
      setExpanded(false)

      if (multiple) {
        let newValues = Array.from(value || [])
        if (hasOption(option)) {
          newValues = newValues.filter(x => x != option)
        } else {
          newValues.push(option)
        }
        setActiveState(null)
        onChange?.(newValues)
      } else {
        let val = option
        if (value == option) {
          val = null
        }
        onChange?.(val)
      }
    }

    function refresh() {
      setFilteredValues(filteredOptions)
    }

    useEffect(() => {
      refresh()
    }, [filteredOptions])

    return (
      <div id={`${id}-autocomplete`}>
        {useLabel && (
          <label htmlFor={`${id}-text`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {useLabel}
          </label>
        )}

        <div className="relative mt-1">
          <input
            ref={txtInput}
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
            onFocus={update}
            onKeyDown={keyDown}
            onKeyUp={keyUp}
            onClick={update}
            onPaste={onPaste}
            required={false}
            {...attrs}
          />

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
                  onMouseOver={() => setActive(option)}
                  onClick={() => select(option)}
                  role="option"
                  tabIndex={-1}
                >
                  {children ? (
                    typeof children === 'function' ? children(option) : children
                  ) : (
                    typeof option === 'string' ? option : option.value
                  )}

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
            <div onKeyDown={keyDown} onClick={() => toggle(!expanded)} className="h-8 -mt-8 ml-3 pt-0.5">
              {children ? (
                typeof children === 'function' ? children(value) : children
              ) : (
                typeof value === 'string' ? value : value.value
              )}
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
  }
)

Autocomplete.displayName = 'Autocomplete'

export default Autocomplete
