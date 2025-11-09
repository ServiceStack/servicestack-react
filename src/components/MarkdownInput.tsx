import React, { useState, useMemo, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import type { MarkdownInputProps } from '@/components/types'
import type { ApiState, MarkdownInputOptions, ResponseStatus } from '@/types'
import { filterClass, input } from "./css"
import { errorResponse, humanize, toPascalCase } from "@servicestack/client"
import { asOptions } from '@/use/utils'
import { useApiState } from '@/use/context'

interface Item {
  value: string
  selectionStart?: number
  selectionEnd?: number
}

interface InsertOptions {
  selectionAtEnd?: boolean
  offsetStart?: number
  offsetEnd?: number
  filterValue?: (value: string, opt: any) => string
  filterSelection?: (selection: string) => string
}

export interface MarkdownInputRef {
  textarea: React.RefObject<HTMLTextAreaElement>
  updateModelValue: (value: string) => void
  selection: () => string
  hasSelection: () => boolean
  selectionInfo: () => any
  insert: (prefix: string, suffix: string, placeholder?: string, options?: InsertOptions) => void
  replace: (item: Item) => void
}

/**
 * MarkdownInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const MarkdownInput = forwardRef<MarkdownInputRef, MarkdownInputProps>(({
  status,
  id,
  className,
  inputClass,
  filterClass: filterClassProp,
  label,
  labelClass,
  help,
  placeholder,
  value = '',
  counter,
  rows = 6,
  errorMessages,
  lang,
  autoFocus,
  disabled,
  helpUrl = "https://guides.github.com/features/mastering-markdown/",
  hide,
  onChange,
  onClose
}, ref) => {
  const txt = useRef<HTMLTextAreaElement>(null)
  const historyRef = useRef<Item[]>([])
  const redosRef = useRef<Item[]>([])

  const apiState = useApiState()

  // Use status prop if provided, otherwise fall back to apiState error
  const responseStatus = useMemo(() =>
    status || apiState?.error,
    [status, apiState?.error]
  )

  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus }, id),
    [responseStatus, id]
  )

  const useLabel = useMemo(() =>
    label ?? humanize(toPascalCase(id)),
    [label, id]
  )

  const allShow = 'bold,italics,link,image,blockquote,code,heading,orderedList,unorderedList,strikethrough,undo,redo,help'.split(',') as MarkdownInputOptions[]
  const showOptions = useMemo<{ [k: string]: boolean }>(() =>
    hide ? asOptions(allShow, hide) : asOptions(allShow, []),
    [hide]
  )

  const show = (target: MarkdownInputOptions) => showOptions[target]

  const cls = useMemo(() =>
    filterClass(
      [
        'shadow-sm font-mono' + input.base.replace('rounded-md', ''),
        errorField
          ? 'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300'
          : 'text-gray-900 ' + input.valid,
        inputClass
      ],
      'MarkdownInput',
      filterClassProp
    ),
    [errorField, inputClass, filterClassProp]
  )

  const btnCls = "w-5 h-5 cursor-pointer select-none text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"

  const updateModelValue = (value: string) => {
    onChange?.(value)
  }

  const hasSelection = () => {
    return txt.current!.selectionStart !== txt.current!.selectionEnd
  }

  const selection = () => {
    const el = txt.current!
    return el.value.substring(el.selectionStart, el.selectionEnd) || ''
  }

  const selectionInfo = () => {
    const el = txt.current!
    const value = el.value
    const selPos = el.selectionStart
    const sel = value.substring(selPos, el.selectionEnd) || ''
    const beforeSel = value.substring(0, selPos)
    const prevCRPos = beforeSel.lastIndexOf('\n')
    return {
      value,
      sel,
      selPos,
      beforeSel,
      afterSel: value.substring(selPos),
      prevCRPos,
      beforeCR: prevCRPos >= 0 ? beforeSel.substring(0, prevCRPos + 1) : '',
      afterCR: prevCRPos >= 0 ? beforeSel.substring(prevCRPos + 1) : '',
    }
  }

  const replace = ({ value: newValue, selectionStart, selectionEnd }: Item) => {
    if (selectionEnd == null) {
      selectionEnd = selectionStart
    }
    updateModelValue(newValue)
    setTimeout(() => {
      txt.current?.focus()
      txt.current?.setSelectionRange(selectionStart!, selectionEnd!)
    }, 0)
  }

  const insert = (
    prefix: string,
    suffix: string,
    placeholder: string = '',
    options: InsertOptions = {}
  ) => {
    const {
      selectionAtEnd,
      offsetStart,
      offsetEnd,
      filterValue,
      filterSelection
    } = options

    const el = txt.current!
    let value = el.value
    let pos = el.selectionEnd
    historyRef.current.push({
      value,
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    })
    redosRef.current = []

    const from = el.selectionStart
    const to = el.selectionEnd
    let beforeRange = value.substring(0, from)
    let afterRange = value.substring(to)
    const toggleOff = prefix && beforeRange.endsWith(prefix) && afterRange.startsWith(suffix)

    const noSelection = from == to
    let newOffsetStart = offsetStart
    let newOffsetEnd = offsetEnd

    if (noSelection) {
      if (!toggleOff) {
        value = beforeRange + prefix + placeholder + suffix + afterRange
        pos += prefix.length
        newOffsetStart = 0
        newOffsetEnd = placeholder?.length || 0
        if (selectionAtEnd) {
          pos += newOffsetEnd
          newOffsetEnd = 0
        }
      } else {
        value = beforeRange.substring(0, beforeRange.length - prefix.length) + afterRange.substring(suffix.length)
        pos += -suffix.length
      }
      if (filterValue) {
        var opt = { pos }
        value = filterValue(value, opt)
        pos = opt.pos
      }
    } else {
      var selectedText = value.substring(from, to)
      if (filterSelection) {
        selectedText = filterSelection(selectedText)
      }

      if (!toggleOff) {
        value = beforeRange + prefix + selectedText + suffix + afterRange

        if (newOffsetStart) {
          pos += (prefix + suffix).length
        } else {
          pos = from
          newOffsetStart = prefix.length
          newOffsetEnd = selectedText.length
        }
      } else {
        value = beforeRange.substring(0, beforeRange.length - prefix.length) + selectedText + afterRange.substring(suffix.length)
        newOffsetStart = -selectedText.length - prefix.length
        newOffsetEnd = selectedText.length
      }
    }

    updateModelValue(value)
    setTimeout(() => {
      el.focus()
      const start = pos + (newOffsetStart || 0)
      const end = (start || 0) + (newOffsetEnd || 0)
      el.setSelectionRange(start, end)
    }, 0)
  }

  const bold = () => insert('**', '**', 'bold')
  const italic = () => insert('_', '_', 'italics')
  const strikethrough = () => insert('~~', '~~', 'strikethrough')
  const link = () => insert('[', '](https://)', '', { offsetStart: -9, offsetEnd: 8 })
  const quote = () => insert('\n> ', '\n', 'Blockquote', {})
  const image = () => insert('![](', ')')

  const code = (e: React.MouseEvent | React.KeyboardEvent) => {
    const sel = selection()
    if (sel && !('shiftKey' in e && e.shiftKey)) {
      insert('`', '`', 'code')
    } else {
      const langVal = lang || 'js'
      const partialSel = sel.indexOf('\n') === -1
      if (partialSel) {
        insert('\n```' + langVal + '\n', '\n```\n', '// code')
      } else {
        insert('```' + langVal + '\n', '```\n', '')
      }
    }
  }

  const ol = () => {
    if (hasSelection()) {
      let { sel, selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = selectionInfo()
      const partialSel = sel.indexOf('\n') === -1
      if (!partialSel) {
        const indent = !sel.startsWith(' 1. ')
        if (indent) {
          let index = 1
          insert('', '', ' - ', {
            selectionAtEnd: true,
            filterSelection: (v: string) => " 1. " + v.replace(/\n$/, '').replace(/\n/g, () => `\n ${++index}. `) + "\n"
          })
        } else {
          insert('', '', '', {
            filterValue: (v: string, opt: any) => {
              if (prevCRPos >= 0) {
                let afterCRTrim = afterCR.replace(/^ - /, '')
                beforeSel = beforeCR + afterCRTrim
                opt.pos -= afterCR.length - afterCRTrim.length
              }
              return beforeSel + afterSel
            },
            filterSelection: (v: string) => v.replace(/^ 1. /g, '').replace(/\n \d+. /g, "\n")
          })
        }
      } else {
        insert('\n 1. ', '\n')
      }
    } else {
      insert('\n 1. ', '\n', 'List Item', { offsetStart: -10, offsetEnd: 9 })
    }
  }

  const ul = () => {
    if (hasSelection()) {
      let { sel, selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = selectionInfo()
      const partialSel = sel.indexOf('\n') === -1
      if (!partialSel) {
        const indent = !sel.startsWith(' - ')
        if (indent) {
          insert('', '', ' - ', {
            selectionAtEnd: true,
            filterSelection: (v: string) => " - " + v.replace(/\n$/, '').replace(/\n/g, "\n - ") + "\n"
          })
        } else {
          insert('', '', '', {
            filterValue: (v: string, opt: any) => {
              if (prevCRPos >= 0) {
                let afterCRTrim = afterCR.replace(/^ - /, '')
                beforeSel = beforeCR + afterCRTrim
                opt.pos -= afterCR.length - afterCRTrim.length
              }
              return beforeSel + afterSel
            },
            filterSelection: (v: string) => v.replace(/^ - /g, '').replace(/\n - /g, "\n")
          })
        }
      } else {
        insert('\n - ', '\n')
      }
    } else {
      insert('\n - ', '\n', 'List Item', { offsetStart: -10, offsetEnd: 9 })
    }
  }

  const heading = () => {
    const sel = selection()
    const partialSel = sel.indexOf('\n') === -1
    if (sel) {
      if (partialSel) {
        insert('\n## ', '\n', '')
      } else {
        insert('## ', '', '')
      }
    } else {
      insert('\n## ', '\n', 'Heading', { offsetStart: -8, offsetEnd: 7 })
    }
  }

  const comment = () => {
    let { sel, selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = selectionInfo()
    const isComment = !sel.startsWith('//') && !afterCR.startsWith('//')
    if (isComment) {
      if (!sel) {
        replace({
          value: beforeCR + '//' + afterCR + afterSel,
          selectionStart: selPos + '//'.length
        })
      } else {
        insert('', '', '//', {
          selectionAtEnd: true,
          filterSelection: (v: string) => "//" + v.replace(/\n$/, '').replace(/\n/g, "\n//") + "\n"
        })
      }
    } else {
      insert('', '', '', {
        filterValue: (v: string, opt: any) => {
          if (prevCRPos >= 0) {
            let afterCRTrim = afterCR.replace(/^\/\//, '')
            beforeSel = beforeCR + afterCRTrim
            opt.pos -= afterCR.length - afterCRTrim.length
          }
          return beforeSel + afterSel
        },
        filterSelection: (v: string) => v.replace(/^\/\//g, '').replace(/\n\/\//g, "\n")
      })
    }
  }

  const blockComment = () => insert('/*\n', '*/\n', '')

  const undo = () => {
    if (historyRef.current.length === 0) return false
    const el = txt.current!
    const lastState = historyRef.current.pop()!
    redosRef.current.push({
      value: el.value,
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    })
    replace(lastState)
    return true
  }

  const redo = () => {
    if (redosRef.current.length === 0) return false
    const el = txt.current!
    const lastState = redosRef.current.pop()!
    historyRef.current.push({
      value: el.value,
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd
    })
    replace(lastState)
    return true
  }

  const tab = () => null // TODO

  useEffect(() => {
    historyRef.current = []
    redosRef.current = []

    const el = txt.current
    if (!el) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        onClose?.()
        return
      }

      const c = String.fromCharCode(e.keyCode).toLowerCase()
      if (c === '\t') { // tab: indent/unindent
        const indent = !e.shiftKey
        if (indent) {
          insert('', '', '    ', {
            selectionAtEnd: true,
            filterSelection: (v: string) => "    " + v.replace(/\n$/, '').replace(/\n/g, "\n    ") + "\n"
          })
        } else {
          insert('', '', '', {
            filterValue: (v: string, opt: any) => {
              let { selPos, beforeSel, afterSel, prevCRPos, beforeCR, afterCR } = selectionInfo()
              if (prevCRPos >= 0) {
                let afterCRTrim = afterCR.replace(/\t/g, '    ').replace(/^ ? ? ? ?/, '')
                beforeSel = beforeCR + afterCRTrim
                opt.pos -= afterCR.length - afterCRTrim.length
              }
              return beforeSel + afterSel
            },
            filterSelection: (v: string) => v.replace(/\t/g, '    ').replace(/^ ? ? ? ?/g, '').replace(/\n    /g, "\n")
          })
        }
        e.preventDefault()
      } else if (e.ctrlKey) {
        if (c === 'z') { // z: undo/redo
          if (!e.shiftKey) {
            if (undo()) {
              e.preventDefault()
            }
          } else {
            if (redo()) {
              e.preventDefault()
            }
          }
        } else if (c === 'b' && !e.shiftKey) { // b: bold
          bold()
          e.preventDefault()
        } else if (c === 'h' && !e.shiftKey) { // h: heading
          heading()
          e.preventDefault()
        } else if (c === 'i' && !e.shiftKey) { // i: italic
          italic()
          e.preventDefault()
        } else if (c === 'q' && !e.shiftKey) { // q: blockquote
          quote()
          e.preventDefault()
        } else if (c === 'k') { // l: link/image
          if (!e.shiftKey) {
            link()
            e.preventDefault()
          } else {
            image()
            e.preventDefault()
          }
        } else if ((c === ',' || e.key === '<' || e.key === '>' || e.keyCode === 188)) { // <>: code
          code(e as any)
          e.preventDefault()
        } else if (c === '/' || e.key === '/') {
          comment()
          e.preventDefault()
        } else if ((c === '?' || e.key === '?') && e.shiftKey) {
          blockComment()
          e.preventDefault()
        }
      } else if (e.altKey) {
        if (e.key === '1' || e.key === '0') {
          ol()
          e.preventDefault()
        } else if (e.key === '-') {
          ul()
          e.preventDefault()
        } else if (e.key === 's') {
          strikethrough()
          e.preventDefault()
        }
      }
    }

    el.addEventListener('keydown', handleKeyDown)
    return () => {
      el.removeEventListener('keydown', handleKeyDown)
    }
  }, [value, onChange])

  useImperativeHandle(ref, () => ({
    textarea: txt,
    updateModelValue,
    selection,
    hasSelection,
    selectionInfo,
    insert,
    replace
  }))

  return (
    <div className={className}>
      {useLabel && (
        <label htmlFor={id} className={`mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
          {useLabel}
        </label>
      )}
      {!disabled && (
        <div className="border border-gray-200 flex justify-between shadow-sm">
          <div className="p-2 flex flex-wrap gap-x-4">
            {show('bold') && (
              <svg className={btnCls} onClick={bold} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Bold text (CTRL+B)</title>
                <path fill="currentColor" d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
              </svg>
            )}
            {show('italics') && (
              <svg className={btnCls} onClick={italic} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Italics (CTRL+I)</title>
                <path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
              </svg>
            )}
            {show('link') && (
              <svg className={btnCls} onClick={link} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Insert Link (CTRL+K)</title>
                <path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z" />
              </svg>
            )}
            {show('blockquote') && (
              <svg className={btnCls} onClick={quote} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Blockquote (CTRL+Q)</title>
                <path fill="currentColor" d="m15 17l2-4h-4V6h7v7l-2 4h-3Zm-9 0l2-4H4V6h7v7l-2 4H6Z" />
              </svg>
            )}
            {show('image') && (
              <svg className={btnCls} onClick={image} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Insert Image (CTRL+SHIFT+L)</title>
                <path fill="currentColor" d="M2.992 21A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992ZM20 15V5H4v14L14 9l6 6Zm0 2.828l-6-6L6.828 19H20v-1.172ZM8 11a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z" />
              </svg>
            )}
            {show('code') && (
              <svg className={btnCls} onClick={code} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Insert Code (CTRL+&lt;)</title>
                <path fill="currentColor" d="m8 18l-6-6l6-6l1.425 1.425l-4.6 4.6L9.4 16.6L8 18Zm8 0l-1.425-1.425l4.6-4.6L14.6 7.4L16 6l6 6l-6 6Z" />
              </svg>
            )}
            {show('heading') && (
              <svg className={btnCls} onClick={heading} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>H2 Heading (CTRL+H)</title>
                <path fill="currentColor" d="M7 20V7H2V4h13v3h-5v13H7Zm9 0v-8h-3V9h9v3h-3v8h-3Z" />
              </svg>
            )}
            {show('orderedList') && (
              <svg className={btnCls} onClick={ol} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Numbered List (ALT+1)</title>
                <path fill="currentColor" d="M3 22v-1.5h2.5v-.75H4v-1.5h1.5v-.75H3V16h3q.425 0 .713.288T7 17v1q0 .425-.288.713T6 19q.425 0 .713.288T7 20v1q0 .425-.288.713T6 22H3Zm0-7v-2.75q0-.425.288-.713T4 11.25h1.5v-.75H3V9h3q.425 0 .713.288T7 10v1.75q0 .425-.288.713T6 12.75H4.5v.75H7V15H3Zm1.5-7V3.5H3V2h3v6H4.5ZM9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9Z" />
              </svg>
            )}
            {show('unorderedList') && (
              <svg className={btnCls} onClick={ul} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Bulleted List (ALT+-)</title>
                <path fill="currentColor" d="M9 19v-2h12v2H9Zm0-6v-2h12v2H9Zm0-6V5h12v2H9ZM5 20q-.825 0-1.413-.588T3 18q0-.825.588-1.413T5 16q.825 0 1.413.588T7 18q0 .825-.588 1.413T5 20Zm0-6q-.825 0-1.413-.588T3 12q0-.825.588-1.413T5 10q.825 0 1.413.588T7 12q0 .825-.588 1.413T5 14Zm0-6q-.825 0-1.413-.588T3 6q0-.825.588-1.413T5 4q.825 0 1.413.588T7 6q0 .825-.588 1.413T5 8Z" />
              </svg>
            )}
            {show('strikethrough') && (
              <svg className={btnCls} onClick={strikethrough} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Strike Through (ALT+S)</title>
                <path fill="currentColor" d="M10 19h4v-3h-4v3zM5 4v3h5v3h4V7h5V4H5zM3 14h18v-2H3v2z" />
              </svg>
            )}
            {show('undo') && (
              <svg className={btnCls} onClick={undo} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Undo (CTRL+Z)</title>
                <path fill="currentColor" d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
              </svg>
            )}
            {show('redo') && (
              <svg className={btnCls} onClick={redo} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>Redo (CTRL+SHIFT+Z)</title>
                <path fill="currentColor" d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
              </svg>
            )}
          </div>
          {show('help') && helpUrl && (
            <div className="p-2 flex flex-wrap gap-x-4">
              <a title="formatting help" target="_blank" href={helpUrl} tabIndex={-1} rel="noreferrer">
                <svg className={btnCls} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5c0-2.21-1.79-4-4-4z" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
      <div>
        <textarea
          ref={txt}
          name={id}
          id={id}
          className={cls}
          value={value}
          rows={rows}
          disabled={disabled}
          onChange={(e) => updateModelValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              e.preventDefault()
            }
          }}
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
})

MarkdownInput.displayName = 'MarkdownInput'

export default MarkdownInput
