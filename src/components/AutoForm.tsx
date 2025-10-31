import { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef, createContext } from 'react'
import type { ApiRequest, ModalProvider } from '@/types'
import type { AutoFormProps } from '@/components/types'
import { ApiResult, HttpMethods, humanize, map, omitEmpty } from '@servicestack/client'
import { useClient } from '@/use/client'
import { transition, getTypeName } from '@/use/utils'
import { useMetadata } from '@/use/metadata'
import { form, slideOver } from './css'
import AutoFormFields from './AutoFormFields'
import CloseButton from './CloseButton'
import FormLoading from './FormLoading'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import ModalLookup from './ModalLookup'

export const ModalContext = createContext<ModalProvider | null>(null)

const AutoForm = forwardRef<any, AutoFormProps & {
  headingSlot?: React.ReactNode,
  subheadingSlot?: React.ReactNode,
  headerSlot?: React.ReactNode,
  footerSlot?: React.ReactNode,
  buttonsSlot?: React.ReactNode,
  leftbuttonsSlot?: React.ReactNode,
  rightbuttonsSlot?: React.ReactNode
}>(({
  formStyle = "card",
  headerClass: headerClassProp = 'p-6',
  submitLabel = 'Submit',
  jsconfig = 'eccn,edv',
  showLoading = true,
  type,
  metaType: metaTypeProp,
  value: modelValue,
  onChange: onUpdateModelValue,
  panelClass: panelClassProp,
  formClass: formClassProp,
  innerFormClass,
  bodyClass,
  headingClass: headingClassProp,
  subHeadingClass: subHeadingClassProp,
  buttonsClass: buttonsClassProp,
  heading,
  subHeading,
  configureField,
  configureFormLayout,
  allowSubmit,
  onSuccess,
  onError,
  onDone,
  headingSlot,
  subheadingSlot,
  headerSlot,
  footerSlot,
  buttonsSlot,
  leftbuttonsSlot,
  rightbuttonsSlot
}, ref) => {
  const formFieldsRef = useRef<any>()
  const [formFieldsKey, setFormFieldsKey] = useState(1)
  const elFormRef = useRef<HTMLFormElement>(null)

  const client = useClient()
  const { typeOf, createDto } = useMetadata()

  const [api, setApi] = useState(new ApiResult())

  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || (formStyle == "card" ? 'shadow sm:rounded-md' : slideOver.formClass), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])
  const buttonsClass = useMemo(() => typeof buttonsClassProp == 'string' ? buttonsClassProp : form.buttonsClass, [buttonsClassProp])

  const typeName = useMemo(() => type ? getTypeName(type) : modelValue?.['getTypeName'] ? modelValue.getTypeName() : null, [type, modelValue])
  const metaType = useMemo(() => metaTypeProp ?? typeOf(typeName), [metaTypeProp, typeName])

  function newDto() {
    return typeof type == 'string' ? createDto(type) : type ? new type() : modelValue
  }

  const resolveModel = () => modelValue || newDto()
  const [model, setModel] = useState(resolveModel())
  const loading = useMemo(() => client.loading.current, [client.loading.current])
  const title = useMemo(() => heading != null ? heading : (metaType?.description || humanize(typeName)), [heading, metaType, typeName])

  function forceUpdate() {
    setFormFieldsKey(prev => prev + 1)
    setModel(resolveModel())
  }

  async function setModelFn(args: any) {
    setModel((prev: any) => ({ ...prev, ...args }))
    forceUpdate()
  }

  async function submitForm(form: HTMLFormElement) {
    if (!form || form.tagName != 'FORM') {
      console.error("Not a valid form", form)
      return
    }
    const dto = newDto()
    let method = map((dto as any)?.['getMethod'], (fn: any) => typeof fn == 'function' ? fn() : null) || 'POST'
    let returnsVoid = map((dto as any)?.['createResponse'], (fn: any) => typeof fn == 'function' ? fn() : null) == null

    let result
    if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new (dto as any).constructor()
      let formData = new FormData(form)
      if (!returnsVoid) {
        result = await client.apiForm(requestDto, formData, { jsconfig })
      } else {
        result = await client.apiFormVoid(requestDto, formData, { jsconfig })
      }
    } else {
      let requestDto = new (dto as any).constructor(omitEmpty(model))
      console.debug('AutoForm.submit', requestDto)
      if (!returnsVoid) {
        result = await client.api(requestDto, { jsconfig })
      } else {
        result = await client.apiVoid(requestDto, { jsconfig })
      }
    }
    setApi(result)

    if (result.succeeded) {
      onSuccess?.(result.response)
      close()
    } else {
      onError?.(result.error!)
    }
  }

  async function submit() {
    submitForm(elFormRef.current!)
  }

  function update(newModel: ApiRequest | any) {
    onUpdateModelValue?.(newModel)
  }

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

  useImperativeHandle(ref, () => ({
    forceUpdate,
    props: { formStyle, headerClass: headerClassProp, submitLabel, jsconfig, showLoading, type, metaType: metaTypeProp, modelValue, 'onUpdate:modelValue': onUpdateModelValue, panelClass: panelClassProp, formClass: formClassProp, innerFormClass, bodyClass, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, buttonsClass: buttonsClassProp, heading, subHeading, configureField, configureFormLayout, allowSubmit, onSuccess, onError, onDone },
    setModel: setModelFn,
    formFields: formFieldsRef,
    submit,
    close,
    model
  }))

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
          <form ref={elFormRef} onSubmit={(e) => { e.preventDefault(); submitForm(e.target as HTMLFormElement) }} autoComplete="off" className={innerFormClass}>
            <div className={bodyClass}>
              <div className={headerClassProp}>
                {headingSlot || <h3 className={headingClass}>{title}</h3>}

                {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
                {!subheadingSlot && !subHeading && metaType?.notes && (
                  <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
                )}
              </div>

              {headerSlot}
              <input type="submit" className="hidden" />
              <AutoFormFields
                ref={formFieldsRef}
                key={formFieldsKey}
                type={type}
                value={model}
                onChange={update}
                api={api}
                configureField={configureField}
                configureFormLayout={configureFormLayout}
              />
              {footerSlot}
            </div>
            {buttonsSlot || (
              <div className={buttonsClass}>
                <div>
                  {leftbuttonsSlot}
                </div>
                <div>
                  {showLoading && loading && <FormLoading />}
                </div>
                <div className="flex justify-end">
                  <div></div>
                  <PrimaryButton disabled={loading || (allowSubmit ? !allowSubmit(model) : false)}>{submitLabel}</PrimaryButton>
                  {rightbuttonsSlot}
                </div>
              </div>
            )}
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
                <form ref={elFormRef} className={formClass} onSubmit={(e) => { e.preventDefault(); submitForm(e.target as HTMLFormElement) }}>
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
                        type={type}
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
                      {leftbuttonsSlot}
                    </div>
                    <div>
                      {showLoading && loading && <FormLoading />}
                    </div>
                    <div className="flex justify-end">
                      <SecondaryButton onClick={close} disabled={loading}>Cancel</SecondaryButton>
                      <PrimaryButton className="ml-4" disabled={loading || (allowSubmit ? !allowSubmit(model) : false)}>{submitLabel}</PrimaryButton>
                      {rightbuttonsSlot}
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

export default AutoForm
