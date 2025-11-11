/**
 * Example: Using @servicestack/react without a routing library
 * 
 * This example shows how the library works without any routing configuration.
 * All navigation will use standard HTML anchor tags.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimaryButton, SecondaryButton, Breadcrumbs, Breadcrumb } from '@servicestack/react'

// No need to call setLinkComponent() - the library will automatically
// fall back to using standard <a> tags for navigation

function App() {
  return (
    <div className="p-8">
      <Breadcrumbs homeHref="/">
        <Breadcrumb>Home</Breadcrumb>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold my-4">Plain React Example (No Router)</h1>
      
      {/* These buttons will render as standard anchor tags */}
      <div className="space-x-2">
        <PrimaryButton href="/">Home</PrimaryButton>
        <SecondaryButton href="/about.html">About</SecondaryButton>
        <PrimaryButton href="/contact.html">Contact</PrimaryButton>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">How it works:</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>No routing library is configured</li>
          <li>All href props will render as standard HTML anchor tags</li>
          <li>Navigation will cause full page reloads</li>
          <li>Perfect for static sites or server-rendered applications</li>
        </ul>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

