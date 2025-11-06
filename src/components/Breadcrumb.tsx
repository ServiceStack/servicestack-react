import type { BreadcrumbProps } from '@/components/types'

export default function Breadcrumb({ href, title, children }: BreadcrumbProps) {
  return (
    <li>
      <div className="flex items-center">
        {/* Heroicon name: mini/chevron-right */}
        <svg className="h-6 w-6 flex-shrink-0 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
        {href ? (
          <a href={href} className="ml-4 text-lg font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" title={title}>{children}</a>
        ) : (
          <span className="ml-4 text-lg font-medium text-gray-700 dark:text-gray-300" title={title}>{children}</span>
        )}
      </div>
    </li>
  )
}
