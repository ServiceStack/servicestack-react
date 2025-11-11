import { ReactNode } from 'react'
import { Sole } from '@/use/config'

interface NavigationLinkProps {
  href: string
  children: ReactNode
  className?: string
  [key: string]: any
}

/**
 * Check if a URL is external (absolute URL with protocol)
 */
function isExternalUrl(href: string): boolean {
  return /^(https?:\/\/|mailto:|tel:)/.test(href)
}

/**
 * NavigationLink component that uses the configured Link component if available,
 * otherwise falls back to a regular anchor tag.
 *
 * This allows the library to work with:
 * - React Router (when Link from 'react-router-dom' is configured)
 * - Next.js (when Link from 'next/link' is configured)
 * - Plain HTML (when no Link component is configured)
 *
 * External URLs (http://, https://, mailto:, tel:) always use regular anchor tags
 */
export function NavigationLink({ href, children, className, ...attrs }: NavigationLinkProps) {
  // Always use regular anchor tag for external URLs
  if (isExternalUrl(href)) {
    return (
      <a href={href} className={className} {...attrs}>
        {children}
      </a>
    )
  }

  const LinkComponent = Sole.config.linkComponent

  if (LinkComponent) {
    // React Router Link uses 'to' prop and accepts className directly
    // Next.js Link uses 'href' prop and in older versions wraps children
    // We'll use 'to' prop for React Router (most common case)
    return (
      <LinkComponent to={href} className={className} {...attrs}>
        {children}
      </LinkComponent>
    )
  }

  // Fallback to regular anchor tag for internal navigation
  return (
    <a href={href} className={className} {...attrs}>
      {children}
    </a>
  )
}

