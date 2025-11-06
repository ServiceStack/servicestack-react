import React from 'react'
import { Link } from 'react-router-dom'
import type { SecondaryButtonProps } from '@/components/types'

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  type = 'button',
  href,
  onClick,
  children,
  ...attrs
}) => {
  const cls = "inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black"

  if (href) {
    return (
      <Link to={href}>
        <button type={type} className={cls} onClick={onClick} {...attrs}>
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

export default SecondaryButton
