import { useMemo } from 'react'
import type { TextLinkProps } from '@/components/types'
import { a } from './css'

export default function TextLink({
  color = 'blue',
  href,
  children,
  ...attrs
}: TextLinkProps & { children?: React.ReactNode }) {
  const cls = useMemo(() =>
    (a[color] || a.blue) + (!href ? ' cursor-pointer' : '')
  , [color, href])

  return (
    <a className={cls} href={href} {...attrs}>
      {children}
    </a>
  )
}
