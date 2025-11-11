import React, { ReactNode } from 'react'
import { DarkModeToggle } from '../../components'
import { NavigationLink } from '../../components/NavigationLink'

interface GalleryLayoutProps {
  children: ReactNode
  title?: string
}

export default function GalleryLayout({ children, title }: GalleryLayoutProps) {
  const currentPath = window.location.pathname

  const getLinkClass = (href: string) => {
    const isActive = currentPath === href
    return `text-sm block py-1 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="px-2 sm:px-3 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <NavigationLink href="/">
                <svg className="w-8 h-8 text-[#61DAFB]" viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              </NavigationLink>
              <NavigationLink href="/gallery" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                React Component Gallery
              </NavigationLink>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 min-h-screen">
          <nav className="sticky top-0 p-6 space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Getting Started
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavigationLink href="/gallery/install" className={getLinkClass('/gallery/install')}>
                    Installation
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/setup" className={getLinkClass('/gallery/setup')}>
                    Setup Examples
                  </NavigationLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Component Gallery
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavigationLink href="/gallery/autoquerygrid" className={getLinkClass('/gallery/autoquerygrid')}>
                    AutoQueryGrid
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/datagrid" className={getLinkClass('/gallery/datagrid')}>
                    DataGrid
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/autoform" className={getLinkClass('/gallery/autoform')}>
                    Auto Forms
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/custom-autoforms" className={getLinkClass('/gallery/custom-autoforms')}>
                    Custom Auto Forms
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/form-inputs" className={getLinkClass('/gallery/form-inputs')}>
                    Form Inputs
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/fileinput" className={getLinkClass('/gallery/fileinput')}>
                    FileInput
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/taginput" className={getLinkClass('/gallery/taginput')}>
                    TagInput
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/combobox" className={getLinkClass('/gallery/combobox')}>
                    Combobox
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/autocomplete" className={getLinkClass('/gallery/autocomplete')}>
                    Autocomplete
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/markdown" className={getLinkClass('/gallery/markdown')}>
                    Markdown Editor
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/custom-inputs" className={getLinkClass('/gallery/custom-inputs')}>
                    Custom Inputs
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/modals" className={getLinkClass('/gallery/modals')}>
                    Modals
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/navigation" className={getLinkClass('/gallery/navigation')}>
                    Navigation
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/alerts" className={getLinkClass('/gallery/alerts')}>
                    Alerts
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/formats" className={getLinkClass('/gallery/formats')}>
                    Formats
                  </NavigationLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Library
              </h3>
              <ul className="space-y-2">
                <li>
                  <NavigationLink href="/gallery/use-metadata" className={getLinkClass('/gallery/use-metadata')}>
                    useMetadata
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-client" className={getLinkClass('/gallery/use-client')}>
                    useClient
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-auth" className={getLinkClass('/gallery/use-auth')}>
                    useAuth
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-formatters" className={getLinkClass('/gallery/use-formatters')}>
                    useFormatters
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-files" className={getLinkClass('/gallery/use-files')}>
                    useFiles
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-utils" className={getLinkClass('/gallery/use-utils')}>
                    useUtils
                  </NavigationLink>
                </li>
                <li>
                  <NavigationLink href="/gallery/use-config" className={getLinkClass('/gallery/use-config')}>
                    useConfig
                  </NavigationLink>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-12 overflow-x-auto prose prose-slate dark:prose-invert max-w-none">
          {title && (
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
              {title}
            </h1>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

