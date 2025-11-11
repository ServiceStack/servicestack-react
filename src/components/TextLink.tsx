import React, { useMemo } from 'react'
import type { TextLinkProps } from '@/components/types'
import { a } from './css'
import { NavigationLink } from './NavigationLink'

const TextLink: React.FC<TextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  color = 'blue',
  children,
  href,
  className,
  ...attrs
}) => {
  const cls = useMemo(() => {
    const baseClasses = (a[color] || a.blue) + (!href ? ' cursor-pointer' : '')
    return className ? `${baseClasses} ${className}` : baseClasses
  }, [color, href, className])

  // If href is provided, use NavigationLink for routing
  if (href) {
    return (
      <NavigationLink href={href} className={cls} {...attrs}>
        {children}
      </NavigationLink>
    )
  }

  // Otherwise render as a span with cursor-pointer for onClick handlers
  return (
    <span className={cls} {...attrs}>
      {children}
    </span>
  )
}

export default TextLink
