import React, { ReactNode } from 'react'
import { NavigationLink } from './NavigationLink'

interface RouterLinkProps {
  to?: string
  href?: string
  children?: ReactNode
  [key: string]: any
}

/**
 * RouterLink component that uses the configured Link component.
 * Supports both 'to' (React Router style) and 'href' props for compatibility.
 */
export function RouterLink({ to, href, children, ...attrs }: RouterLinkProps) {
  const path = to || href || '/'

  return (
    <NavigationLink href={path} title={path} {...attrs}>
      {children}
    </NavigationLink>
  )
}
