import { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef, createContext } from 'react'
import type { ApiRequest, ApiResponse, ModalProvider, InputProp } from '@/types'
import type { AutoEditFormProps } from '@/components/types'
import { useClient } from '@/use/client'
import { toFormValues, useMetadata } from '@/use/metadata'
import { form } from './css'
import { getTypeName, transition } from '@/use/utils'
import { Sole } from '@/use/config'
import { ApiResult, HttpMethods, humanize, map, mapGet } from '@servicestack/client'
import AutoFormFields from './AutoFormFields'
import CloseButton from './CloseButton'
import FormLoading from './FormLoading'
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'
import ConfirmDelete from './ConfirmDelete'
import ModalLookup from './ModalLookup'

export const ModalContext = createContext<ModalProvider | null>(null)

const AutoEditForm = forwardRef<any, AutoEditFormProps & {
  headingSlot?: React.ReactNode,
  subheadingSlot?: React.ReactNode,
  headerSlot?: React.ReactNode,
  footerSlot?: React.ReactNode
}>(({
  formStyle = "slideOver",
  autosave = true,
  showLoading = true,
  showCancel,
  type,
  value: modelValue,
  panelClass: panelClassProp,
  formClass: formClassProp,
  headingClass: headingClassProp,
  subHeadingClass: subHeadingClassProp,
  buttonsClass: buttonsClassProp,
  heading,
  subHeading,
  configureField,
  configureFormLayout,
  deleteType,
  onSave,
  onDelete: onDeleteProp,
  onError,
  onDone,
  headingSlot,
  subheadingSlot,
  headerSlot,
  footerSlot
}, ref) => {
  const formFieldsRef = useRef<any>()
  const [formFieldsKey, setFormFieldsKey] = useState(1)

  const { typeOf, apiOf, typeProperties, createFormLayout, getPrimaryKey, Crud, createDto, formValues } = useMetadata()

  const typeName = useMemo(() => getTypeName(type), [type])
  const metaType = useMemo(() => typeOf(typeName), [typeName])

  const resolveModel = () => typeof type == 'string'
    ? createDto(type, toFormValues(modelValue))
    : (type ? new type(toFormValues(modelValue)) : null)
  const [model, setModel] = useState(resolveModel())

  function forceUpdate() {
    setFormFieldsKey(prev => prev + 1)
    setModel(resolveModel())
  }

  function setModelFn(args: any) {
    setModel((prev: any) => ({ ...prev, ...args }))
  }

  useImperativeHandle(ref, () => ({
    forceUpdate,
    props: { formStyle, autosave, showLoading, showCancel, type, modelValue, panelClass: panelClassProp, formClass: formClassProp, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, buttonsClass: buttonsClassProp, heading, subHeading, configureField, configureFormLayout, deleteType, onSave, onDelete: onDeleteProp, onError, onDone },
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
    (dataModel ? `Update ${humanize(dataModel)}` : humanize(typeName)),
    [heading, typeName, dataModel])

  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())
  const origModel = useRef(Object.assign({}, toFormValues(modelValue)))

  useEffect(() => {
    if (Sole.interceptors.has('AutoEditForm.new')) {
      Sole.interceptors.invoke('AutoEditForm.new', { props: { formStyle, autosave, showLoading, showCancel, type, modelValue, panelClass: panelClassProp, formClass: formClassProp, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, buttonsClass: buttonsClassProp, heading, subHeading, configureField, configureFormLayout, deleteType, onSave, onDelete: onDeleteProp, onError, onDone }, model, origModel: origModel.current })
    }
  }, [])

  const client = useClient()
  const loading = useMemo(() => client.loading.current, [client.loading.current])
  const getPk = () => map(typeOf(Crud.model(metaType)), dataModel => getPrimaryKey(dataModel))

  function configure(inputProp: InputProp) {
    const { op, prop } = inputProp
    if (op && (Crud.isPatch(op) || Crud.isUpdate(op))) {
      inputProp.disabled = prop?.isPrimaryKey
    }
    if (configureField) {
      configureField(inputProp)
    }
  }

  function update(_value: ApiRequest) {
    // Update handler
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    let formEl = e.target as HTMLFormElement
    if (!autosave) {
      onSave?.(new (model as any).constructor(formValues(formEl, typeProperties(metaType))))
      return
    }

    let method = map((model as any)?.['getMethod'], (fn: any) => typeof fn == 'function' ? fn() : null) || 'POST'
    let returnsVoid = map((model as any)?.['createResponse'], (fn: any) => typeof fn == 'function' ? fn() : null) == null
    let pk = getPk()

    let result
    if (HttpMethods.hasRequestBody(method)) {
      let requestDto = new (model as any).constructor()
      let pkValue = mapGet(modelValue, pk.name)
      let formData = new FormData(formEl)
      if (pk && !Array.from(formData.keys()).some(k => k.toLowerCase() == pk.name.toLowerCase())) {
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
          let origValue = mapGet(origModel.current, id)
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
          Sole.interceptors.invoke('AutoEditForm.save', { origModel: origModel.current, formLayout, dirtyValues })

        Array.from(formData.keys()).filter(k => !dirtyValues[k]).forEach(k => formData.delete(k))

        let keys = Array.from(formData.keys()).filter(k => k.toLowerCase() != pk.name.toLowerCase())
        if (keys.length == 0 && reset.length == 0) {
          close()
          return
        }
      }

      const args = reset.length > 0 ? { jsconfig: 'eccn', reset } : { jsconfig: 'eccn' }
      if (!returnsVoid) {
        result = await client.apiForm(requestDto, formData, args)
      } else {
        result = await client.apiFormVoid(requestDto, formData, args)
      }
    } else {
      let fieldValues = formValues(formEl, typeProperties(metaType))
      if (pk && !mapGet(fieldValues, pk.name)) {
        fieldValues[pk.name] = mapGet(modelValue, pk.name)
      }

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

  async function onDelete() {
    let pk = getPk()
    const id = pk ? mapGet(modelValue, pk.name) : null
    if (!id) {
      console.error(`Could not find Primary Key for Type ${typeName} (${dataModel})`)
      return
    }
    const args = { [pk!.name]: id }
    const request = typeof deleteType == 'string'
      ? createDto(deleteType, args)
      : (deleteType ? new deleteType(args) : null)

    let returnsVoid = map((request as any)['createResponse'], (fn: any) => typeof fn == 'function' ? fn() : null) == null
    let result
    if (!returnsVoid) {
      result = await client.api(request)
    } else {
      result = await client.apiVoid(request)
    }
    setApi(result)

    if (result.succeeded) {
      onDeleteProp?.(result.response)
    } else {
      onError?.(result.error!)
    }
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
                configureField={configure}
                configureFormLayout={configureFormLayout}
              />
              {footerSlot}

            </div>
            <div className={buttonsClass}>
              <div>
                {deleteType && <ConfirmDelete onDelete={onDelete} />}
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
                        configureField={configure}
                        configureFormLayout={configureFormLayout}
                      />
                      {footerSlot}

                    </div>
                  </div>
                  <div className={buttonsClass}>
                    <div>
                      {deleteType && <ConfirmDelete onDelete={onDelete} />}
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

export default AutoEditForm
