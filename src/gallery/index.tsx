import React from 'react'
import GalleryLayout from './components/GalleryLayout'
import { NavigationLink } from '../components/NavigationLink'

export default function Gallery() {
  return (
    <GalleryLayout>
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-6">@servicestack/react</h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          A comprehensive React component library for building modern web applications with ServiceStack.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
          <NavigationLink href="/gallery/autoquerygrid" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">AutoQueryGrid</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Powerful data grid with built-in querying, filtering, and sorting capabilities.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/datagrid" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">DataGrid</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Flexible data grid component for displaying collections with custom rendering.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/autoform" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Auto Forms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically generated forms from your ServiceStack DTOs with validation.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/form-inputs" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Form Inputs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rich collection of form input components with built-in validation and styling.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/alerts" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Alerts</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Alert and notification components for displaying messages to users.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/modals" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Modals</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Modal dialogs and slide-over panels for focused user interactions.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/navigation" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Navigation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Navigation components including Tabs, Breadcrumbs, NavList, and Buttons.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/formats" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Formats</h3>
            <p className="text-gray-600 dark:text-gray-400">
              PreviewFormat component for rendering data in different formats like currency, bytes, icons, and links.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/fileinput" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">FileInput</h3>
            <p className="text-gray-600 dark:text-gray-400">
              File upload component with support for single and multiple files, drag & drop, and managed uploads.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/taginput" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">TagInput</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tag input component for managing multiple values with autocomplete and validation.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/combobox" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Combobox</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Searchable dropdown component with support for objects, key-value pairs, and custom rendering.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/autocomplete" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Autocomplete</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Autocomplete input with single/multiple selection and custom item rendering.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/custom-autoforms" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Custom Auto Forms</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how to create custom AutoQuery implementations for complex scenarios.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/markdown" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Markdown Editor</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Rich markdown editor with toolbar, keyboard shortcuts, and GitHub Flavored Markdown support.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/custom-inputs" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Custom Inputs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Create custom input components that integrate seamlessly with AutoForm.
            </p>
          </NavigationLink>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12">Library Hooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
          <NavigationLink href="/gallery/use-metadata" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useMetadata</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access app metadata, type information, enum options, and property metadata.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-client" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useClient</h3>
            <p className="text-gray-600 dark:text-gray-400">
              API client hook with loading/error states and managed API calls.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-auth" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useAuth</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Authentication utilities for managing user sessions and permissions.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-formatters" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useFormatters</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Formatting functions for currency, bytes, dates, links, icons, and more.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-files" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useFiles</h3>
            <p className="text-gray-600 dark:text-gray-400">
              File utilities for icons, MIME types, previews, and object URLs.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-utils" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useUtils</h3>
            <p className="text-gray-600 dark:text-gray-400">
              General utilities for dates, HTML generation, type checking, and more.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/use-config" className="block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">useConfig</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Global configuration for the component library and AutoQueryGrid defaults.
            </p>
          </NavigationLink>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12">Getting Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
          <NavigationLink href="/gallery/install" className="block p-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-600 rounded-lg hover:border-green-600 dark:hover:border-green-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">📦 Installation Guide</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how to install and configure @servicestack/react in your project.
            </p>
          </NavigationLink>

          <NavigationLink href="/gallery/setup" className="block p-6 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 dark:border-blue-600 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">⚙️ Setup Examples</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Configuration examples for React Router, Next.js, and plain React apps.
            </p>
          </NavigationLink>
        </div>
      </div>
    </GalleryLayout>
  )
}

