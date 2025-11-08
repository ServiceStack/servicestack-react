import React, { useMemo, useRef, useCallback, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import type { Pair } from '@/types'
import type { ComboboxProps, ComboboxRef } from '@/components/types'
import Autocomplete, { AutocompleteRef } from './Autocomplete'

/**
 * Combobox component that wraps Autocomplete with key-value pair support.
 *
 * Error handling is delegated to the Autocomplete component, which supports ApiStateContext.
 * Pass the `status` prop to explicitly set errors, or let Autocomplete access errors from context.
 */
const Combobox = forwardRef<ComboboxRef, ComboboxProps & Omit<React.HTMLAttributes<HTMLDivElement>, keyof ComboboxProps>>(({
  status,
  id,
  value,
  multiple: multipleProp,
  options,
  values,
  entries,
  onChange,
  label,
  help,
  placeholder,
  className,
  children,
  ...attrs
}, ref) => {
  const inputRef = useRef<AutocompleteRef>(null)
  const [model, setModel] = useState<Pair | Pair[] | null>(null)

  const multiple = useMemo(() =>
    multipleProp != null ? multipleProp : Array.isArray(value),
    [multipleProp, value]
  )

  const match = useCallback((item: { key: string, value: string }, val: string) => {
    const ret = !val || item.value.toLowerCase().includes(val.toLowerCase())
    return ret
  }, [])

  const kvpValues = useMemo<Pair[]>(() =>
    entries || (values
      ? values.map(x => ({ key: x, value: x }))
      : options
        ? Object.keys(options).map(key => ({ key, value: options[key] }))
        : []),
    [entries, values, options]
  )

  const updateModelValue = useCallback((newModel: any[] | any) => {
    // Convert Pair objects back to keys for the parent component
    if (Array.isArray(newModel)) {
      onChange?.(newModel.map(x => x.key))
    } else if (newModel && typeof newModel === 'object' && 'key' in newModel) {
      onChange?.(newModel.key)
    } else {
      onChange?.(newModel)
    }
  }, [onChange])

  const update = useCallback(() => {
    // Can be {key,value} when updated with setModel()
    let modelValue = value && typeof value === 'object' && !Array.isArray(value)
      ? (value as any).key
      : value

    if (modelValue == null || modelValue === '') {
      setModel(multiple ? [] : null)
    } else if (typeof modelValue === 'string') {
      setModel(kvpValues.find(x => x.key === modelValue) || null)
    } else if (Array.isArray(modelValue)) {
      setModel(kvpValues.filter(x => modelValue.includes(x.key)))
    }
  }, [value, multiple, kvpValues])

  useEffect(() => {
    update()
  }, [update])

  const formValue = useMemo(() =>
    model == null ? '' : (Array.isArray(model)
      ? model.map(x => encodeURIComponent(x.key)).join(',')
      : model.key),
    [model]
  )

  const toggle = useCallback((expand: boolean) => {
    inputRef.current?.toggle(expand)
  }, [])

  useImperativeHandle(ref, () => ({
    toggle
  }), [toggle])

  return (
    <>
      <input type="hidden" id={id} name={id} value={formValue} />
      <Autocomplete
        ref={inputRef}
        id={id}
        status={status}
        label={label}
        help={help}
        placeholder={placeholder}
        className={className}
        options={kvpValues}
        match={match}
        multiple={multiple}
        value={model}
        onChange={updateModelValue}
        {...attrs}
      >
        {({ value }: { key: string, value: string }) => (
          <span className="block truncate">{value}</span>
        )}
      </Autocomplete>
    </>
  )
})

Combobox.displayName = 'Combobox'

export default Combobox
