import React, { useState, useEffect } from 'react'
import type { ApiPrefs } from '@/types'
import type { QueryPrefsProps } from '@/components/types'
import { useConfig } from '@/use/config'
import ModalDialog from '../ModalDialog'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'

export default function QueryPrefs({
    id = 'QueryPrefs',
    columns,
    prefs: prefsProp,
    maxLimit,
    onDone,
    onSave
}: QueryPrefsProps) {

    const { autoQueryGridDefaults } = useConfig()
    const [prefs, setPrefs] = useState<ApiPrefs>({})

    const allTakes = [10, 25, 50, 100, 250, 500, 1000]

    // Effect equivalent to watchEffect
    useEffect(() => {
        setPrefs(Object.assign({
            take: autoQueryGridDefaults.take,
            selectedColumns: []
        }, prefsProp))
    }, [prefsProp, autoQueryGridDefaults.take])

    function done() {
        onDone?.()
    }

    function save() {
        onSave?.(prefs)
    }

    const handleTakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefs(prev => ({ ...prev, take: parseInt(e.target.value) }))
    }

    const handleAllColumnsClick = () => {
        setPrefs(prev => ({ ...prev, selectedColumns: [] }))
    }

    const handleColumnChange = (columnName: string, checked: boolean) => {
        setPrefs(prev => {
            const currentColumns = prev.selectedColumns || []
            if (checked) {
                return { ...prev, selectedColumns: [...currentColumns, columnName] }
            } else {
                return { ...prev, selectedColumns: currentColumns.filter(c => c !== columnName) }
            }
        })
    }

    return (
        <ModalDialog id={id} onDone={done} sizeClass="w-full sm:max-w-prose">
            <div className="bg-white dark:bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                    <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Query Preferences</h3>

                        <div className="mt-4">
                            <label htmlFor={`${id}-take`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">Results per page</label>
                            <select
                                id={`${id}-take`}
                                value={prefs.take}
                                onChange={handleTakeChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-black border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            >
                                {allTakes
                                    .filter(x => maxLimit == null || x <= maxLimit)
                                    .map(take => (
                                        <option key={take} value={take}>
                                            {take}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mt-4 flex items-center py-4 border-b border-gray-200 dark:border-gray-800">
                            <input
                                type="radio"
                                id={`${id}-allColumns`}
                                onClick={handleAllColumnsClick}
                                checked={(prefs.selectedColumns?.length || 0) === 0}
                                className="focus:ring-indigo-500 h-4 w-4 bg-white dark:bg-black text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-700"
                            />
                            <label className="ml-3 block text-gray-700 dark:text-gray-300" htmlFor={`${id}-allColumns`}>View all columns</label>
                        </div>

                        <div className="mt-4">
                            <div className="pb-2 px-4">
                                <div className="">
                                    {columns.map(c => (
                                        <div key={c.name} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={c.name}
                                                value={c.name}
                                                checked={prefs.selectedColumns?.includes(c.name) || false}
                                                onChange={(e) => handleColumnChange(c.name!, e.target.checked)}
                                                className="h-4 w-4 bg-white dark:bg-black border-gray-300 dark:border-gray-700 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500"
                                            />
                                            <label htmlFor={c.name} className="ml-3">{c.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <PrimaryButton onClick={save} color="red" className="ml-2">
                    Save
                </PrimaryButton>
                <SecondaryButton onClick={done}>
                    Cancel
                </SecondaryButton>
            </div>
        </ModalDialog>
    )
}
