import type { EnsureAccessDialogProps } from '@/components/types'
import SlideOver from './SlideOver'
import EnsureAccess from './EnsureAccess'

export default function EnsureAccessDialog({
  title,
  subtitle,
  alertClass,
  invalidAccess,
  onDone
}: EnsureAccessDialogProps) {
  if (!invalidAccess) return null

  return (
    <SlideOver title={title} onDone={onDone} contentClass="relative flex-1">
      {subtitle && <div slot="subtitle">{subtitle}</div>}
      <EnsureAccess alertClass={alertClass} invalidAccess={invalidAccess} />
    </SlideOver>
  )
}
