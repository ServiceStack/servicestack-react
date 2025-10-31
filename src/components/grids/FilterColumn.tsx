import { useState, useEffect, useRef, useMemo } from 'react'
import type { FilterColumnProps } from '@/components/types'
import type { ColumnSettings, Filter } from '@/types'
import { isString, enumOptions, asKvps, filterRuleValue, typeOf } from '@/use/metadata'
import SelectInput from '../SelectInput'
import TextInput from '../TextInput'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'

export default function FilterColumn({
  definitions,
  column,
  topLeft,
  onDone,
  onSave
}: FilterColumnProps) {
  const txtFilterRef = useRef<any>(null)
  const [newQuery, setNewQuery] = useState('%')
  const [newValue, setNewValue] = useState('')
  const [selectedEnums, setSelectedEnums] = useState<string[]>([])
  const [settings, setSettings] = useState<ColumnSettings>({ filters: [] })

  const isEnum = useMemo(() => column.meta.isEnum === true, [column.meta.isEnum])
  const propType = useMemo(() =>
    typeOf(column.meta.type === "Nullable`1" ? column.meta.genericArgs![0] : column.meta.type)
  , [column.meta.type, column.meta.genericArgs])

  const enumValues = useMemo(() =>
    column.meta.isEnum === true ? asKvps(enumOptions(propType?.name || '')) : []
  , [column.meta.isEnum, propType])

  const filterEntries = useMemo(() =>
    filterRules(column.type)?.map(x => ({ key: x.value, value: x.name })) || []
  , [column.type, definitions])

  useEffect(() => {
    setSettings(Object.assign({}, column.settings, {
      filters: Array.from(column.settings.filters)
    }))
  }, [column.settings])

  useEffect(() => {
    let values = column.settings.filters?.[0]?.value?.split(',') || []
    if (values.length > 0 && propType?.isEnumInt) {
      const flagValue = values[0] && parseInt(values[0]) || 0
      values = propType.enumValues?.filter(x => (flagValue & parseInt(x)) > 0) || []
    }
    setSelectedEnums(values)
  }, [column.settings.filters, propType])

  useEffect(() => {
    txtFilterRef.current?.focus()
  }, [])

  function filterRules(type: string) {
    let c = definitions
    if (!isString(type)) {
      c = c.filter(x => x.types !== 'string')
    }
    return c
  }

  function filterRule(type: string, value: string) {
    return filterRules(type).find(x => x.value === value)
  }

  function addFilter() {
    if (!newQuery) return
    let name = filterRule(column.type, newQuery)?.name
    if (!name) return
    setSettings(prev => ({
      ...prev,
      filters: [...prev.filters, { key: newQuery, name, value: newValue }]
    }))
    setNewQuery('%')
    setNewValue('')
  }

  function removeFilter(index: number) {
    setSettings(prev => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index)
    }))
  }

  function filterValue(filter: Filter) {
    return filterRuleValue(filterRule(column.type, filter.key)!, column.type, filter)
  }

  function done() {
    onDone?.()
  }

  function save() {
    if (newValue) {
      addFilter()
    }
    if (isEnum) {
      let selected = Object.values(selectedEnums).filter(x => x)
      const newSettings = {
        ...settings,
        filters: selected.length > 0
          ? propType?.isEnumInt
            ? [{ key: '%HasAny', name: 'HasAny', value: selected.map(x => parseInt(x)).reduce((acc, x) => acc + x, 0).toString() }]
            : [{ key: '%In', name: 'In', value: selected.join(',') }]
          : []
      }
      onSave?.(newSettings)
    } else {
      onSave?.(settings)
    }
    onDone?.()
  }

  function sort(order?: "ASC" | "DESC") {
    const newSettings = {
      ...settings,
      sort: order === settings.sort ? undefined : order
    }
    setSettings(newSettings)
    setTimeout(() => {
      onSave?.(newSettings)
      onDone?.()
    }, 0)
  }

  const handleEnumChange = (key: string, checked: boolean) => {
    setSelectedEnums(prev =>
      checked
        ? [...prev, key]
        : prev.filter(x => x !== key)
    )
  }

  return (
    <div className="fixed z-20 inset-0 overflow-y-auto" onClick={done}>
      <div className="absolute" style={{ top: `${topLeft.y}px`, left: `${topLeft.x}px` }} onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 right-0 bg-white dark:bg-black border dark:border-gray-800 rounded normal-case text-sm shadow w-80">
          <div className="p-4">
            <h3 className="text-base font-medium mb-3 dark:text-gray-100">Sort</h3>
            <div className="flex w-full justify-center">
              <button
                type="button"
                title="Sort Ascending"
                onClick={() => sort('ASC')}
                className={`${settings.sort === 'ASC' ? 'bg-indigo-100 border-indigo-500' : 'bg-white hover:bg-gray-50 border-gray-300'} mr-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <g fill="currentColor">
                    <path fillRule="evenodd" d="M10.082 5.629L9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999l.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                  </g>
                </svg>
                <span>ASC</span>
              </button>
              <button
                type="button"
                title="Sort Descending"
                onClick={() => sort('DESC')}
                className={`${settings.sort === 'DESC' ? 'bg-indigo-100 border-indigo-500' : 'bg-white hover:bg-gray-50 border-gray-300'} ml-1 inline-flex items-center px-2.5 py-1.5 border shadow-sm text-sm font-medium rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <g fill="currentColor">
                    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
                    <path fillRule="evenodd" d="M10.082 12.629L9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999l.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                  </g>
                </svg>
                <span>DESC</span>
              </button>
            </div>
            <h3 className="text-base font-medium mt-4 mb-2">Filter</h3>
            {isEnum ? (
              <div>
                {enumValues?.map(x => (
                  <div key={x.key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={x.key}
                      value={x.key}
                      checked={selectedEnums.includes(x.key)}
                      onChange={(e) => handleEnumChange(x.key, e.target.checked)}
                      className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={x.key} className="ml-3">{x.value}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {settings.filters.map((filter, index) => (
                  <div key={index} className="mb-2">
                    <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                      {column.name} {filter.name} {filterValue(filter)}
                      <button
                        type="button"
                        onClick={() => removeFilter(index)}
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                      >
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
                <div className="flex">
                  <SelectInput
                    id="filterRule"
                    className="w-32 mr-1"
                    value={newQuery}
                    onChange={setNewQuery}
                    entries={filterEntries}
                    label=""
                  />
                  {filterRule(column.type, newQuery)?.valueType !== 'none' && (
                    <TextInput
                      ref={txtFilterRef}
                      id="filterValue"
                      className="w-32 mr-1"
                      type="text"
                      value={newValue}
                      onChange={(v: any) => setNewValue(v)}
                      label=""
                      placeholder=""
                    />
                  )}
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={addFilter}
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <PrimaryButton onClick={save} color="red" className="ml-2">
              Save
            </PrimaryButton>
            <SecondaryButton onClick={done}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
