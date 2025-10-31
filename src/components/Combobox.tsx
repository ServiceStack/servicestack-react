import { useState, useEffect, useMemo, useRef, useImperativeHandle, forwardRef } from 'react'
import type { Pair } from '@/types'
import type { ComboboxProps } from '@/components/types'
import Autocomplete from './Autocomplete'

const Combobox = forwardRef<{ toggle: (expand: boolean) => void }, ComboboxProps>(
  ({ id, value, entries, values, options, multiple: multipleProp, onChange, ...attrs }, ref) => {
    const inputRef = useRef<{ toggle: (expand: boolean) => void }>(null)

    useImperativeHandle(ref, () => ({
      toggle(expand: boolean) {
        inputRef.current?.toggle(expand)
      }
    }))

    const multiple = useMemo(() =>
      multipleProp != null ? multipleProp : Array.isArray(value),
      [multipleProp, value])

    function match(item: { key: string, value: string }, val: string) {
      return !val || item.value.toLowerCase().includes(val.toLowerCase())
    }

    const kvpValues = useMemo<Pair[]>(() => entries || (values
      ? values.map(x => ({ key: x, value: x }))
      : options
        ? Object.keys(options).map(key => ({ key, value: options[key] }))
        : []), [entries, values, options])

    const [model, setModel] = useState<Pair | Pair[] | null>(multiple ? [] : null)

    function update() {
      // Can be {key,value} when updated with setModel()
      let modelVal = value && typeof value == 'object' && !Array.isArray(value)
        ? (value as any).key
        : value
      if (modelVal == null || modelVal === '') {
        setModel(multiple ? [] : null)
      } else if (typeof modelVal == 'string') {
        setModel(kvpValues.find(x => x.key === modelVal) || null)
      } else if (Array.isArray(modelVal)) {
        setModel(kvpValues.filter(x => modelVal.includes(x.key)))
      }
    }

    useEffect(() => {
      update()
    }, [value, kvpValues])

    const formValue = useMemo(() => model == null ? '' : (Array.isArray(model)
      ? model.map(x => encodeURIComponent(x.key)).join(',')
      : model.key), [model])

    function updateModelValue(newModel: any[] | any) {
      onChange?.(newModel)
    }

    return (
      <>
        <input type="hidden" id={id} name={id} value={formValue} />
        <Autocomplete
          ref={inputRef}
          id={id}
          options={kvpValues}
          match={match}
          multiple={multiple}
          value={model}
          onChange={updateModelValue}
          {...attrs}
        />
      </>
    )
  }
)

Combobox.displayName = 'Combobox'

export default Combobox
