import type { NavListItemProps } from '@/components/types'
import Icon from './Icon'

export default function NavListItem({ href, title, icon, iconSrc, iconSvg, iconAlt, children }: NavListItemProps & { children?: React.ReactNode }) {
  return (
    <li className="relative flex items-start space-x-4 py-6">
      <div className="flex-shrink-0">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900">
          <Icon className="w-6 h-6 text-indigo-700 dark:text-indigo-300" image={icon} src={iconSrc} svg={iconSvg} alt={iconAlt} />
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
          <span className="rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
            <a href={href} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true"></span>
              {title}
            </a>
          </span>
        </h3>
        <p className="text-base text-gray-500">
          {children}
        </p>
      </div>
      <div className="flex-shrink-0 self-center">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </div>
    </li>
  )
}
