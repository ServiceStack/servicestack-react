import { useState, useEffect } from 'react'
import type { SlideOverProps } from '@/components/types'
import { transition } from '@/use/utils'
import CloseButton from './CloseButton'

export default function SlideOver({
  id = 'SlideOver',
  title,
  subtitle,
  contentClass = "relative mt-6 flex-1 px-4 sm:px-6",
  children,
  onDone
}: SlideOverProps & { children?: React.ReactNode, subtitle?: React.ReactNode }) {
  const [show, setShow] = useState(false)
  const [transition1, setTransition1] = useState('')

  const rule1 = {
    entering: { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-full', to: 'translate-x-0' },
    leaving:  { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-0', to: 'translate-x-full' }
  }

  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    transition(rule1, setTransition1, show)
    if (!show) {
      const timer = setTimeout(() => onDone?.(), 700)
      return () => clearTimeout(timer)
    }
  }, [show, onDone])

  const close = () => setShow(false)

  useEffect(() => {
    const globalKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', globalKeyHandler)
    return () => window.removeEventListener('keydown', globalKeyHandler)
  }, [])

  return (
    <div id={id} className="relative z-10" aria-labelledby={`${id}-title`} role="dialog" aria-modal="true">
      <div className="fixed inset-0"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div onMouseDown={close} className="absolute inset-0 overflow-hidden">
          <div onMouseDown={(e) => e.stopPropagation()} className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
            <div className={`panel pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${transition1}`}>
              <div className="flex h-full flex-col bg-white dark:bg-black shadow-xl">
                <div className="flex min-h-0 flex-1 flex-col overflow-auto">
                  <div className="flex-1">
                    {/* Header */}
                    <div className="relative bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          {title && (
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50" id={`${id}-title`}>
                              {title}
                            </h2>
                          )}
                          {subtitle && (
                            <p className="text-sm text-gray-500">
                              {subtitle}
                            </p>
                          )}
                        </div>
                        <div className="flex h-7 items-center">
                          <CloseButton buttonClass="bg-gray-50 dark:bg-gray-900" onClose={close} />
                        </div>
                      </div>
                    </div>

                    <div className={contentClass}>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
