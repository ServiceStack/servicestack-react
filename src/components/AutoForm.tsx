import React, { useState, useMemo, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, ReactNode, createContext } from 'react'
import type { MetadataType, ApiRequest, ResponseStatus, ModalProvider, ApiState } from '@/types'
import type { AutoFormProps } from '@/components/types'
import { ApiResult, HttpMethods, humanize, map, omitEmpty } from '@servicestack/client'
import { useClient } from '@/use/client'
import { getTypeName, transition as doTransition } from '@/use/utils'
import { useMetadata } from '@/use/metadata'
import { form, card, slideOver } from './css'
import { ModalProviderContext, ApiStateContext } from '@/use/context'
import AutoFormFields from './AutoFormFields'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import FormLoading from './FormLoading'
import CloseButton from './CloseButton'
import ModalLookup from './ModalLookup'

export interface AutoFormRef {
  forceUpdate: () => void
  props: AutoFormProps
  setModel: (args: any) => Promise<void>
  formFields: any
  submit: () => Promise<void>
  close: () => void
  model: any
}

interface AutoFormSlots {
  heading?: ReactNode
  subheading?: ReactNode
  header?: (props: { instance: AutoFormRef | null, model: any }) => ReactNode
  footer?: (props: { instance: AutoFormRef | null, model: any }) => ReactNode
  buttons?: ReactNode
  leftbuttons?: (props: { instance: AutoFormRef | null, model: any }) => ReactNode
  rightbuttons?: (props: { instance: AutoFormRef | null, model: any }) => ReactNode
}

/**
 * AutoForm component that automatically generates a form from a ServiceStack DTO type.
 *
 * The form provides ApiStateContext to all child components, allowing them to access
 * the form's loading and error state using the `useApiState()` hook.
 *
 * @example
 * ```tsx
 * // In a child component within AutoForm:
 * import { useApiState } from '@servicestack/react'
 *
 * function CustomFormField() {
 *   const apiState = useApiState()
 *
 *   if (apiState?.loading) {
 *     return <div>Loading...</div>
 *   }
 *
 *   if (apiState?.error) {
 *     return <div>Error: {apiState.error.message}</div>
 *   }
 *
 *   return <div>Form field content</div>
 * }
 * ```
 */
const AutoForm = forwardRef<AutoFormRef, AutoFormProps & AutoFormSlots>((props, ref) => {
  const {
    type,
    value: modelValue,
    heading,
    subHeading,
    showLoading = true,
    jsconfig = 'eccn,edv',
    formStyle = "card",
    metaType: metaTypeProp,
    configureField,
    configureFormLayout,
    panelClass: panelClassProp,
    bodyClass,
    formClass: formClassProp,
    innerFormClass,
    headerClass: headerClassProp = 'p-6',
    buttonsClass: buttonsClassProp,
    headingClass: headingClassProp,
    subHeadingClass: subHeadingClassProp,
    submitLabel = 'Submit',
    allowSubmit,
    onSubmit,
    onSuccess,
    onError,
    onDone,
    onChange,
    children,
    // Slots
    heading: headingSlot,
    subheading: subheadingSlot,
    header: headerSlot,
    footer: footerSlot,
    buttons: buttonsSlot,
    leftbuttons: leftbuttonsSlot,
    rightbuttons: rightbuttonsSlot,
  } = props

  const formFieldsRef = useRef<any>(null)
  const [formFieldsKey, setFormFieldsKey] = useState(1)
  const elFormRef = useRef<HTMLFormElement>(null)
  const [modal, setModal] = useState<{ name: string } & any>()
  const [modalDone, setModalDone] = useState<((result: any) => any) | undefined>()

  const client = useClient()
  const { typeOf, Crud, createDto } = useMetadata()

  const [api, setApi] = useState(new ApiResult())

  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || form.formClass(formStyle), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])
  const buttonsClass = useMemo(() => typeof buttonsClassProp === 'string' ? buttonsClassProp : form.buttonsClass, [buttonsClassProp])

  const typeName = useMemo(() => type ? getTypeName(type) : modelValue?.['getTypeName'] ? modelValue.getTypeName() : null, [type, modelValue])
  const metaType = useMemo(() => metaTypeProp ?? typeOf(typeName), [metaTypeProp, typeName, typeOf])

  const newDto = useCallback(() => {
    return typeof type === 'string' ? createDto(type) : type ? new (type as any)() : modelValue
  }, [type, createDto, modelValue])

  const resolveModel = useCallback(() => modelValue || newDto(), [modelValue, newDto])

  const [model, setModel] = useState(resolveModel())

  const loading = useMemo(() => client.loading, [client.loading])
  const title = useMemo(() => heading != null ? heading : (metaType?.description || humanize(typeName)), [heading, metaType, typeName])

  const forceUpdate = useCallback(() => {
    setFormFieldsKey(prev => prev + 1)
    setModel(resolveModel())
  }, [resolveModel])

  const setModelFn = useCallback(async (args: any) => {
    setModel(prev => ({ ...prev, ...args }))
    forceUpdate()
    // Wait for next tick equivalent
    await new Promise(resolve => setTimeout(resolve, 0))
  }, [forceUpdate])

  const openModal = useCallback((info: { name: string } & any, done: (result: any) => any) => {
    setModal(info)
    setModalDone(() => done)
  }, [])

  const openModalDone = useCallback(async (result: any) => {
    if (modalDone) {
      modalDone(result)
    }
    setModal(undefined)
    setModalDone(undefined)
  }, [modalDone])

  const modalProvider: ModalProvider = useMemo(() => ({
    openModal
  }), [openModal])

  const submitForm = useCallback(async (form: HTMLFormElement) => {
    if (!form || form.tagName !== 'FORM') {
      console.error("Not a valid form", form)
      return
    }
    const dto = newDto()
    let method = map(dto?.['getMethod'], (fn: any) => typeof fn === 'function' ? fn() : null) || 'POST'
    let returnsVoid = map(dto?.['createResponse'], (fn: any) => typeof fn === 'function' ? fn() : null) == null

    let apiResult: ApiResult<any>

    if (onSubmit != null) {
      let requestDto = new dto.constructor(omitEmpty(model))
      apiResult = await onSubmit(requestDto)
    }
    else if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new dto.constructor()
      let formData = new FormData(form)
      if (!returnsVoid) {
        apiResult = await client.apiForm(requestDto, formData, { jsconfig })
      } else {
        apiResult = await client.apiFormVoid(requestDto, formData, { jsconfig })
      }
    } else {
      let requestDto = new dto.constructor(omitEmpty(model))
      console.debug('AutoForm.submit', requestDto)
      if (!returnsVoid) {
        apiResult = await client.api(requestDto, { jsconfig })
      } else {
        apiResult = await client.apiVoid(requestDto, { jsconfig })
      }
    }

    setApi(apiResult)

    if (apiResult.succeeded) {
      onSuccess?.(apiResult.response)
      close()
    } else {
      onError?.(apiResult.error!)
    }
  }, [newDto, client, jsconfig, model, onSuccess, onError])

  const submit = useCallback(async () => {
    if (elFormRef.current) {
      await submitForm(elFormRef.current)
    }
  }, [submitForm])

  const update = useCallback((newModel: ApiRequest | any) => {
    onChange?.(newModel)
  }, [onChange])

  const done = useCallback(() => {
    onDone?.()
  }, [onDone])

  // SlideOver transition
  const [show, setShow] = useState(false)
  const [transition1, setTransition1] = useState('')
  const rule1 = {
    entering: { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-full', to: 'translate-x-0' },
    leaving: { cls: 'transform transition ease-in-out duration-500 sm:duration-700', from: 'translate-x-0', to: 'translate-x-full' }
  }

  useEffect(() => {
    doTransition(rule1, setTransition1, show)
    if (!show) {
      const timer = setTimeout(done, 700)
      return () => clearTimeout(timer)
    }
  }, [show, done])

  useEffect(() => {
    setShow(true)
  }, [])

  const close = useCallback(() => {
    if (formStyle === 'slideOver') {
      setShow(false)
    } else {
      done()
    }
  }, [formStyle, done])

  useEffect(() => {
    const globalKeyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', globalKeyHandler)
    return () => window.removeEventListener('keydown', globalKeyHandler)
  }, [close])

  useImperativeHandle(ref, () => ({
    forceUpdate,
    props,
    setModel: setModelFn,
    formFields: formFieldsRef.current,
    submit,
    close,
    model
  }), [forceUpdate, props, setModelFn, submit, close, model])

  const instanceRef = useMemo(() => ({
    forceUpdate,
    props,
    setModel: setModelFn,
    formFields: formFieldsRef.current,
    submit,
    close,
    model
  }), [forceUpdate, props, setModelFn, submit, close, model])

  if (!metaType) {
    return (
      <div>
        <p className="text-red-700">Could not create form for unknown <b>type</b> {typeName}</p>
      </div>
    )
  }

  const formContent = (isSlideOver: boolean) => (
    <form
      ref={elFormRef}
      onSubmit={(e) => { e.preventDefault(); submitForm(e.target as HTMLFormElement) }}
      autoComplete="off"
      className={isSlideOver ? formClass : innerFormClass}
    >
      <div className={isSlideOver ? "flex min-h-0 flex-1 flex-col overflow-auto" : bodyClass}>
        <div className={isSlideOver ? "flex-1" : undefined}>
          {isSlideOver && (
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
          )}

          {!isSlideOver && (
            <div className={headerClassProp}>
              {headingSlot || <h3 className={headingClass}>{title}</h3>}
              {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
              {!subheadingSlot && !subHeading && metaType?.notes && (
                <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
              )}
            </div>
          )}

          {headerSlot?.({ instance: instanceRef, model })}
          <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1}></button>
          {children || (
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
          )}
          {footerSlot?.({ instance: instanceRef, model })}
        </div>
      </div>
      {buttonsSlot || (
        <div className={buttonsClass}>
          <div>
            {leftbuttonsSlot?.({ instance: instanceRef, model })}
          </div>
          <div>
            {showLoading && loading && <FormLoading />}
          </div>
          <div className="flex justify-end">
            <div></div>
            {isSlideOver && <SecondaryButton onClick={close} disabled={loading}>Cancel</SecondaryButton>}
            <PrimaryButton
              type="submit"
              className={isSlideOver ? "ml-4" : undefined}
              disabled={loading || (allowSubmit ? !allowSubmit(model) : false)}
            >
              {submitLabel}
            </PrimaryButton>
            {rightbuttonsSlot?.({ instance: instanceRef, model })}
          </div>
        </div>
      )}
    </form>
  )

  return (
    <ApiStateContext.Provider value={client}>
      <ModalProviderContext.Provider value={modalProvider}>
        <div>
          {formStyle === 'card' ? (
            <div className={panelClass}>
              {formContent(false)}
            </div>
          ) : (
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0"></div>
              <div className="fixed inset-0 overflow-hidden">
                <div onMouseDown={close} className="absolute inset-0 overflow-hidden">
                  <div onMouseDown={(e) => e.stopPropagation()} className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                    <div className={`pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${transition1}`}>
                      {formContent(true)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {modal?.name === 'ModalLookup' && modal.ref && (
            <ModalLookup refInfo={modal.ref} onDone={openModalDone} configureField={configureField} />
          )}
        </div>
      </ModalProviderContext.Provider>
    </ApiStateContext.Provider>
  )
})

AutoForm.displayName = 'AutoForm'

export default AutoForm
