import { useMemo } from 'react'
import type { FilterViewsProps } from '@/components/types'
import type { Column, Filter } from '@/types'
import { humanize } from '@servicestack/client'
import { filterRuleValue, isString } from '@/use/metadata'

export default function FilterViews({
  definitions = [],
  columns = [],
  onDone,
  onChange
}: FilterViewsProps & { onDone?: () => void, onChange?: (column: Column) => void }) {

  const columnsWithFilters = useMemo(() =>
    columns.filter(c => c.settings.filters.length > 0)
  , [columns])

  function enumValues(filters: Filter[]) {
    return filters?.[0]?.value?.split(',')
  }

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

  function filterValue(column: Column, filter: Filter) {
    return filterRuleValue(filterRule(column.type, filter.key)!, column.type, filter)
  }

  function removeFilters(column: Column) {
    column.settings.filters = []
    onChange?.(column)
  }

  function removeFilter(column: Column, index: number) {
    column.settings.filters.splice(index, 1)
    onChange?.(column)
  }

  function clearAll() {
    columns.forEach(column => {
      column.settings.filters = []
      onChange?.(column)
    })
    onDone?.()
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 text-sm">
      <div className="flex flex-wrap">
        {columnsWithFilters.map(column => (
          <fieldset key={column.name} className="group pr-4 sm:pr-6 lg:pr-8">
            <legend className="flex justify-between w-full font-medium">
              <span>{humanize(column.name)}</span>
              <span className="w-6 flex justify-end">
                <span className="hidden group-hover:inline">
                  <button
                    onClick={() => removeFilters(column)}
                    title={`Clear all ${humanize(column.name)} filters`}
                    className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-red-600 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                  >
                    <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                      <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                    </svg>
                  </button>
                </span>
              </span>
            </legend>
            {column.meta.isEnum ? (
              <div className="pt-2">
                {enumValues(column.settings.filters)?.map(value => (
                  <div key={value} className="flex items-center">
                    <label className="ml-2">{value}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {column.settings.filters.map((filter: any, index: any) => (
                  <div key={index} className="pt-2">
                    <span className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-indigo-100 text-indigo-700">
                      {column.name} {filter.name} {filterValue(column, filter)}
                      <button
                        type="button"
                        onClick={() => removeFilter(column, index)}
                        className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                      >
                        <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                        </svg>
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </fieldset>
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span>Clear All</span>
        </button>
      </div>
    </div>
  )
}
