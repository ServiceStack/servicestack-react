import React from 'react'
import { Link } from 'react-router-dom'
import type { OutlineButtonProps } from '@/components/types'

const OutlineButton: React.FC<OutlineButtonProps> = ({
  type = 'submit',
  href,
  onClick,
  children,
  ...attrs
}) => {
  const cls = "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 disabled:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 hover:dark:bg-gray-900 disabled:hover:bg-white dark:disabled:hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black"

  if (href) {
    return (
      <Link to={href}>
        <button type="button" className={cls} onClick={onClick} {...attrs}>
          {children}
        </button>
      </Link>
    )
  }

  return (
    <button type={type} className={cls} onClick={onClick} {...attrs}>
      {children}
    </button>
  )
}

export default OutlineButton
