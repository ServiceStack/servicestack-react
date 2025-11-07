import { useState, useMemo, useEffect } from 'react'
import type { UploadedFile, InputProp } from '@/types'
import type { DynamicInputProps } from '@/components/types'
import { Sole } from '@/use/config'
import { lastRightPart, omit } from '@servicestack/client'
import SelectInput from './SelectInput'
import CheckboxInput from './CheckboxInput'
import TagInput from './TagInput'
import Combobox from './Combobox'
import FileInput from './FileInput'
import TextareaInput from './TextareaInput'
import MarkdownInput from './MarkdownInput'
import TextInput from './TextInput'

export default function DynamicInput({
  input,
  value: modelValue,
  onChange: onUpdateModelValue,
  api
}: DynamicInputProps) {
  const type = useMemo(() => input.type || 'text', [input.type])

  const excludeAttrs = 'ignore,css,options,meta,allowableValues,allowableEntries,op,prop,type,id,name'.split(',')
  const inputAttrs = useMemo(() => omit(input, excludeAttrs), [input])

  const [modelField, setModelField] = useState<any>(
    type === 'file' ? null : modelValue[input.id]
  )

  useEffect(() => {
    modelValue[input.id] = modelField
    onUpdateModelValue?.(modelValue)
  }, [modelField])

  const files = useMemo(() => {
    const val = modelValue[input.id]
    if (input.type !== 'file' || !val) return []
    if (typeof val == 'string') return [{ filePath: val, fileName: lastRightPart(val, '/') }]
    if (!Array.isArray(val) && typeof val == 'object') return val
    if (Array.isArray(val)) {
      const to: UploadedFile[] = []
      val.forEach(x => {
        if (typeof x == 'string') to.push({ filePath: x, fileName: lastRightPart(x, '/') })
        else if (typeof x == 'object') to.push(x)
      })
      return to
    }
    return []
  }, [modelValue, input.id, input.type])

  const Component = Sole.component(type) as any
  if (Component) {
    return <Component
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      {...inputAttrs}
    />
  }

  if (type === 'select') {
    return <SelectInput
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      entries={input.allowableEntries}
      values={input.allowableValues}
      {...inputAttrs}
    />
  }

  if (type === 'checkbox') {
    return <CheckboxInput
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      {...inputAttrs}
    />
  }

  if (type === 'tag') {
    return <TagInput
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      allowableValues={input.allowableValues}
      string={(input as InputProp).prop?.type == 'String'}
      {...inputAttrs}
    />
  }

  if (type === 'combobox') {
    return <Combobox
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      entries={input.allowableEntries}
      values={input.allowableValues}
      {...inputAttrs}
    />
  }

  if (type === 'file') {
    return <FileInput
      id={input.id}
      status={api?.error}
      value={modelField}
      onChange={setModelField}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      files={files}
      {...inputAttrs}
    />
  }

  if (type === 'textarea') {
    return <TextareaInput
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      {...inputAttrs}
    />
  }

  if (type === 'MarkdownInput') {
    return <MarkdownInput
      id={input.id}
      value={modelField}
      onChange={setModelField}
      status={api?.error}
      inputClass={input.css?.input}
      labelClass={input.css?.label}
      {...inputAttrs}
    />
  }

  return <TextInput
    type={type}
    id={input.id}
    value={modelField}
    onChange={setModelField}
    status={api?.error}
    inputClass={input.css?.input}
    labelClass={input.css?.label}
    {...inputAttrs}
  />
}