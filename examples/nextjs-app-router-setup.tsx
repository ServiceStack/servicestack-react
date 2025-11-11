/**
 * Example: Setting up @servicestack/react with Next.js App Router
 * 
 * This example shows how to configure the library for use with
 * Next.js 13+ App Router with React 19 SSR support
 */

// File: app/layout.tsx
'use client'

import { setLinkComponent } from '@servicestack/react'
import Link from 'next/link'
import { useEffect } from 'react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Configure the library to use Next.js Link on the client side
  useEffect(() => {
    setLinkComponent(Link)
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// File: app/page.tsx
'use client'

import { PrimaryButton, SecondaryButton, Breadcrumbs, Breadcrumb } from '@servicestack/react'

export default function Home() {
  return (
    <div className="p-8">
      <Breadcrumbs homeHref="/">
        <Breadcrumb>Home</Breadcrumb>
      </Breadcrumbs>

      <h1 className="text-2xl font-bold my-4">Next.js App Router Example</h1>
      
      {/* These buttons will use Next.js Link component internally */}
      <div className="space-x-2">
        <PrimaryButton href="/">Home</PrimaryButton>
        <SecondaryButton href="/about">About</SecondaryButton>
        <PrimaryButton href="/contact">Contact</PrimaryButton>
      </div>
    </div>
  )
}

// File: app/about/page.tsx
'use client'

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

// File: app/contact/page.tsx
'use client'

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

