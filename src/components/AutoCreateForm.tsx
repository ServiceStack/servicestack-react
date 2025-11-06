import React, { useState, useMemo, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, ReactNode } from 'react'
import type { ApiRequest, ApiResponse, ModalProvider } from '@/types'
import type { AutoCreateFormProps } from '@/components/types'
import { useClient } from '@/use/client'
import { useMetadata } from '@/use/metadata'
import { form } from './css'
import { getTypeName, transition as doTransition } from '@/use/utils'
import { Sole } from '@/use/config'
import { ApiResult, HttpMethods, humanize, map } from '@servicestack/client'
import { ModalProviderContext } from '@/use/context'
import AutoFormFields from './AutoFormFields'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import FormLoading from './FormLoading'
import CloseButton from './CloseButton'
import ModalLookup from './ModalLookup'

export interface AutoCreateFormRef {
  forceUpdate: () => void
  props: AutoCreateFormProps
  setModel: (args: any) => void
  formFields: any
  model: any
}

interface AutoCreateFormSlots {
  heading?: ReactNode
  subheading?: ReactNode
  header?: (props: { formInstance: AutoCreateFormRef | null, model: any }) => ReactNode
  footer?: (props: { formInstance: AutoCreateFormRef | null, model: any }) => ReactNode
  children?: ReactNode
}

const AutoCreateForm = forwardRef<AutoCreateFormRef, AutoCreateFormProps & AutoCreateFormSlots>((props, ref) => {
  const {
    type,
    formStyle = "slideOver",
    panelClass: panelClassProp,
    formClass: formClassProp,
    headingClass: headingClassProp,
    subHeadingClass: subHeadingClassProp,
    buttonsClass: buttonsClassProp,
    heading: headingProp,
    subHeading,
    autosave = true,
    showLoading = true,
    showCancel = true,
    configureField,
    configureFormLayout,
    onDone,
    onSave,
    onError,
    // Slots
    heading: headingSlot,
    subheading: subheadingSlot,
    header: headerSlot,
    footer: footerSlot,
    children: _children,
  } = props

  const formFieldsRef = useRef<any>(null)
  const [formFieldsKey, setFormFieldsKey] = useState(1)
  const [modal, setModal] = useState<{ name: string } & any>()
  const [modalDone, setModalDone] = useState<((result: any) => any) | undefined>()

  const { typeOf, typeProperties, Crud, createDto, formValues } = useMetadata()

  const typeName = useMemo(() => getTypeName(type), [type])
  const metaType = useMemo(() => typeOf(typeName), [typeName, typeOf])

  const resolveModel = useCallback(() =>
    typeof type === 'string' ? createDto(type) : type ? new (type as any)() : null,
    [type, createDto]
  )

  const [model, setModel] = useState(resolveModel())

  const forceUpdate = useCallback(() => {
    setFormFieldsKey(prev => prev + 1)
    formFieldsRef.current?.forceUpdate?.()
  }, [])

  const setModelFn = useCallback((args: any) => {
    setModel(prev => ({ ...prev, ...args }))
    forceUpdate()
  }, [forceUpdate])

  const update = useCallback((value: ApiRequest) => {
    // Model update handled internally
  }, [])

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

  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || form.formClass(formStyle), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])
  const buttonsClass = useMemo(() => buttonsClassProp || form.buttonsClass, [buttonsClassProp])

  const dataModel = useMemo(() => Crud.model(metaType), [metaType, Crud])
  const title = useMemo(() =>
    headingProp || typeOf(typeName)?.description || (dataModel ? `New ${humanize(dataModel)}` : humanize(typeName)),
    [headingProp, typeName, typeOf, dataModel]
  )

  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())

  const client = useClient()
  const loading = useMemo(() => client.loading, [client.loading])

  useEffect(() => {
    if (Sole.interceptors.has('AutoCreateForm.new')) {
      Sole.interceptors.invoke('AutoCreateForm.new', { props, model })
    }
  }, [])

  const save = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    if (!autosave) {
      onSave?.(new (model as any).constructor(formValues(form, typeProperties(metaType))))
      return
    }

    let method = map(model?.['getMethod'], (fn: any) => typeof fn === 'function' ? fn() : null) || 'POST'
    let returnsVoid = map(model?.['createResponse'], (fn: any) => typeof fn === 'function' ? fn() : null) == null

    let apiResult: ApiResult<any>

    if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new (model as any).constructor()
      let formData = new FormData(form)
      if (!returnsVoid) {
        apiResult = await client.apiForm(requestDto, formData, { jsconfig: 'eccn' })
      } else {
        apiResult = await client.apiFormVoid(requestDto, formData, { jsconfig: 'eccn' })
      }
    } else {
      let fieldValues = formValues(form, typeProperties(metaType))
      let requestDto = new (model as any).constructor(fieldValues)
      if (!returnsVoid) {
        apiResult = await client.api(requestDto, { jsconfig: 'eccn' })
      } else {
        apiResult = await client.apiVoid(requestDto, { jsconfig: 'eccn' })
      }
    }

    setApi(apiResult)

    if (apiResult.succeeded) {
      form.reset()
      onSave?.(apiResult.response)
    } else {
      onError?.(apiResult.error!)
    }
  }, [autosave, model, client, metaType, typeProperties, formValues, onSave, onError])

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
    doTransition(rule1, { value: transition1 } as any, show)
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
    model
  }), [forceUpdate, props, setModelFn, model])

  const formInstance = useMemo(() => ({
    forceUpdate,
    props,
    setModel: setModelFn,
    formFields: formFieldsRef.current,
    model
  }), [forceUpdate, props, setModelFn, model])

  if (!metaType) {
    return (
      <div>
        <p className="text-red-700">Could not create form for unknown <b>type</b> {typeName}</p>
      </div>
    )
  }

  const formContent = (isSlideOver: boolean) => (
    <form onSubmit={save} className={isSlideOver ? formClass : undefined}>
      {!isSlideOver && (
        <div className={formClass}>
          <div>
            {headingSlot || <h3 className={headingClass}>{title}</h3>}
            {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
            {!subheadingSlot && !subHeading && metaType?.notes && (
              <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
            )}
          </div>

          {headerSlot?.({ formInstance, model })}
          <AutoFormFields
            ref={formFieldsRef}
            key={formFieldsKey}
            value={model}
            onChange={update}
            api={api}
            configureField={configureField}
            configureFormLayout={configureFormLayout}
          />
          {footerSlot?.({ formInstance, model })}
        </div>
      )}

      {isSlideOver && (
        <div className="flex min-h-0 flex-1 flex-col overflow-auto">
          <div className="flex-1">
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

            {headerSlot?.({ formInstance, model })}
            <AutoFormFields
              ref={formFieldsRef}
              key={formFieldsKey}
              value={model}
              onChange={update}
              api={api}
              configureField={configureField}
              configureFormLayout={configureFormLayout}
            />
            {footerSlot?.({ formInstance, model })}
          </div>
        </div>
      )}

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
  )

  return (
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
  )
})

AutoCreateForm.displayName = 'AutoCreateForm'

export default AutoCreateForm
