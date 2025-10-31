import { useState, useMemo } from 'react'
import type { ConfirmDeleteProps } from '@/components/types'

export default function ConfirmDelete({ onDelete, children, ...attrs }: ConfirmDeleteProps & { children?: React.ReactNode }) {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)

  const onClick = () => {
    if (deleteConfirmed) {
      onDelete?.()
    }
  }

  const cls = useMemo(() =>
    `select-none inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
      deleteConfirmed
        ? "cursor-pointer bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        : "bg-red-400"
    }`
  , [deleteConfirmed])

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
      <span onClick={onClick} className={cls} {...attrs}>
        {children || 'Delete'}
      </span>
    </>
  )
}
