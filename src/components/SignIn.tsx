import React, { useState, useMemo, useEffect, useContext } from 'react'
import type { JsonServiceClient } from '@servicestack/client'
import type { AppMetadata, AuthenticateResponse, InputInfo, MetaAuthProvider } from '@/types'
import type { SignInProps } from '@/components/types'
import { ApiResult, each, toPascalCase } from '@servicestack/client'
import { useAuth } from '@/use/auth'
import { useClient } from '@/use/client'
import { useMetadata } from '@/use/metadata'
import { ClientContext, ApiStateContext } from '@/use/context'
import ErrorSummary from './ErrorSummary'
import AutoFormFields from './AutoFormFields'
import PrimaryButton from './PrimaryButton'
import Icon from './Icon'

/**
 * SignIn component for authenticating users with ServiceStack Auth.
 *
 * The component provides ApiStateContext to all child components, allowing them to access
 * the authentication loading and error state using the `useApiState()` hook.
 *
 * @example
 * ```tsx
 * // In a child component within SignIn:
 * import { useApiState } from '@servicestack/react'
 *
 * function CustomAuthField() {
 *   const apiState = useApiState()
 *
 *   if (apiState?.loading) {
 *     return <div>Authenticating...</div>
 *   }
 *
 *   if (apiState?.error) {
 *     return <div>Error: {apiState.error.message}</div>
 *   }
 *
 *   return <div>Auth field content</div>
 * }
 * ```
 */
const SignIn: React.FC<SignInProps> = ({
  provider: initialProvider,
  title = "Sign In",
  className,
  tabs = true,
  oauth = true,
  onLogin
}) => {
  const { getMetadata, createDto } = useMetadata()
  const client = useClient()
  const serviceClient = useContext(ClientContext)
  const { signIn } = useAuth()

  const server = getMetadata({ assert: true }) as AppMetadata
  const plugin = server.plugins.auth

  const baseUri = typeof document !== 'undefined' ? document.baseURI : ''
  const baseUrl = server.app.baseUrl

  const [modelValue, setModelValue] = useState(() => createDto("Authenticate"))
  const [api, setApi] = useState(new ApiResult())
  const [selectedProvider, setSelectedProvider] = useState(initialProvider)

  // Initialize form fields on mount
  useEffect(() => {
    plugin?.authProviders.map(x => x.formLayout).filter(x => x)
      .forEach(formLayout => formLayout.forEach(input => {
        setModelValue(prev => ({
          ...prev,
          [input.id]: input.type === 'checkbox' ? false : ''
        }))
      }))
  }, [plugin])

  const formLayouts = useMemo(() =>
    plugin?.authProviders.filter(x => x.formLayout) || [],
    [plugin]
  )

  const firstFormLayout = useMemo(() =>
    formLayouts[0] || {},
    [formLayouts]
  )

  const lastFormLayout = useMemo(() =>
    formLayouts[Math.max(formLayouts.length - 1, 0)] || {},
    [formLayouts]
  )

  const authProvider = useMemo(() => {
    return (selectedProvider
      ? plugin?.authProviders.find(x => x.name === selectedProvider)
      : null) ?? firstFormLayout
  }, [selectedProvider, plugin, firstFormLayout])

  const isFalse = (v?: boolean | "false") => v === false || v === "false"

  const getLabel = (provider: MetaAuthProvider) => {
    return provider.label || (provider.navItem && provider.navItem.label)
  }

  const formLayout = useMemo(() =>
    ((authProvider as any)?.formLayout || []).map((input: InputInfo) =>
      Object.assign({}, input, {
        type: input.type?.toLowerCase(),
        autoComplete: input.autocomplete || (input.type?.toLowerCase() === 'password' ? 'current-password' : undefined)
          || (input.id.toLowerCase() === 'username' ? 'username' : undefined),
        css: Object.assign({ field: 'col-span-12' }, input.css)
      })),
    [authProvider]
  )

  const oauthProviders = useMemo(() =>
    isFalse(oauth) ? [] : plugin?.authProviders.filter(x => x.type === 'oauth') || [],
    [oauth, plugin]
  )

  const authProviderFormTabs = useMemo(() => {
    let ret = each(plugin?.authProviders.filter(x => x.formLayout && x.formLayout.length > 0),
      (acc, x) => {
        let label = getLabel(x) || toPascalCase(x.name)
        acc[label] = x.name === (firstFormLayout as any).name ? '' : x.name
      })
    const auth = authProvider as any
    if (auth && isFalse(tabs)) {
      ret = { [getLabel(auth) || toPascalCase(auth.name)]: auth }
    }
    return ret
  }, [plugin, authProvider, tabs, firstFormLayout])

  const errorSummary = useMemo(() => {
    let except = formLayout.map((input: InputInfo) => input.id).filter((x: string) => x)
    return api.summaryMessage(except)
  }, [api, formLayout])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const authProviderName = (authProvider as any).name
    let requestDto = { ...modelValue }
    requestDto.provider = authProviderName

    if (authProviderName === 'authsecret') {
      serviceClient?.headers.set("authsecret", modelValue.authsecret)
      requestDto = createDto("Authenticate")
    } else if (authProviderName === 'basic') {
      serviceClient?.setCredentials(modelValue.UserName, modelValue.Password)
      requestDto = createDto("Authenticate")
      requestDto.UserName = null
      requestDto.Password = null
    } else if ((authProvider as any).type === 'Bearer' || authProviderName === 'jwt') {
      serviceClient!.bearerToken = modelValue.BearerToken
      requestDto = createDto("Authenticate")
    }

    const apiResult = await client.api(requestDto)
    setApi(apiResult)

    if (apiResult.succeeded) {
      const response = apiResult.response as AuthenticateResponse
      signIn(response)
      onLogin?.(response)
      setApi(new ApiResult())
      setModelValue(createDto("Authenticate"))
    }
  }

  if (!plugin) {
    return <div>No Auth Plugin</div>
  }

  return (
    <ApiStateContext.Provider value={client}>
      <div className={`min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 ${className || ''}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
          {title}
        </h2>
        {Object.keys(authProviderFormTabs).length > 1 && (
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
              {Object.entries(authProviderFormTabs).map(([name, tab]) => (
                <a
                  key={name}
                  href={`?provider=${tab}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedProvider(tab as string)
                  }}
                  className={`${
                    tab === '' || tab === (lastFormLayout as any).name ? 'rounded-l-md' :
                    tab === (lastFormLayout as any).name ? 'rounded-r-md -ml-px' : '-ml-px'
                  } ${
                    selectedProvider === tab ? 'z-10 outline-none ring-1 ring-indigo-500 border-indigo-500' : ''
                  } cursor-pointer relative inline-flex items-center px-4 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900`}
                >
                  {name}
                </a>
              ))}
            </span>
          </p>
        )}
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {errorSummary && (
          <div className="mb-3">
            <ErrorSummary status={api.error} />
          </div>
        )}
        <div className="bg-white dark:bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {formLayout.length > 0 && (
            <form onSubmit={handleSubmit}>
              <AutoFormFields
                value={modelValue}
                formLayout={formLayout}
                api={api}
                hideSummary={true}
                onChange={setModelValue}
              />
              <div className="mt-8">
                <PrimaryButton type="submit" className="w-full">
                  Sign In
                </PrimaryButton>
              </div>
            </form>
          )}

          {oauthProviders.length > 0 && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {oauthProviders.map((provider) => (
                  <div key={provider.name}>
                    <a
                      href={`${baseUrl}${provider.navItem.href}?continue=${baseUri}`}
                      title={getLabel(provider)}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-black text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      {provider.icon ? (
                        <Icon image={provider.icon} className="h-5 w-5 text-gray-700 dark:text-gray-200" />
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-700 dark:text-gray-200"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 32 32"
                        >
                          <path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" fill="currentColor" />
                          <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor" />
                        </svg>
                      )}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </ApiStateContext.Provider>
  )
}

export default SignIn
