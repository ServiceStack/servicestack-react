import React, { useMemo } from 'react'
import type { TextLinkProps } from '@/components/types'
import { a } from './css'

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

  return (
    <a className={cls} href={href} {...attrs}>
      {children}
    </a>
  )
}

export default TextLink
