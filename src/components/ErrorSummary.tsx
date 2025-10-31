import { useMemo, useContext } from 'react'
import type { ErrorSummaryProps } from '@/components/types'
import { errorResponseExcept } from "@servicestack/client"
import { ApiStateContext } from './TextInput'

export default function ErrorSummary({ status, except, className }: ErrorSummaryProps) {
  const ctx = useContext(ApiStateContext)
  
  const errorSummary = useMemo(() => 
    status || (ctx as any)?.error?.current
      ? errorResponseExcept.call({ responseStatus: status ?? (ctx as any)?.error?.current }, except ?? [])
      : null
  , [status, ctx, except])

  if (!errorSummary) return null

  return (
    <div className={`bg-red-50 dark:bg-red-900 border-l-4 border-red-400 p-4 ${className ?? ''}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/>
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700 dark:text-red-200">{errorSummary}</p>
        </div>
      </div>
    </div>
  )
}

