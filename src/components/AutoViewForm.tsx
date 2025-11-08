import React, { useState, useMemo, useEffect, useCallback, ReactNode } from 'react'
import type { ApiResponse } from '@/types'
import type { AutoViewFormProps } from '@/components/types'
import { useMetadata, toFormValues } from '@/use/metadata'
import { form } from './css'
import { transition as doTransition } from '@/use/utils'
import { Sole } from '@/use/config'
import { useClient } from '@/use/client'
import { ApiResult, humanize, map, mapGet } from '@servicestack/client'
import MarkupModel from './MarkupModel'
import FormLoading from './FormLoading'
import CloseButton from './CloseButton'
import ConfirmDelete from './ConfirmDelete'

interface AutoViewFormSlots {
  heading?: ReactNode
  subheading?: ReactNode
}

const AutoViewForm: React.FC<AutoViewFormProps & AutoViewFormSlots> = (props) => {
  const {
    model,
    apis,
    typeName: typeNameProp,
    done: doneFn,
    formStyle = "slideOver",
    panelClass: panelClassProp,
    formClass: formClassProp,
    headingClass: headingClassProp,
    subHeadingClass: subHeadingClassProp,
    heading: headingProp,
    subHeading,
    showLoading,
    deleteType,
    onDone,
    onSave,
    onDelete,
    onError,
    // Slots
    heading: headingSlot,
    subheading: subheadingSlot,
  } = props

  const { typeOf, getPrimaryKey, Crud, createDto } = useMetadata()

  const typeName = useMemo(() => typeNameProp ?? apis!.dataModel!.name, [typeNameProp, apis])
  const metaType = useMemo(() => typeOf(typeName), [typeName, typeOf])
  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || form.formClass(formStyle), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])

  const title = useMemo(() =>
    headingProp || typeOf(typeName)?.description || (model?.id ? `${humanize(typeName)} ${model.id}` : 'View ' + humanize(typeName)),
    [headingProp, typeName, typeOf, model]
  )

  const [api, setApi] = useState<ApiResponse>(new ApiResult<any>())
  const [origModel] = useState(() => Object.assign({}, toFormValues(model)))

  const client = useClient()
  const loading = useMemo(() => client.loading, [client.loading])

  const getPk = useCallback(() => map(metaType, (dataModel: any) => getPrimaryKey(dataModel)), [metaType, getPrimaryKey])
  const dataModel = useMemo(() => metaType, [metaType])

  useEffect(() => {
    if (Sole.interceptors.has('AutoViewForm.new')) {
      Sole.interceptors.invoke('AutoViewForm.new', { props })
    }
  }, [])

  const handleDelete = useCallback(async () => {
    let pk = getPk()
    const id = pk ? mapGet(model, pk.name) : null
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
  }, [getPk, model, typeName, dataModel, deleteType, createDto, client, onDelete, onError])

  const done = useCallback(() => {
    if (doneFn) {
      doneFn()
    }
    onDone?.()
  }, [doneFn, onDone])

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

  if (!typeName) {
    return (
      <div>
        <p className="text-red-700">Could not create view for unknown <b>type</b> {typeName}</p>
      </div>
    )
  }

  return (
    <div>
      {formStyle === 'card' ? (
        <div className={panelClass}>
          <div className={formClass}>
            <div>
              {headingSlot || <h3 className={headingClass}>{title}</h3>}
              {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
              {!subheadingSlot && !subHeading && metaType?.notes && (
                <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
              )}
            </div>
            <MarkupModel
              value={model}
              tableClass="border-separate border-spacing-y-1"
              basicTrClass="group"
              basicThClass="py-2 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-l-md"
              basicTdClass="py-2 px-4 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 rounded-r-md"
              complexTitleTrClass="group"
              complexTitleTdClass="py-2 px-4 text-sm font-semibold bg-indigo-600 dark:bg-indigo-700 text-white rounded-md"
              complexBodyTrClass="group"
              complexBodyTdClass="py-2 px-4 bg-white dark:bg-gray-900 rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div onMouseDown={close} className="absolute inset-0 overflow-hidden">
              <div onMouseDown={(e) => e.stopPropagation()} className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
                <div className={`pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${transition1}`}>
                  <div className={formClass}>
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
                        <div className="">
                          <MarkupModel
                            value={model}
                            tableClass="w-full border-separate border-spacing-y-1"
                            basicTrClass="group"
                            basicThClass="py-1 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                            basicTdClass="py-1 px-4 text-sm text-gray-900"
                            complexTitleTrClass="group"
                            complexTitleTdClass="py-1 px-4 font-semibold bg-indigo-600 dark:bg-indigo-700 text-white"
                            complexBodyTrClass="group"
                            complexBodyTdClass="py-1 px-4 bg-white dark:bg-gray-900"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={form.buttonsClass}>
                      <div>
                        {deleteType && <ConfirmDelete onDelete={handleDelete} />}
                      </div>
                      <div>
                        {showLoading && loading && <FormLoading />}
                      </div>
                      <div className="flex justify-end"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

AutoViewForm.displayName = 'AutoViewForm'

export default AutoViewForm
