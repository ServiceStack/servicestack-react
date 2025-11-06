import React, { useMemo } from 'react'
import type { TextLinkProps } from '@/components/types'
import { a } from './css'

const TextLink: React.FC<TextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  color = 'blue',
  children,
  href,
  ...attrs
}) => {
  const cls = useMemo(() =>
    (a[color] || a.blue) + (!href ? ' cursor-pointer' : ''),
    [color, href]
  )

  return (
    <a className={cls} href={href} {...attrs}>
      {children}
    </a>
  )
}

export default TextLink
