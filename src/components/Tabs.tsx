import { useState, useEffect, useMemo } from 'react'
import type { TabsProps } from '@/components/types'
import { humanize, queryString, rightPart } from '@servicestack/client'
import { pushState } from '@/use/utils'

export default function Tabs({
  id = 'tabs',
  tabs,
  selected: initialSelected,
  param = 'tab',
  label: labelFn,
  tabClass,
  bodyClass = 'p-4',
  url = true,
  clearQuery = false
}: TabsProps) {
  const tabNames = useMemo(() => Object.keys(tabs), [tabs])
  const label = (tab: string) => labelFn ? labelFn(tab) : humanize(tab)
  const [selected, setSelected] = useState<string>('')

  function select(tab: string) {
    setSelected(tab)
    if (url) {
      const firstTab = tabNames[0]
      pushState({ tab: tab === firstTab ? undefined : tab }, clearQuery)
    }
  }

  function isSelected(tab: string) {
    return selected === tab
  }

  const width = useMemo(() => `${100 / Object.keys(tabs).length}%`, [tabs])

  useEffect(() => {
    let initialTab = initialSelected || Object.keys(tabs)[0]
    if (url) {
      const search = location.search ? location.search : location.hash.includes('?') ? '?' + rightPart(location.hash, '?') : ''
      let qs = queryString(search)
      const tab = qs[param]
      if (tab) {
        initialTab = tab
      }
    }
    setSelected(initialTab)
  }, [initialSelected, tabs, url, param])

  const SelectedComponent = selected ? tabs[selected] : null

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor={id} className="sr-only">Select a tab</label>
        <select
          id={id}
          name={id}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => select(e.target.value)}
          value={selected}
        >
          {tabNames.map(tab => (
            <option key={tab} value={tab}>{label(tab)}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabNames.map(tab => (
              <a
                key={tab}
                href="#"
                onClick={(e) => { e.preventDefault(); select(tab); }}
                style={{ width }}
                className={
                  !isSelected(tab)
                    ? `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-center border-b-2 font-medium text-sm ${tabClass || ''}`
                    : `border-indigo-500 text-indigo-600 py-4 px-1 text-center border-b-2 font-medium text-sm ${tabClass || ''}`
                }
              >
                {label(tab)}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className={bodyClass}>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </div>
  )
}
