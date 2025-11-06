import React, { useState } from 'react'
import type { ConfirmDeleteProps } from '@/components/types'

interface ConfirmDeleteComponentProps extends ConfirmDeleteProps {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}

const ConfirmDelete: React.FC<ConfirmDeleteComponentProps> = ({
  onDelete,
  children = "Delete",
  className,
  ...rest
}) => {
  const [deleteConfirmed, setDeleteConfirmed] = useState<boolean>(false)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (deleteConfirmed && onDelete) {
      onDelete()
    }
  }

  const cls = [
    "select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white",
    deleteConfirmed
      ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      : "bg-red-400",
    className
  ].filter(Boolean).join(' ')

  return (
    <>
      <input
        id="confirmDelete"
        type="checkbox"
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-black"
        checked={deleteConfirmed}
        onChange={(e) => setDeleteConfirmed(e.target.checked)}
      />
      <label htmlFor="confirmDelete" className="ml-2 mr-2 select-none">confirm</label>
      <span onClick={onClick} className={cls} {...rest}>
        {children}
      </span>
    </>
  )
}

export default ConfirmDelete
