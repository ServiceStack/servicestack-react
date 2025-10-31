import { useConfig } from '@/use/config'
import type { ReactNode } from 'react'

export default function RouterLink({ to, children, ...attrs }: { to?: string, children?: ReactNode, [key: string]: any }) {
  const { config } = useConfig()
  
  const navigate = (e: React.MouseEvent) => {
    e.preventDefault()
    config.navigate!(to ?? '/')
  }

  return (
    <a onClick={navigate} title={to} href="javascript:void(0)" {...attrs}>
      {children}
    </a>
  )
}

