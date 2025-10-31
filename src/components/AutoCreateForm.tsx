import { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef, createContext } from 'react'
import type { ApiRequest, ApiResponse, ModalProvider } from '@/types'
import type { AutoCreateFormProps } from '@/components/types'
import { useClient } from '@/use/client'
import { useMetadata } from '@/use/metadata'
import { form } from './css'
import { getTypeName, transition } from '@/use/utils'
import { Sole } from '@/use/config'
import { ApiResult, HttpMethods, humanize, map } from '@servicestack/client'
import AutoFormFields from './AutoFormFields'
import CloseButton from './CloseButton'
import FormLoading from './FormLoading'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import ModalLookup from './ModalLookup'

export const ModalContext = createContext<ModalProvider | null>(null)

const AutoCreateForm = forwardRef<any, AutoCreateFormProps & {
  headingSlot?: React.ReactNode,
  subheadingSlot?: React.ReactNode,
  headerSlot?: React.ReactNode,
  footerSlot?: React.ReactNode
}>(({
  formStyle = "slideOver",
  autosave = true,
  showLoading = true,
  showCancel = true,
  type,
  panelClass: panelClassProp,
  formClass: formClassProp,
  headingClass: headingClassProp,
  subHeadingClass: subHeadingClassProp,
  buttonsClass: buttonsClassProp,
  heading,
  subHeading,
  configureField,
  configureFormLayout,
  onSave,
  onError,
  onDone,
  headingSlot,
  subheadingSlot,
  headerSlot,
  footerSlot
}, ref) => {
  const formFieldsRef = useRef<any>()
  const [formFieldsKey, setFormFieldsKey] = useState(1)

  function forceUpdate() {
    setFormFieldsKey(prev => prev + 1)
    formFieldsRef.current?.forceUpdate()
  }

  const { typeOf, typeProperties, Crud, createDto, formValues } = useMetadata()

  const typeName = useMemo(() => getTypeName(type), [type])
  const metaType = useMemo(() => typeOf(typeName), [typeName])
  const resolveModel = () => typeof type == 'string' ? createDto(type) : type ? new type() : null
  const [model, setModel] = useState(resolveModel())

  function setModelFn(args: any) {
    setModel((prev: any) => ({ ...prev, ...args }))
    forceUpdate()
  }

  useImperativeHandle(ref, () => ({
    forceUpdate,
    props: { formStyle, autosave, showLoading, showCancel, type, panelClass: panelClassProp, formClass: formClassProp, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, buttonsClass: buttonsClassProp, heading, subHeading, configureField, configureFormLayout, onSave, onError, onDone },
    setModel: setModelFn,
    formFields: formFieldsRef,
    model
  }))

  const [modal, setModal] = useState<{ name: string } & any>()
  const [modalDone, setModalDone] = useState<((result: any) => any) | undefined>()

  function openModal(info: { name: string } & any, done: (result: any) => any) {
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

  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || form.formClass(formStyle), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])
  const buttonsClass = useMemo(() => buttonsClassProp || form.buttonsClass, [buttonsClassProp])

  const dataModel = useMemo(() => Crud.model(metaType), [metaType])
  const title = useMemo(() => heading || typeOf(typeName)?.description ||
    (dataModel ? `New ${humanize(dataModel)}` : humanize(typeName)),
    [heading, typeName, dataModel])

  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())

  const client = useClient()
  const loading = useMemo(() => client.loading.current, [client.loading.current])

  useEffect(() => {
    if (Sole.interceptors.has('AutoCreateForm.new')) {
      Sole.interceptors.invoke('AutoCreateForm.new', { props: { formStyle, autosave, showLoading, showCancel, type, panelClass: panelClassProp, formClass: formClassProp, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, buttonsClass: buttonsClassProp, heading, subHeading, configureField, configureFormLayout, onSave, onError, onDone }, model })
    }
  }, [])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    let formEl = e.target as HTMLFormElement
    if (!autosave) {
      onSave?.(new (model as any).constructor(formValues(formEl, typeProperties(metaType))))
      return
    }

    let method = map((model as any)?.['getMethod'], (fn: any) => typeof fn == 'function' ? fn() : null) || 'POST'
    let returnsVoid = map((model as any)?.['createResponse'], (fn: any) => typeof fn == 'function' ? fn() : null) == null

    let result
    if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new (model as any).constructor()
      let formData = new FormData(formEl)
      if (!returnsVoid) {
        result = await client.apiForm(requestDto, formData, { jsconfig: 'eccn' })
      } else {
        result = await client.apiFormVoid(requestDto, formData, { jsconfig: 'eccn' })
      }
    } else {
      let fieldValues = formValues(formEl, typeProperties(metaType))
      let requestDto = new (model as any).constructor(fieldValues)
      if (!returnsVoid) {
        result = await client.api(requestDto, { jsconfig: 'eccn' })
      } else {
        result = await client.apiVoid(requestDto, { jsconfig: 'eccn' })
      }
    }
    setApi(result)

    if (result.succeeded) {
      formEl.reset()
      onSave?.(result.response)
    } else {
      onError?.(result.error!)
    }
  }

  function update(_value: ApiRequest) {
    // Update handler
  }

  function done() {
    onDone?.()
  }

  /* SlideOver */
  const [show, setShow] = useState(false)
  const [transition1, setTransition1] = useState('')
  const rule1 = {
    entering: { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-full', to: 'translate-x-0' },
    leaving: { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-0', to: 'translate-x-full' }
  }

  useEffect(() => {
    transition(rule1, setTransition1, show)
    if (!show) {
      const timer = setTimeout(done, 700)
      return () => clearTimeout(timer)
    }
  }, [show])

  useEffect(() => {
    setShow(true)
  }, [])

  function close() {
    if (formStyle == 'slideOver') {
      setShow(false)
    } else {
      done()
    }
  }

  useEffect(() => {
    const globalKeyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', globalKeyHandler)
    return () => window.removeEventListener('keydown', globalKeyHandler)
  }, [])

  if (!metaType) {
    return (
      <div>
        <p className="text-red-700">Could not create form for unknown <b>type</b> {typeName}</p>
      </div>
    )
  }

  if (formStyle == 'card') {
    return (
      <ModalContext.Provider value={modalProvider}>
        <div className={panelClass}>
          <form onSubmit={save}>
            <div className={formClass}>
              <div>
                {headingSlot || <h3 className={headingClass}>{title}</h3>}

                {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
                {!subheadingSlot && !subHeading && metaType?.notes && (
                  <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
                )}
              </div>

              {headerSlot}
              <AutoFormFields
                ref={formFieldsRef}
                key={formFieldsKey}
                value={model}
                onChange={update}
                api={api}
                configureField={configureField}
                configureFormLayout={configureFormLayout}
              />
              {footerSlot}

            </div>
            <div className={buttonsClass}>
              <div>
                {showLoading && loading && <FormLoading />}
              </div>
              <div className="flex justify-end">
                {showCancel && <SecondaryButton onClick={close} disabled={loading}>Cancel</SecondaryButton>}
                <PrimaryButton type="submit" className="ml-4" disabled={loading}>Save</PrimaryButton>
              </div>
            </div>
          </form>
        </div>

        {modal?.name == 'ModalLookup' && modal.ref && (
          <ModalLookup refInfo={modal.ref} onDone={openModalDone} configureField={configureField} />
        )}
      </ModalContext.Provider>
    )
  }

  return (
    <ModalContext.Provider value={modalProvider}>
      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0"></div>
        <div className="fixed inset-0 overflow-hidden">
          <div onMouseDown={close} className="absolute inset-0 overflow-hidden">
            <div onMouseDown={(e) => e.stopPropagation()} className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
              <div className={`pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${transition1}`}>
                <form className={formClass} onSubmit={save}>
                  <div className="flex min-h-0 flex-1 flex-col overflow-auto">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            {headingSlot || <h3 className={headingClass}>{title}</h3>}

                            {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
                            {!subheadingSlot && !subHeading && metaType?.notes && (
                              <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
                            )}
                          </div>
                          <div className="flex h-7 items-center">
                            <CloseButton buttonClass="bg-gray-50 dark:bg-gray-900" onClose={close} />
                          </div>
                        </div>
                      </div>

                      {headerSlot}
                      <AutoFormFields
                        ref={formFieldsRef}
                        key={formFieldsKey}
                        value={model}
                        onChange={update}
                        api={api}
                        configureField={configureField}
                        configureFormLayout={configureFormLayout}
                      />
                      {footerSlot}

                    </div>
                  </div>
                  <div className={buttonsClass}>
                    <div>
                      {showLoading && loading && <FormLoading />}
                    </div>
                    <div className="flex justify-end">
                      {showCancel && <SecondaryButton onClick={close} disabled={loading}>Cancel</SecondaryButton>}
                      <PrimaryButton type="submit" className="ml-4" disabled={loading}>Save</PrimaryButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal?.name == 'ModalLookup' && modal.ref && (
        <ModalLookup refInfo={modal.ref} onDone={openModalDone} configureField={configureField} />
      )}
    </ModalContext.Provider>
  )
})

export default AutoCreateForm
