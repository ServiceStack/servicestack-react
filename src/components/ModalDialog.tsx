import { useState, useEffect, createContext } from 'react'
import type { ModalDialogProps } from '@/components/types'
import type { ModalProvider } from '@/types'
import { transition } from '@/use/utils'
import * as css from './css'
import ModalLookup from './ModalLookup'

export const ModalContext = createContext<ModalProvider | null>(null)

export default function ModalDialog({
  id = 'ModalDialog',
  modalClass = css.modal.modalClass,
  sizeClass = css.modal.sizeClass,
  closeButtonClass = "bg-white dark:bg-black cursor-pointer rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-black",
  configureField,
  children,
  closeButton,
  bottom,
  onDone
}: ModalDialogProps & {
  children?: React.ReactNode,
  closeButton?: React.ReactNode,
  bottom?: React.ReactNode
}) {
  const [show, setShow] = useState(false)
  const [transition1, setTransition1] = useState('')
  const [transition2, setTransition2] = useState('')
  const [modal, setModal] = useState<{name: string} & any>()
  const [modalDone, setModalDone] = useState<((result: any) => any) | undefined>()

  const rule1 = {
    entering: { cls: 'ease-out duration-300', from: 'opacity-0', to: 'opacity-100' },
    leaving: { cls: 'ease-in duration-200', from: 'opacity-100', to: 'opacity-0' }
  }
  const rule2 = {
    entering: { cls: 'ease-out duration-300', from: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95', to: 'opacity-100 translate-y-0 sm:scale-100' },
    leaving: { cls: 'ease-in duration-200', from: 'opacity-100 translate-y-0 sm:scale-100', to: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95' }
  }

  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    transition(rule1, setTransition1, show)
    transition(rule2, setTransition2, show)
    if (!show) {
      const timer = setTimeout(() => onDone?.(), 200)
      return () => clearTimeout(timer)
    }
  }, [show, onDone])

  const close = () => setShow(false)

  function openModal(info: {name: string} & any, done: (result: any) => any) {
    setModal(info)
    setModalDone(() => done)
  }

  async function openModalDone(result: any) {
    if (modalDone) {
      modalDone(result)
    }
    setModal(undefined)
    setModalDone(undefined)
  }

  const modalProvider: ModalProvider = {
    openModal
  }

  useEffect(() => {
    const globalKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', globalKeyHandler)
    return () => window.removeEventListener('keydown', globalKeyHandler)
  }, [])

  return (
    <ModalContext.Provider value={modalProvider}>
      <div
        id={id}
        data-transition-for={id}
        onMouseDown={close}
        className="relative z-10"
        aria-labelledby={`${id}-title`}
        role="dialog"
        aria-modal="true"
      >
        <div className={`fixed inset-0 bg-gray-500/75 transition-opacity ${transition1}`}></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className={`${modalClass} ${sizeClass} ${transition2}`} onMouseDown={(e) => e.stopPropagation()}>
              <div>
                {closeButton || (
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 z-10">
                    <button type="button" onClick={close} className={closeButtonClass} title="Close">
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
                {children}
              </div>
            </div>
            {bottom}
          </div>
        </div>

        {modal?.name == 'ModalLookup' && modal.ref && (
          <ModalLookup refInfo={modal.ref} onDone={openModalDone} configureField={configureField} />
        )}
      </div>
    </ModalContext.Provider>
  )
}
