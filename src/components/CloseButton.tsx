import React from 'react'
import type { CloseButtonProps } from './types'

export default function CloseButton({
  buttonClass = 'bg-white dark:bg-black',
  title = 'Close',
  className,
  onClose
}: CloseButtonProps) {
  return (
    <div className={className ?? "absolute top-0 right-0 pt-4 pr-4"}>
      <button
        type="button"
        onClick={onClose}
        title={title}
        className={`${buttonClass} cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black`}
      >
        <span className="sr-only">Close</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  )
}
