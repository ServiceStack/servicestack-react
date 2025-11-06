import React, { useState, forwardRef, useImperativeHandle, ReactNode } from 'react'
import type { SidebarLayoutRef } from '@/components/types'

interface SidebarLayoutProps {
  children?: ReactNode
  mobileTitlebar?: ReactNode
}

export const SidebarLayout = forwardRef<SidebarLayoutRef, SidebarLayoutProps>(
  ({ children, mobileTitlebar }, ref) => {
    const [toggleState, setToggleState] = useState(true)
    const [transition1, setTransition1] = useState('')
    const [transition2, setTransition2] = useState('')
    const [transition3, setTransition3] = useState('')

    const rule1 = {
      entering: { cls: 'transition-opacity ease-linear duration-300', from: 'opacity-0', to: 'opacity-100' },
      leaving: { cls: 'transition-opacity ease-linear duration-300', from: 'opacity-100', to: 'opacity-0' },
    }

    const rule2 = {
      entering: { cls: 'transition ease-in-out duration-300 transform', from: '-translate-x-full', to: 'translate-x-0' },
      leaving: { cls: 'transition ease-in-out duration-300 transform', from: 'translate-x-0', to: '-translate-x-full' },
    }

    const rule3 = {
      entering: { cls: 'ease-in-out duration-300', from: 'opacity-0', to: 'opacity-100' },
      leaving: { cls: 'ease-in-out duration-300', from: 'opacity-100', to: 'opacity-0' },
    }

    const applyTransition = (
      rule: typeof rule1,
      setTransition: (value: string) => void,
      show: boolean
    ) => {
      if (show) {
        setTransition(rule.entering.cls + ' ' + rule.entering.from)
        setTimeout(() => setTransition(rule.entering.cls + ' ' + rule.entering.to), 0)
      } else {
        setTransition(rule.leaving.cls + ' ' + rule.leaving.from)
        setTimeout(() => setTransition(rule.leaving.cls + ' ' + rule.leaving.to), 0)
      }
    }

    const toggle = (show: boolean) => {
      applyTransition(rule1, setTransition1, show)
      applyTransition(rule2, setTransition2, show)
      applyTransition(rule3, setTransition3, show)
      setTimeout(() => setToggleState(show), 300)
    }

    const show = () => toggle(true)
    const hide = () => toggle(false)

    useImperativeHandle(ref, () => ({
      show,
      hide,
      toggle,
    }))

    return (
      <div>
        {/* Off-canvas menu for mobile, show/hide based on off-canvas menu state. */}
        {toggleState && (
          <div className="relative z-10 lg:hidden" role="dialog" aria-modal="true">
            <div className={`fixed inset-0 bg-gray-900/80 ${transition1}`}></div>

            <div className="fixed inset-0 flex">
              <div className={`relative mr-16 flex w-full max-w-xs flex-1 ${transition2}`}>
                <div className={`absolute left-full top-0 flex w-16 justify-center pt-5 ${transition3}`}>
                  <button type="button" onClick={hide} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <svg
                      className="h-6 w-6 text-white dark:text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-black px-6 pb-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-6">
            {children}
          </div>
        </div>

        {/* sticky titlebar for mobile */}
        <div className="sticky top-0 flex items-center gap-x-6 bg-white dark:bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={show}
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          {mobileTitlebar}
        </div>
      </div>
    )
  }
)

SidebarLayout.displayName = 'SidebarLayout'
