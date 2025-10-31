import { useState, useEffect, useMemo } from 'react'
import type { ApiResponse } from '@/types'
import type { AutoViewFormProps } from '@/components/types'
import { useMetadata } from '@/use/metadata'
import { form } from './css'
import { transition } from '@/use/utils'
import { Sole } from '@/use/config'
import { useClient } from '@/use/client'
import { ApiResult, humanize, map, mapGet } from '@servicestack/client'
import MarkupModel from './MarkupModel'
import CloseButton from './CloseButton'
import ConfirmDelete from './ConfirmDelete'
import FormLoading from './FormLoading'

export default function AutoViewForm({
  formStyle = "slideOver",
  typeName: typeNameProp,
  apis,
  model,
  heading,
  subHeading,
  panelClass: panelClassProp,
  formClass: formClassProp,
  headingClass: headingClassProp,
  subHeadingClass: subHeadingClassProp,
  deleteType,
  showLoading,
  onDone: doneProp,
  onDelete: onDeleteProp,
  onError,
  headingSlot,
  subheadingSlot
}: AutoViewFormProps & {
  headingSlot?: React.ReactNode,
  subheadingSlot?: React.ReactNode
}) {
  const { typeOf, getPrimaryKey, createDto } = useMetadata()

  const typeName = useMemo(() => typeNameProp ?? apis!.dataModel!.name, [typeNameProp, apis])
  const metaType = useMemo(() => typeOf(typeName), [typeName])
  const panelClass = useMemo(() => panelClassProp || form.panelClass(formStyle), [panelClassProp, formStyle])
  const formClass = useMemo(() => formClassProp || form.formClass(formStyle), [formClassProp, formStyle])
  const headingClass = useMemo(() => headingClassProp || form.headingClass(formStyle), [headingClassProp, formStyle])
  const subHeadingClass = useMemo(() => subHeadingClassProp || form.subHeadingClass(formStyle), [subHeadingClassProp, formStyle])

  const title = useMemo(() => heading || typeOf(typeName)?.description ||
    (model?.id ? `${humanize(typeName)} ${model.id}` : 'View ' + humanize(typeName)),
    [heading, typeName, model])

  const [_api, setApi] = useState<ApiResponse>(new ApiResult<any>())

  useEffect(() => {
    if (Sole.interceptors.has('AutoViewForm.new')) {
      Sole.interceptors.invoke('AutoViewForm.new', { props: { formStyle, typeName: typeNameProp, apis, model, heading, subHeading, panelClass: panelClassProp, formClass: formClassProp, headingClass: headingClassProp, subHeadingClass: subHeadingClassProp, deleteType, showLoading, onDone: doneProp, onDelete: onDeleteProp, onError } })
    }
  }, [])

  const client = useClient()
  const loading = useMemo(() => client.loading.current, [client.loading.current])
  const getPk = () => map(metaType, dataModel => getPrimaryKey(dataModel))
  const dataModel = useMemo(() => metaType, [metaType])

  async function onDelete() {
    let pk = getPk()
    const id = pk ? mapGet(model, pk.name) : null
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
    if (doneProp) {
      doneProp()
    }
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

  if (!typeName) {
    return (
      <div>
        <p className="text-red-700">Could not create view for unknown <b>type</b> {typeName}</p>
      </div>
    )
  }

  if (formStyle == 'card') {
    return (
      <div className={panelClass}>
        <div className={formClass}>
          <div>
            {headingSlot || <h3 className={headingClass}>{title}</h3>}

            {subheadingSlot || (subHeading && <p className={subHeadingClass}>{subHeading}</p>)}
            {!subheadingSlot && !subHeading && metaType?.notes && (
              <p className={`notes ${subHeadingClass}`} dangerouslySetInnerHTML={{ __html: metaType.notes }} />
            )}
          </div>
          <MarkupModel value={model} />
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div onMouseDown={close} className="absolute inset-0 overflow-hidden">
          <div onMouseDown={(e) => e.stopPropagation()} className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
            <div className={`pointer-events-auto w-screen xl:max-w-3xl md:max-w-xl max-w-lg ${transition1}`}>
              <div className={formClass}>
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
                    <MarkupModel value={model} />
                  </div>
                </div>
                <div className={form.buttonsClass}>
                  <div>
                    {deleteType && <ConfirmDelete onDelete={onDelete} />}
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
  )
}
