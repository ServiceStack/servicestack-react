# @servicestack/react Setup Guide

This guide explains how to configure `@servicestack/react` for different React frameworks and routing solutions.

## Overview

The `@servicestack/react` component library is designed to work with multiple React frameworks and routing solutions:

- **Vite + React + React Router** - Client-side routing with react-router-dom
- **Next.js** - Server-side rendering with Next.js App Router or Pages Router
- **Plain React** - No routing library (uses standard anchor tags)

### Smart URL Handling

The library automatically detects and handles different types of URLs:

- **External URLs** (http://, https://, mailto:, tel:) - Always use plain `<a>` tags
- **Internal URLs** (/path, /about, etc.) - Use configured Link component or fallback to `<a>` tags

This means you can use the same components for both internal navigation and external links without any special configuration!

## Installation

```bash
npm install @servicestack/react
```

### Optional Dependencies

Depending on your routing solution, you may need to install:

```bash
# For React Router
npm install react-router-dom

# For Next.js (already included in Next.js projects)
# No additional installation needed
```

## Configuration

### React Router (Vite, Create React App, etc.)

If you're using React Router, configure the library to use the `Link` component from `react-router-dom`:

```tsx
import { setLinkComponent } from '@servicestack/react'
import { Link } from 'react-router-dom'

// Configure the library to use React Router's Link
setLinkComponent(Link)
```

**Complete Example:**

```tsx
// main.tsx or index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { setLinkComponent } from '@servicestack/react'
import { Link } from 'react-router-dom'
import App from './App'

// Configure routing
setLinkComponent(Link)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### Next.js

For Next.js applications, configure the library to use Next.js's `Link` component:

```tsx
import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'

// Configure the library to use Next.js Link
setLinkComponent(Link)
```

**App Router Example (app/layout.tsx):**

```tsx
'use client'

import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Configure routing on client side
    setLinkComponent(Link)
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Pages Router Example (_app.tsx):**

```tsx
import type { AppProps } from 'next/app'
import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Configure routing
    setLinkComponent(Link)
  }, [])

  return <Component {...pageProps} />
}
```

### Plain React (No Router)

If you're not using a routing library, the components will automatically fall back to using standard HTML anchor tags (`<a>`). No configuration is needed:

```tsx
import { PrimaryButton } from '@servicestack/react'

// This will render as: <a href="/about"><button>...</button></a>
<PrimaryButton href="/about">About</PrimaryButton>
```

## Usage

Once configured, all navigation components will use your chosen routing solution:

### Button Components with Links

```tsx
import { PrimaryButton, SecondaryButton, OutlineButton } from '@servicestack/react'

function MyComponent() {
  return (
    <div>
      {/* These will use your configured Link component */}
      <PrimaryButton href="/dashboard">Dashboard</PrimaryButton>
      <SecondaryButton href="/settings">Settings</SecondaryButton>
      <OutlineButton href="/profile">Profile</OutlineButton>
    </div>
  )
}
```

### Navigation Components

```tsx
import { Breadcrumbs, Breadcrumb, NavList, NavListItem } from '@servicestack/react'

function Navigation() {
  return (
    <>
      <Breadcrumbs homeHref="/">
        <Breadcrumb href="/products">Products</Breadcrumb>
        <Breadcrumb>Details</Breadcrumb>
      </Breadcrumbs>

      <NavList title="Main Navigation">
        <NavListItem
          title="Dashboard"
          href="/dashboard"
          iconSvg="..."
        >
          View your dashboard
        </NavListItem>
      </NavList>
    </>
  )
}
```

### External URLs

External URLs are automatically detected and use plain anchor tags (no routing):

```tsx
import { PrimaryButton, TextLink } from '@servicestack/react'

function ExternalLinks() {
  return (
    <div>
      {/* External URLs - use plain <a> tags */}
      <PrimaryButton href="https://docs.servicestack.net">
        Documentation
      </PrimaryButton>

      <TextLink href="mailto:support@example.com">
        Email Support
      </TextLink>

      <SecondaryButton href="tel:+1234567890">
        Call Us
      </SecondaryButton>

      {/* Internal URLs - use configured Link component */}
      <PrimaryButton href="/dashboard">
        Dashboard
      </PrimaryButton>
    </div>
  )
}
```

## React 19 SSR Compatibility

The library is fully compatible with React 19 in SSR mode. By making `react-router-dom` an optional peer dependency and providing a configurable Link component system, you can:

1. Use the library in Next.js with React 19 SSR
2. Use the library in Vite + React Router without SSR issues
3. Use the library without any routing library

## Troubleshooting

### "Link is not defined" errors

Make sure you've called `setLinkComponent()` before rendering any components that use navigation:

```tsx
import { setLinkComponent } from '@servicestack/react'
import { Link } from 'react-router-dom' // or from 'next/link'

setLinkComponent(Link)
```

### Next.js: "Cannot read properties of undefined"

In Next.js, make sure to configure the Link component on the client side using `useEffect`:

```tsx
'use client' // Add this for App Router

useEffect(() => {
  setLinkComponent(Link)
}, [])
```

### Links not working in Next.js

Next.js Link component has a different API. The library automatically detects and handles this, but make sure you're using a recent version of Next.js (13+).

## Advanced Configuration

You can also configure other aspects of the library:

```tsx
import { setConfig } from '@servicestack/react'

setConfig({
  // Custom navigation function
  navigate: (url) => {
    // Custom navigation logic
    window.location.href = url
  },
  
  // Asset path resolver
  assetsPathResolver: (src) => {
    return `https://cdn.example.com${src}`
  },
  
  // And more...
})
```

## Migration from Previous Versions

If you're upgrading from a version that had a hard dependency on `react-router-dom`:

1. Install the library: `npm install @servicestack/react@latest`
2. Add the Link configuration as shown above
3. If using React Router, ensure `react-router-dom` is installed
4. Test your navigation components

## Support

For issues, questions, or contributions, visit:
- GitHub: https://github.com/ServiceStack/servicestack-react
- Documentation: https://docs.servicestack.net/react/

