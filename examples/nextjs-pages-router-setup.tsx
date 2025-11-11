/**
 * Example: Setting up @servicestack/react with Next.js Pages Router
 * 
 * This example shows how to configure the library for use with
 * Next.js Pages Router (traditional Next.js routing)
 */

// File: pages/_app.tsx
import type { AppProps } from 'next/app'
import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'
import { useEffect } from 'react'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  // Configure the library to use Next.js Link
  useEffect(() => {
    setLinkComponent(Link)
  }, [])

  return <Component {...pageProps} />
}

// File: pages/index.tsx
import { PrimaryButton, SecondaryButton, Breadcrumbs, Breadcrumb } from '@servicestack/react'

export default function Home() {
  return (
    <div className="p-8">
      <Breadcrumbs homeHref="/">
        <Breadcrumb>Home</Breadcrumb>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold my-4">Next.js Pages Router Example</h1>
      
      {/* These buttons will use Next.js Link component internally */}
      <div className="space-x-2">
        <PrimaryButton href="/">Home</PrimaryButton>
        <SecondaryButton href="/about">About</SecondaryButton>
        <PrimaryButton href="/contact">Contact</PrimaryButton>
      </div>
    </div>
  )
}

// File: pages/about.tsx
import { PrimaryButton, Breadcrumbs, Breadcrumb } from '@servicestack/react'

export default function About() {
  return (
    <div className="p-8">
      <Breadcrumbs homeHref="/">
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb>About</Breadcrumb>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold my-4">About Page</h1>
      <PrimaryButton href="/">Back to Home</PrimaryButton>
    </div>
  )
}

// File: pages/contact.tsx
import { PrimaryButton, Breadcrumbs, Breadcrumb } from '@servicestack/react'

export default function Contact() {
  return (
    <div className="p-8">
      <Breadcrumbs homeHref="/">
        <Breadcrumb href="/">Home</Breadcrumb>
        <Breadcrumb>Contact</Breadcrumb>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold my-4">Contact Page</h1>
      <PrimaryButton href="/">Back to Home</PrimaryButton>
    </div>
  )
}

