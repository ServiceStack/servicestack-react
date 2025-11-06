import type { ApiRequest, IReturn, IReturnVoid, ApiState, IResponseError, IResponseStatus } from "@/types"
import type { JsonServiceClient } from "@servicestack/client"
import { useState, useContext, useEffect, useRef as useReactRef } from "react"
import { ResponseError, ResponseStatus, ApiResult } from "@servicestack/client"
import { unRefs, swrApi, fromCache, swrCacheKey, createDebounce } from "./utils"
import { ClientContext } from "./context"

export function useClient(use?:JsonServiceClient) {
    /** Maintain loading state whilst API Request is in transit */
    const [loading, setLoading] = useState(false)
    /** Maintain API Error in reactive state */
    const [error, setError] = useState<ResponseStatus | undefined>()
    const [response, setResponse] = useState<any>()
    const contextClient = useContext(ClientContext)
    const client = use ?? contextClient!

    /** Set error state with summary or field validation error */
    function setErrorState({ message, errorCode, fieldName, errors }: IResponseStatus) {
        if (!errorCode) errorCode = 'Exception'
        if (!errors) errors = []
        const newError = fieldName
            ? new ResponseStatus({
                errorCode, message,
                errors: [new ResponseError({ fieldName, errorCode, message })]
            })
            : new ResponseStatus({ errorCode, message, errors } as any)
        setError(newError)
        return newError
    }

    /** Add field error to API error state */
    function addFieldError({ fieldName, message, errorCode }: IResponseError) {
        if (!errorCode) errorCode = 'Exception'
        setError(prevError => {
            if (!prevError) {
                return new ResponseStatus({
                    errorCode, message,
                    errors: [new ResponseError({ fieldName, errorCode, message })]
                })
            } else {
                let copy = new ResponseStatus(prevError)
                copy.errors = [...(copy.errors || []).filter(x => x.fieldName?.toLowerCase() !== fieldName?.toLowerCase()),
                    new ResponseError({ fieldName, message, errorCode })]
                return copy
            }
        })
    }

    /** Send a typed API request and return results in an ApiResult<TResponse> */
    async function api<TResponse>(request:IReturn<TResponse> | ApiRequest, args?:any, method?:string) {
        setLoading(true)
        let api = await client.api<TResponse>(unRefs(request), args, method)
        setLoading(false)
        setResponse(api.response)
        setError(api.error)
        return api
    }

    /** Send a typed API request and return empty response in a void ApiResult */
    async function apiVoid(request:IReturnVoid | ApiRequest, args?:any, method?:string) {
        setLoading(true)
        let api = await client.apiVoid(unRefs(request), args, method)
        setLoading(false)
        setResponse(api.response)
        setError(api.error)
        return api
    }

    /** Send a FormData API request and return results in an ApiResult<TResponse> */
    async function apiForm<TResponse>(request: IReturn<TResponse> | ApiRequest, body: FormData, args?: any, method?: string) {
        setLoading(true)
        let api = await client.apiForm<TResponse>(unRefs(request), body, args, method)
        setLoading(false)
        setResponse(api.response)
        setError(api.error)
        return api
    }

    /** Send a FormData API request and return empty response in a void ApiResult */
    async function apiFormVoid(request: IReturnVoid | ApiRequest, body: FormData, args?: any, method?: string) {
        setLoading(true)
        let api = await client.apiFormVoid(unRefs(request), body, args, method)
        setLoading(false)
        setResponse(api.response)
        setError(api.error)
        return api
    }

    async function swr<TResponse>(request:IReturn<TResponse> | ApiRequest, fn:(r:ApiResult<TResponse>) => void, args?: any, method?: string) {
        return swrApi(client, request, fn, args, method)
    }

    function swrEffect<TResponse>(requestFn: () => IReturn<TResponse> | ApiRequest,
            options?:{ args?:any, method?:string, delayMs?:number }) {
        const [api, setApi] = useState(new ApiResult<TResponse>())
        const debounceApi = useReactRef(createDebounce(async (request:IReturn<TResponse> | ApiRequest) => {
            const result = await client.api(request)
            setApi(result)
        }, options?.delayMs))

        useEffect(() => {
            const request = requestFn()
            const cachedResponse = fromCache(swrCacheKey(request))
            if (cachedResponse) {
                setApi(new ApiResult({ response: cachedResponse }))
            }
            if (options?.delayMs === 0) {
                client.api(request).then(result => setApi(result))
            } else {
                debounceApi.current(request)
            }
        }, [requestFn, options?.args, options?.method, options?.delayMs])

        // Initial fetch
        useEffect(() => {
            client.api(requestFn(), options?.args, options?.method).then(result => setApi(result))
        }, [])

        return api
    }

    const ctx:ApiState = { setError: setErrorState, addFieldError, loading, error, api, apiVoid, apiForm, apiFormVoid, swr, swrEffect, unRefs }
    return ctx
}
