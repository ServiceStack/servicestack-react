import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import type { ApiState, UploadedFile } from '@/types'
import type { FileInputProps } from '@/components/types'
import { errorResponse, humanize, lastLeftPart, lastRightPart, toPascalCase } from '@servicestack/client'
import { filePathUri, getMimeType, formatBytes, fileImageUri, flush } from '@/use/files'
import { filterClass } from './css'
import { assetsPathResolver, fallbackPathResolver } from '@/use/config'
import { useApiState } from '../use/context'

/**
 * FileInput component with support for ApiStateContext.
 *
 * The component can access error state from either:
 * 1. The `status` prop (explicit ResponseStatus)
 * 2. The `ApiStateContext` (from parent AutoForm, AutoCreateForm, AutoEditForm, or SignIn)
 *
 * The `status` prop takes precedence over the context error.
 */
const FileInput: React.FC<FileInputProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof FileInputProps>> = ({
  id,
  multiple,
  inputClass,
  filterClass: filterClassFn,
  label,
  labelClass,
  imageClass,
  help,
  placeholder,
  value,
  values,
  files,
  status,
  onChange,
  className,
  ...attrs
}) => {
  const apiState = useApiState()
  const inputRef = useRef<HTMLInputElement>(null)
  const [fallbackSrc, setFallbackSrc] = useState<string | undefined>()
  const [fallbackSrcMap, setFallbackSrcMap] = useState<{ [name: string]: string | undefined }>({})
  const [fileList, setFileList] = useState<UploadedFile[]>(() => {
    if (files && files.length > 0) {
      return files.map(toFile)
    }
    if (values && values.length > 0) {
      return values.map(x => {
        let filePath = x.replace(/\\/g, '/')
        return {
          fileName: lastLeftPart(lastRightPart(filePath, '/'), '.'),
          filePath,
          contentType: getMimeType(filePath)
        } as UploadedFile
      }).map(toFile)
    }
    return []
  })

  function toFile(file: UploadedFile) {
    file.filePath = assetsPathResolver(file.filePath)
    return file
  }

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

  const cls = useMemo(() => filterClass(
    [
      'block w-full sm:text-sm rounded-md dark:text-white dark:bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 dark:file:bg-violet-900 file:text-violet-700 dark:file:text-violet-200 hover:file:bg-violet-100 dark:hover:file:bg-violet-800',
      errorField
        ? 'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500'
        : 'text-slate-500 dark:text-slate-400',
      inputClass
    ],
    'FileInput',
    filterClassFn
  ), [errorField, inputClass, filterClassFn])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target as HTMLInputElement
    setFallbackSrc('')
    setFileList(Array.from(f.files || []).map(x => ({
      fileName: x.name,
      filePath: fileImageUri(x)!,
      contentLength: x.size,
      contentType: x.type || getMimeType(x.name),
    })))
  }, [])

  const openFile = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const isDataUri = useCallback((src?: string | null) =>
    src == null ? false : src.startsWith('data:') || src.startsWith('blob:'),
    []
  )

  const src = useMemo(() => {
    if (fileList.length > 0)
      return (fileList[0] as UploadedFile).filePath
    let filePath = typeof value === 'string' ? value : values && values[0]
    return filePath && filePathUri(assetsPathResolver(filePath)) || null
  }, [fileList, value, values])

  const imgCls = useCallback((src?: string | null) =>
    !src || src.startsWith('data:') || src.endsWith('.svg')
      ? ''
      : 'rounded-full object-cover',
    []
  )

  const onError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setFallbackSrc(fallbackPathResolver(src!))
  }, [src])

  const onErrorMultiple = useCallback((filePath: string) => {
    setFallbackSrcMap(prev => ({
      ...prev,
      [filePathUri(filePath)!]: fallbackPathResolver(filePathUri(filePath)!)
    }))
  }, [])

  useEffect(() => {
    return () => flush()
  }, [])

  return (
    <div className={`flex ${!multiple ? 'justify-between' : 'flex-col'} ${className || ''}`}>
      <div className="relative flex-grow mr-2 sm:mr-4">
        {useLabel && (
          <label htmlFor={id} className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}>
            {useLabel}
          </label>
        )}
        <div className="block mt-2">
          <span className="sr-only">{help ?? useLabel}</span>

          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            name={id}
            id={id}
            className={cls}
            placeholder={usePlaceholder}
            aria-invalid={errorField != null}
            aria-describedby={`${id}-error`}
            onChange={handleChange}
            {...attrs}
          />

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
      {!multiple ? (
        <div>
          {src && (
            <div className="shrink-0 cursor-pointer" title={!isDataUri(src) ? src : ''}>
              <img
                onClick={openFile}
                className={imageClass ?? `h-16 w-16 ${imgCls(src)}`}
                alt={`Current ${useLabel ?? ''}`}
                src={fallbackSrc || assetsPathResolver(src)}
                onError={onError}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <table className="w-full">
            <tbody>
              {fileList.map((file, idx) => (
                <tr key={idx}>
                  <td className="pr-6 align-bottom pb-2">
                    <div className="flex w-full" title={!isDataUri(file.filePath) ? file.filePath : ''}>
                      <img
                        src={fallbackSrcMap[filePathUri(file.filePath)!] || assetsPathResolver(filePathUri(file.filePath)!)}
                        className={imageClass ?? `mr-2 h-8 w-8 ${imgCls(file.filePath)}`}
                        onError={() => onErrorMultiple(file.filePath)}
                        alt=""
                      />
                      {!isDataUri(file.filePath) ? (
                        <a href={assetsPathResolver(file.filePath || '')} target="_blank" rel="noopener noreferrer" className="overflow-hidden">
                          {file.fileName}
                        </a>
                      ) : (
                        <span className="overflow-hidden">{file.fileName}</span>
                      )}
                    </div>
                  </td>
                  <td className="align-top pb-2 whitespace-nowrap">
                    {file.contentLength && file.contentLength > 0 && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm bg-white dark:bg-black">
                        {formatBytes(file.contentLength)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default FileInput
