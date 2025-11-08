import React from 'react'
import GalleryLayout from '../components/GalleryLayout'
import CodeBlock from '../components/CodeBlock'

export default function InstallPage() {
  return (
    <GalleryLayout title="Installation">
      <h2>NPM Installation</h2>
        <p>
          <strong>@servicestack/react</strong> can be added to existing React Apps by installing via npm:
        </p>
        <CodeBlock code="npm install @servicestack/react" language="bash" />
        <p>
          Where it will also install its <strong>react</strong> and <strong>@servicestack/client</strong> dependencies.
        </p>

        <h2>Setup</h2>
        <p>
          Then register the <code>@servicestack/react</code> component library with your React app:
        </p>
        <CodeBlock code={`import { JsonServiceClient } from "@servicestack/client"
import { ClientContext } from "@servicestack/react"

const client = new JsonServiceClient()

function App() {
  return (
    <ClientContext.Provider value={client}>
      {/* Your app components */}
    </ClientContext.Provider>
  )
}`} language="tsx" />

        <h2>API Configuration</h2>
        <p>
          The <strong>client</strong> instance is used by API-enabled components to call your APIs.
          Configure the base URL for your ServiceStack backend:
        </p>
        <CodeBlock code={`const client = new JsonServiceClient('https://api.example.com')`} language="typescript" />

        <h2>TypeScript DTOs</h2>
        <p>
          Generate TypeScript DTOs from your ServiceStack services to get full type safety:
        </p>
        <CodeBlock code={`# Add TypeScript reference to your ServiceStack instance
npx @servicestack/cli add https://api.example.com

# Update DTOs when your services change
npx @servicestack/cli update`} language="bash" />

        <h2>Tailwind CSS</h2>
        <p>
          The component library uses Tailwind CSS for styling. Make sure you have Tailwind CSS configured in your project:
        </p>
        <CodeBlock code={`npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`} language="bash" />

        <p>
          Configure your <code>tailwind.config.js</code> to include the component library:
        </p>
        <CodeBlock code={`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@servicestack/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`} language="javascript" />

        <h2>Dark Mode Support</h2>
        <p>
          All components support dark mode out of the box. Enable dark mode in your Tailwind config:
        </p>
        <CodeBlock code={`/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // or 'media'
  // ... rest of config
}`} language="javascript" />

        <h2>Quick Start Example</h2>
        <p>
          Here's a complete example to get you started:
        </p>
        <CodeBlock code={`import React from 'react'
import { JsonServiceClient } from '@servicestack/client'
import { ClientContext, AutoQueryGrid } from '@servicestack/react'

const client = new JsonServiceClient('https://blazor-gallery.jamstacks.net')

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My App</h1>
        <AutoQueryGrid type="QueryBookings" />
      </div>
    </ClientContext.Provider>
  )
}

export default App`} language="tsx" />

        <h2>Next Steps</h2>
        <p>
          Explore the component gallery to see all available components and their usage:
        </p>
        <ul>
          <li><a href="/gallery/autoquerygrid" className="text-blue-600 dark:text-blue-400 hover:underline">AutoQueryGrid</a> - Queryable data grids with CRUD operations</li>
          <li><a href="/gallery/autoform" className="text-blue-600 dark:text-blue-400 hover:underline">Auto Forms</a> - Automatic form generation from DTOs</li>
          <li><a href="/gallery/form-inputs" className="text-blue-600 dark:text-blue-400 hover:underline">Form Inputs</a> - Rich form input components</li>
          <li><a href="/gallery/use-client" className="text-blue-600 dark:text-blue-400 hover:underline">useClient</a> - API client hook</li>
          <li><a href="/gallery/use-metadata" className="text-blue-600 dark:text-blue-400 hover:underline">useMetadata</a> - Metadata utilities</li>
        </ul>
    </GalleryLayout>
  )
}

