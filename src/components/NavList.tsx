import type { NavListProps } from '@/components/types'

export default function NavList({ title, className, children }: NavListProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-base font-semibold text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      )}
      <ul role="list" className="mt-4 divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
        {children}
      </ul>
    </div>
  )
}
