import { useState, useImperativeHandle, forwardRef, useMemo } from 'react'
import type { InputInfo, InputProp } from '@/types'
import type { AutoFormFieldsProps } from '@/components/types'
import { typeForInput, typeProperties, useMetadata } from '@/use/metadata'
import { getTypeName } from '@/use/utils'
import { mapGet } from "@servicestack/client"
import ErrorSummary from './ErrorSummary'
import LookupInput from './LookupInput'
import DynamicInput from './DynamicInput'

const AutoFormFields = forwardRef<
  { forceUpdate: () => void, props: AutoFormFieldsProps, updateValue: (id: string, value: any) => void },
  AutoFormFieldsProps
>(({
  value: modelValue,
  onChange: onUpdateModelValue,
  type: typeProp,
  metaType,
  formLayout,
  api,
  hideSummary,
  configureField,
  configureFormLayout,
  flexClass = "flex flex-1 flex-col justify-between",
  divideClass = "divide-y divide-gray-200 px-4 sm:px-6",
  spaceClass = "space-y-6 pt-6 pb-5",
  fieldsetClass = "grid grid-cols-12 gap-6"
}, ref) => {
  const [, setForceUpdateCounter] = useState(0)

  function forceUpdate() {
    setForceUpdateCounter(prev => prev + 1)
  }

  function updateField(f: InputInfo, newModel: any) {
    updateValue(f.id, mapGet(newModel, f.id))
  }

  function updateValue(id: string, value: any) {
    modelValue[id] = value
    onUpdateModelValue?.(modelValue)
    forceUpdate()
  }

  useImperativeHandle(ref, () => ({
    forceUpdate,
    props: { value: modelValue, onChange: onUpdateModelValue, type: typeProp, metaType, formLayout, api, hideSummary, configureField, configureFormLayout, flexClass, divideClass, spaceClass, fieldsetClass },
    updateValue
  }))

  const { metadataApi, apiOf, typeOf, typeOfRef, createFormLayout } = useMetadata()

  const typeName = useMemo(() => typeProp || getTypeName(modelValue), [typeProp, modelValue])

  const type = useMemo(() => metaType ?? typeOf(typeName), [metaType, typeName])
  const dataModelType = useMemo(() =>
    typeOfRef(metadataApi?.operations.find((x: any) => x.request.name == typeName)?.dataModel) || type,
    [metadataApi, typeName, type])

  function getSupportedFields() {
    const metaTypeValue = type
    if (!metaTypeValue) {
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
    const metaTypeProps = typeProperties(metaTypeValue)
    const dataModel = dataModelType
    const fields = formLayout
      ? Array.from(formLayout)
      : createFormLayout(metaTypeValue)
    const ret: InputProp[] = []
    const op = apiOf(metaTypeValue.name)
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
  }

  const supportedFields = useMemo(() => getSupportedFields(), [type, formLayout, configureField, configureFormLayout])
  const visibleFields = () => supportedFields.filter(x => x.type != 'hidden').map(x => x.id)

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
                  className={`w-full ${f.css?.field ?? (f.type == 'textarea'
                    ? 'col-span-12'
                    : 'col-span-12 xl:col-span-6' + (f.type == 'checkbox' ? ' flex items-center' : ''))} ${f.type == 'hidden' ? 'hidden' : ''}`}
                >
                  {f.type === 'lookup' || (f.prop?.ref != null && f.type != 'file' && !f.prop.isPrimaryKey) ? (
                    <LookupInput
                      metadataType={dataModelType!}
                      input={f}
                      value={modelValue}
                      onChange={(newModel: any) => updateField(f, newModel)}
                      status={api?.error}
                    />
                  ) : (
                    <DynamicInput
                      input={f}
                      value={modelValue}
                      onChange={onUpdateModelValue}
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
