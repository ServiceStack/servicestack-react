import React from 'react'
import type { EnsureAccessDialogProps } from '@/components/types'
import SlideOver from './SlideOver'
import EnsureAccess from './EnsureAccess'

export default function EnsureAccessDialog({
  title,
  subtitle,
  invalidAccess,
  alertClass,
  onDone
}: EnsureAccessDialogProps) {
  if (!invalidAccess) return null

  return (
    <SlideOver
      title={title}
      subtitle={subtitle}
      onDone={onDone}
      contentClass="relative flex-1"
    >
      <EnsureAccess alertClass={alertClass} invalidAccess={invalidAccess} />
    </SlideOver>
  )
}
