import React, { useState, useMemo, useEffect, useRef, useCallback, useImperativeHandle, forwardRef, ReactNode } from 'react'
import type { ApiRequest, ApiResponse, ModalProvider, InputProp } from '@/types'
import type { AutoEditFormProps } from '@/components/types'
import { useClient } from '@/use/client'
import { toFormValues, useMetadata } from '@/use/metadata'
import { form } from './css'
import { getTypeName, transition as doTransition } from '@/use/utils'
import { Sole } from '@/use/config'
import { ApiResult, HttpMethods, humanize, map, mapGet } from '@servicestack/client'
import { ModalProviderContext } from '@/use/context'
import AutoFormFields from './AutoFormFields'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import FormLoading from './FormLoading'
import CloseButton from './CloseButton'
import ConfirmDelete from './ConfirmDelete'
import ModalLookup from './ModalLookup'

export interface AutoEditFormRef {
  forceUpdate: () => void
  props: AutoEditFormProps
  setModel: (args: any) => void
  formFields: any
  model: any
}

interface AutoEditFormSlots {
  heading?: ReactNode
  subheading?: ReactNode
  header?: (props: { formInstance: AutoEditFormRef | null, model: any }) => ReactNode
  footer?: (props: { formInstance: AutoEditFormRef | null, model: any }) => ReactNode
  children?: ReactNode
}

const AutoEditForm = forwardRef<AutoEditFormRef, AutoEditFormProps & AutoEditFormSlots>((props, ref) => {
  const {
    type,
    value: modelValue,
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
    showCancel,
    configureField,
    configureFormLayout,
    deleteType,
    onDone,
    onSave,
    onDelete,
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

  const { typeOf, apiOf, typeProperties, createFormLayout, getPrimaryKey, Crud, createDto, formValues } = useMetadata()

  const typeName = useMemo(() => getTypeName(type), [type])
  const metaType = useMemo(() => typeOf(typeName), [typeName, typeOf])

  const resolveModel = useCallback(() =>
    typeof type === 'string'
      ? createDto(type, toFormValues(modelValue))
      : (type ? new (type as any)(toFormValues(modelValue)) : null),
    [type, modelValue, createDto]
  )

  const [model, setModel] = useState(resolveModel())

  const forceUpdate = useCallback(() => {
    setFormFieldsKey(prev => prev + 1)
    setModel(resolveModel())
  }, [resolveModel])

  const setModelFn = useCallback((args: any) => {
    setModel(prev => ({ ...prev, ...args }))
  }, [])

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
    headingProp || typeOf(typeName)?.description || (dataModel ? `Update ${humanize(dataModel)}` : humanize(typeName)),
    [headingProp, typeName, typeOf, dataModel]
  )

  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())
  const [origModel] = useState(() => Object.assign({}, toFormValues(modelValue)))

  const client = useClient()
  const loading = useMemo(() => client.loading, [client.loading])

  const getPk = useCallback(() => map(typeOf(Crud.model(metaType)), (dataModel: any) => getPrimaryKey(dataModel)), [metaType, typeOf, Crud, getPrimaryKey])

  useEffect(() => {
    if (Sole.interceptors.has('AutoEditForm.new')) {
      Sole.interceptors.invoke('AutoEditForm.new', { props, model, origModel })
    }
  }, [])

  const configure = useCallback((inputProp: InputProp) => {
    const { op, prop } = inputProp
    if (op && (Crud.isPatch(op) || Crud.isUpdate(op))) {
      inputProp.disabled = prop?.isPrimaryKey
    }
    if (configureField) {
      configureField(inputProp)
    }
  }, [configureField, Crud])

  const save = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement

    if (!autosave) {
      onSave?.(new (model as any).constructor(formValues(form, typeProperties(metaType))))
      return
    }

    let method = map(model?.['getMethod'], (fn: any) => typeof fn === 'function' ? fn() : null) || 'POST'
    let returnsVoid = map(model?.['createResponse'], (fn: any) => typeof fn === 'function' ? fn() : null) == null
    let pk = getPk()

    let apiResult: ApiResult<any>

    if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new (model as any).constructor()
      let pkValue = mapGet(modelValue, pk.name)
      let formData = new FormData(form)
      if (pk && !Array.from(formData.keys()).some(k => k.toLowerCase() === pk.name.toLowerCase())) {
        formData.append(pk.name, pkValue)
      }

      let reset: string[] = []
      const apiType = typeName && apiOf(typeName)
      if (apiType && Crud.isPatch(apiType)) {
        let formLayout = createFormLayout(metaType)
        let dirtyValues: { [k: string]: any } = {}
        if (pk) dirtyValues[pk.name] = pkValue

        formLayout.forEach(input => {
          let id = input.id
          let origValue = mapGet(origModel, id)
          if (pk && pk.name.toLowerCase() === id.toLowerCase()) {
            return
          }
          let newValue = formData.get(id)

          if (Sole.interceptors.has('AutoEditForm.save.formLayout'))
            Sole.interceptors.invoke('AutoEditForm.save.formLayout', { origValue, formLayout, input, newValue })

          let exists = newValue != null
          let changed = input.type === 'checkbox'
            ? exists !== !!origValue
            : input.type === 'file'
              ? exists
              : newValue != origValue
          if (!newValue && !origValue) changed = false
          if (changed) {
            if (newValue) {
              dirtyValues[id] = newValue
            } else {
              if (input.type !== 'file') {
                reset.push(id)
              }
            }
          }
        })

        if (Sole.interceptors.has('AutoEditForm.save'))
          Sole.interceptors.invoke('AutoEditForm.save', { origModel, formLayout, dirtyValues })

        Array.from(formData.keys()).filter(k => !dirtyValues[k]).forEach(k => formData.delete(k))

        let keys = Array.from(formData.keys()).filter(k => k.toLowerCase() !== pk.name.toLowerCase())
        if (keys.length === 0 && reset.length === 0) {
          close()
          return
        }
      }

      const args = reset.length > 0 ? { jsconfig: 'eccn', reset } : { jsconfig: 'eccn' }
      if (!returnsVoid) {
        apiResult = await client.apiForm(requestDto, formData, args)
      } else {
        apiResult = await client.apiFormVoid(requestDto, formData, args)
      }
    } else {
      let fieldValues = formValues(form, typeProperties(metaType))
      if (pk && !mapGet(fieldValues, pk.name)) {
        fieldValues[pk.name] = mapGet(modelValue, pk.name)
      }

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
  }, [autosave, model, client, metaType, typeProperties, formValues, onSave, onError, modelValue, getPk, typeName, apiOf, Crud, createFormLayout, origModel])

  const handleDelete = useCallback(async () => {
    let pk = getPk()
    const id = pk ? mapGet(modelValue, pk.name) : null
    if (!id) {
      console.error(`Could not find Primary Key for Type ${typeName} (${dataModel})`)
      return
    }
    const args = { [pk!.name]: id }
    const request = typeof deleteType === 'string'
      ? createDto(deleteType, args)
      : (deleteType ? new (deleteType as any)(args) : null)

    let returnsVoid = map(request['createResponse'], (fn: any) => typeof fn === 'function' ? fn() : null) == null
    let apiResult: ApiResult<any>

    if (!returnsVoid) {
      apiResult = await client.api(request)
    } else {
      apiResult = await client.apiVoid(request)
    }

    setApi(apiResult)

    if (apiResult.succeeded) {
      onDelete?.(apiResult.response)
    } else {
      onError?.(apiResult.error!)
    }
  }, [getPk, modelValue, typeName, dataModel, deleteType, createDto, client, onDelete, onError])

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
            configureField={configure}
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
              configureField={configure}
              configureFormLayout={configureFormLayout}
            />
            {footerSlot?.({ formInstance, model })}
          </div>
        </div>
      )}

      <div className={buttonsClass}>
        <div>
          {deleteType && <ConfirmDelete onDelete={handleDelete} />}
        </div>
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

AutoEditForm.displayName = 'AutoEditForm'

export default AutoEditForm
