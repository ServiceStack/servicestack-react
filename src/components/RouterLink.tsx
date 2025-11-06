import React, { ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  to?: string
  children?: ReactNode
}

export function RouterLink({ to = '/', children, ...attrs }: RouterLinkProps) {
  return (
    <Link to={to} title={to} {...attrs}>
      {children}
    </Link>
  )
}
