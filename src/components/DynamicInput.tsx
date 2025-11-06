import React, { useMemo, useState, useEffect } from 'react'
import type { DynamicInputProps } from './types'
import type { UploadedFile, InputProp } from '@/types'
import { Sole } from '@/use/config'
import { lastRightPart, omit } from '@servicestack/client'
import TextInput from './TextInput'
import SelectInput from './SelectInput'
import CheckboxInput from './CheckboxInput'
import TextareaInput from './TextareaInput'
// TODO: Convert these Vue components to React
// import TagInput from './TagInput'
// import Combobox from './Combobox'
// import FileInput from './FileInput'
// import MarkdownInput from './MarkdownInput'

const DynamicInput: React.FC<DynamicInputProps> = ({ input, value: modelValue, api, onChange }) => {
  const type = useMemo(() => input.type || 'text', [input.type])

  const excludeAttrs = 'ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name'.split(',')
  const inputAttrs = useMemo(() => omit(input, excludeAttrs), [input])

  const [modelField, setModelField] = useState<any>(
    type === 'file' ? null : modelValue[input.id]
  )

  // Watch for modelField changes and update parent
  useEffect(() => {
    const newModelValue = { ...modelValue }
    newModelValue[input.id] = modelField
    onChange?.(newModelValue)
  }, [modelField])

  const files = useMemo(() => {
    const val = modelValue[input.id]
    if (input.type !== 'file' || !val) return []
    if (typeof val === 'string') return [{ filePath: val, fileName: lastRightPart(val, '/') }]
    if (!Array.isArray(val) && typeof val === 'object') return val
    if (Array.isArray(val)) {
      const to: UploadedFile[] = []
      val.forEach(x => {
        if (typeof x === 'string') to.push({ filePath: x, fileName: lastRightPart(x, '/') })
        else if (typeof x === 'object') to.push(x)
      })
      return to
    }
    return []
  }, [modelValue, input.id, input.type])

  const handleChange = (newValue: any) => {
    setModelField(newValue)
  }

  const commonProps = {
    id: input.id,
    value: modelField,
    onChange: handleChange,
    status: api?.error,
    inputClass: input.css?.input,
    labelClass: input.css?.label,
    ...inputAttrs
  }

  // Check if Sole has a custom component registered for this type
  const SoleComponent = Sole.component(type)
  if (SoleComponent) {
    return <SoleComponent {...commonProps as any} />
  }

  // Handle different input types
  switch (type) {
    case 'select':
      return (
        <SelectInput
          {...commonProps}
          entries={input.allowableEntries}
          values={input.allowableValues}
        />
      )

    case 'checkbox':
      return <CheckboxInput {...commonProps} />

    case 'tag':
      // TODO: Convert TagInput to React
      return (
        <div>
          TagInput component not yet converted to React
          {/* <TagInput
            {...commonProps}
            allowableValues={input.allowableValues}
            string={(input as InputProp).prop?.type === 'String'}
          /> */}
        </div>
      )

    case 'combobox':
      // TODO: Convert Combobox to React
      return (
        <div>
          Combobox component not yet converted to React
          {/* <Combobox
            {...commonProps}
            entries={input.allowableEntries}
            values={input.allowableValues}
          /> */}
        </div>
      )

    case 'file':
      // TODO: Convert FileInput to React
      return (
        <div>
          FileInput component not yet converted to React
          {/* <FileInput
            {...commonProps}
            files={files}
          /> */}
        </div>
      )

    case 'textarea':
      return <TextareaInput {...commonProps} />

    case 'MarkdownInput':
      // TODO: Convert MarkdownInput to React
      return (
        <div>
          MarkdownInput component not yet converted to React
          {/* <MarkdownInput {...commonProps} /> */}
        </div>
      )

    default:
      return (
        <TextInput
          type={type}
          {...commonProps}
        />
      )
  }
}

DynamicInput.displayName = 'DynamicInput'

export default DynamicInput
