import React, { useState, useEffect, useMemo, useContext } from 'react'
import type { RefInfo } from '@/types'
import type { LookupInputProps } from './types'
import { Sole, useConfig } from '@/use/config'
import { getPrimaryKey, LookupValues, typeProperties, useMetadata } from '@/use/metadata'
import { isComplexType, scopedExpr } from '@/use/utils'
import { errorResponse, humanize, mapGet, toPascalCase } from '@servicestack/client'
import { ApiStateContext, ClientContext, ModalProviderContext } from '@/use/context'
import Icon from './Icon'

const LookupInput: React.FC<LookupInputProps> = ({
  id: propId,
  status,
  input,
  metadataType,
  value: modelValue,
  className,
  label,
  labelClass,
  help,
  onChange
}) => {
  const { config } = useConfig()
  const { metadataApi, typeOf: getTypeOf, typeProperties: getTypeProperties } = useMetadata()

  const ctx = useContext(ApiStateContext)
  const client = useContext(ClientContext)
  const modalProvider = useContext(ModalProviderContext)

  const [refInfoValue, setRefInfoValue] = useState('')
  const [refPropertyName, setRefPropertyName] = useState('') // debug info

  const id = useMemo(() => propId || input.id, [propId, input.id])
  const useLabel = useMemo(() => label ?? humanize(toPascalCase(id)), [label, id])

  const errorField = useMemo(() =>
    errorResponse.call({ responseStatus: status ?? ctx?.error }, id),
    [status, ctx, id]
  )

  const value = useMemo(() => mapGet(modelValue, id), [modelValue, id])

  const property = useMemo(() =>
    getTypeProperties(metadataType).find(x => x.name.toLowerCase() === id.toLowerCase()),
    [metadataType, id]
  )

  const icon = useMemo(() =>
    getTypeOf(property?.ref?.model)?.icon || config.tableIcon,
    [property, config]
  )

  function withOptions(refInfo: RefInfo | null) {
    return !refInfo
      ? null
      : input.options
      ? Object.assign({}, refInfo, scopedExpr(input.options, {
          input: input,
          $typeFields: getTypeProperties(metadataType).map(x => x.name),
          ...Sole.config.scopeWhitelist
        }))
      : refInfo
  }

  const useRef = useMemo(() =>
    withOptions(property?.ref ??
      (input.type === 'lookup' ? {
        model: metadataType.name,
        refId: getPrimaryKey(metadataType)?.name ?? 'id',
        refLabel: metadataType.properties?.find(x => x.type === 'String' && !x.isPrimaryKey)?.name,
      } as RefInfo : null)),
    [property, input.type, metadataType]
  )

  function lookup(ref: RefInfo) {
    if (!ref) {
      return
    }
    if (modalProvider == null) {
      console.warn('No ModalProvider required by LookupInput')
      return
    }
    modalProvider.openModal({ name: 'ModalLookup', ref }, (refModel: any) => {
      console.debug('openModal', refInfoValue, ' -> ', refModel, LookupValues.setRefValue(ref, refModel), ref)
      if (refModel) {
        const newValue = mapGet(refModel, ref.refId)
        setRefInfoValue(LookupValues.setRefValue(ref, refModel) || newValue)

        const newModel = { ...modelValue }
        newModel[id] = newValue

        onChange?.(newModel)
      }
    })
  }

  function clear() {
    const newModel = { ...modelValue }
    newModel[id] = null
    onChange?.(newModel)
    setRefInfoValue('')
  }

  useEffect(() => {
    async function initialize() {
      const model = modelValue
      if (!modelValue[id]) {
        modelValue[id] = null
      }

      const prop = property
      const refInfo = useRef
      if (!prop || !refInfo) {
        console.warn(`No RefInfo for property '${id}'`)
        return
      }

      let refIdValue = refInfo.selfId == null
        ? mapGet(model, prop.name)
        : mapGet(model, refInfo.selfId)

      const isRefType = isComplexType(refIdValue)
      if (isRefType) {
        refIdValue = mapGet(model, refInfo.refId)
      }
      if (refIdValue == null) {
        setRefInfoValue('')
        return
      }

      // Try to get cached value first
      if (refInfo.refLabel != null) {
        const cachedLabel = LookupValues.getValue(refInfo.model, refIdValue, refInfo.refLabel)
        if (cachedLabel) {
          setRefInfoValue(cachedLabel)
          setRefPropertyName(prop.name)
          return
        }
      }

      const queryOp = metadataApi?.operations.find(x => x.dataModel?.name === refInfo.model)
      console.debug('LookupInput queryOp', queryOp)
      if (queryOp != null) {
        const propValue = mapGet(model, prop.name)
        if (isComplexType(propValue)) return

        setRefInfoValue(`${propValue}`)
        setRefPropertyName(prop.name)

        if (refInfo.refLabel != null) {
          const colModels = getTypeProperties(metadataType).filter(x => x.type === refInfo.model)
          if (!colModels.length) {
            console.warn(`Could not find ${refInfo.model} Property on ${metadataType.name}`)
          }
          const modelValues = colModels.map(x => mapGet(model, x.name)).filter(x => !!x)
          const modelValue = modelValues.length <= 1
            ? modelValues[0]
            : modelValues.find(x => x[refInfo.refId ?? 'id'] === refIdValue)

          if (modelValue != null) {
            let label = mapGet(modelValue, refInfo.refLabel)
            if (label) {
              setRefInfoValue(`${label}`)
              LookupValues.setValue(refInfo.model, refIdValue, refInfo.refLabel, label)
            }
          } else {
            const isComputed = prop.attributes?.some(x => x.name === 'Computed') === true
            if (client && metadataApi) {
              let label = await LookupValues.getOrFetchValue(
                client,
                metadataApi,
                refInfo.model,
                refInfo.refId,
                refInfo.refLabel,
                isComputed,
                refIdValue
              )
              setRefInfoValue(label ? label : `${refInfo.model}: ${refInfoValue}`)
            }
          }
        }
      }
    }

    initialize()
  }, [modelValue, id, property, useRef, metadataApi, client, metadataType, getTypeProperties, value])

  return (
    <div className={`lookup-field ${className || ''}`}>
      <input type="hidden" name={id} value={value || ''} />
      {useLabel && (
        <div className="flex justify-between">
          <label
            htmlFor={id}
            className={`block text-sm font-medium text-gray-700 dark:text-gray-300 ${labelClass ?? ''}`}
          >
            {useLabel}
          </label>
          {value && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 pr-1">{value}</span>
              <button
                onClick={clear}
                type="button"
                title="clear"
                className="mr-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:ring-offset-black"
              >
                <span className="sr-only">Clear</span>
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {useRef && (
        <div className="mt-1 relative">
          <button
            type="button"
            className="lookup flex relative w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onClick={() => lookup(useRef)}
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            <span className="w-full inline-flex truncate">
              <span className="text-blue-700 dark:text-blue-300 flex cursor-pointer">
                <Icon className="mr-1 w-5 h-5" image={icon} />
                <span>{refInfoValue}</span>
              </span>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      )}

      {errorField ? (
        <p className="mt-2 text-sm text-red-500" id={`${id}-error`}>
          {errorField}
        </p>
      ) : help ? (
        <p className="mt-2 text-sm text-gray-500" id={`${id}-description`}>
          {help}
        </p>
      ) : null}
    </div>
  )
}

LookupInput.displayName = 'LookupInput'

export default LookupInput
