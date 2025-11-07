import React, { useMemo, useCallback, useImperativeHandle, forwardRef } from 'react'
import type { InputInfo, InputProp } from '@/types'
import type { AutoFormFieldsProps } from '@/components/types'
import { typeForInput, typeProperties, useMetadata } from '@/use/metadata'
import { getTypeName } from '@/use/utils'
import { mapGet } from "@servicestack/client"
import ErrorSummary from './ErrorSummary'
import DynamicInput from './DynamicInput'
import LookupInput from './LookupInput'

export interface AutoFormFieldsRef {
  forceUpdate: () => void
  props: AutoFormFieldsProps
  updateValue: (id: string, value: any) => void
}

const AutoFormFields = forwardRef<AutoFormFieldsRef, AutoFormFieldsProps>(({
  value: modelValue,
  type: typeProp,
  metaType,
  api,
  formLayout,
  configureField,
  configureFormLayout,
  hideSummary = false,
  flexClass = "flex flex-1 flex-col justify-between",
  divideClass = "divide-y divide-gray-200 px-4 sm:px-6",
  spaceClass = "space-y-6 pt-6 pb-5",
  fieldsetClass = "grid grid-cols-12 gap-6",
  onChange
}, ref) => {

  const { metadataApi, apiOf, typeOf, typeOfRef, createFormLayout, Crud } = useMetadata()

  const typeName = useMemo(() => getTypeName(typeProp || modelValue), [typeProp, modelValue])

  const type = useMemo(() => metaType ?? typeOf(typeName), [metaType, typeName, typeOf])

  const dataModelType = useMemo(() =>
    typeOfRef(metadataApi?.operations.find(x => x.request.name == typeName)?.dataModel) || type,
    [metadataApi, typeName, type, typeOfRef]
  )

  const getSupportedFields = useCallback(() => {
    const metaType = type
    if (!metaType) {
      if (formLayout) {
        const ret = formLayout.map(f => {
          const prop = { name: f.id, type: typeForInput(f.type) }
          const inputProp = Object.assign({ prop }, f) as InputProp
          if (configureField) configureField(inputProp)
          return inputProp
        })
        if (configureFormLayout)
          configureFormLayout(ret)
        return ret
      }
      throw new Error(`MetadataType for ${typeName} not found`)
    }
    const metaTypeProps = typeProperties(metaType)
    const dataModel = dataModelType
    const fields = formLayout
      ? Array.from(formLayout)
      : createFormLayout(metaType)
    const ret: InputProp[] = []
    const op = apiOf(metaType.name)
    fields.forEach(f => {
      const propType = metaTypeProps.find(x => x.name == f.name)
      if (f.ignore) return
      const prop = dataModel?.properties?.find(x => x.name.toLowerCase() == f.name?.toLowerCase()) ?? propType
      const inputProp = Object.assign({ prop, op }, f) as InputProp
      if (configureField) configureField(inputProp)
      ret.push(inputProp)
    })
    if (configureFormLayout)
      configureFormLayout(ret)
    return ret
  }, [type, formLayout, typeName, typeProperties, dataModelType, createFormLayout, apiOf, configureField, configureFormLayout])

  const supportedFields = useMemo(() => getSupportedFields(), [getSupportedFields])

  const visibleFields = useCallback(() =>
    supportedFields.filter(x => x.type != 'hidden').map(x => x.id),
    [supportedFields]
  )

  const updateValue = useCallback((id: string, value: any) => {
    const newModel = { ...modelValue }
    newModel[id] = value
    onChange?.(newModel)
  }, [modelValue, onChange])

  const updateField = useCallback((f: InputInfo, newModel: any) => {
    updateValue(f.id, mapGet(newModel, f.id))
  }, [updateValue])

  const forceUpdate = useCallback(() => {
    // In React, force update is typically not needed with proper state management
    // If parent is managing state correctly, this will trigger re-render automatically
    onChange?.({ ...modelValue })
  }, [modelValue, onChange])

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    forceUpdate,
    props: {
      value: modelValue,
      type: typeProp,
      metaType,
      api,
      formLayout,
      configureField,
      configureFormLayout,
      hideSummary,
      flexClass,
      divideClass,
      spaceClass,
      fieldsetClass,
      onChange
    },
    updateValue
  }), [forceUpdate, modelValue, typeProp, metaType, api, formLayout, configureField, configureFormLayout, hideSummary, flexClass, divideClass, spaceClass, fieldsetClass, onChange, updateValue])

  return (
    <>
      {!hideSummary && <ErrorSummary status={api?.error} except={visibleFields()} />}
      <div className={flexClass}>
        <div className={divideClass}>
          <div className={spaceClass}>
            <fieldset className={fieldsetClass}>
              {supportedFields.map(f => (
                <div
                  key={f.id}
                  className={[
                    'w-full',
                    f.css?.field ?? (f.type == 'textarea'
                      ? 'col-span-12'
                      : 'col-span-12 xl:col-span-6' + (f.type == 'checkbox' ? ' flex items-center' : '')),
                    f.type == 'hidden' ? 'hidden' : ''
                  ].join(' ')}
                >
                  {(f.type === 'lookup' || (f.prop?.ref != null && f.type != 'file' && !f.prop.isPrimaryKey)) ? (
                    <LookupInput
                      metadataType={dataModelType!}
                      input={f}
                      value={modelValue}
                      onChange={(newModel) => updateField(f, newModel)}
                      status={api?.error}
                    />
                  ) : (
                    <DynamicInput
                      input={f}
                      value={modelValue}
                      onChange={onChange}
                      api={api}
                    />
                  )}
                </div>
              ))}
            </fieldset>
          </div>
        </div>
      </div>
    </>
  )
})

AutoFormFields.displayName = 'AutoFormFields'

export default AutoFormFields
