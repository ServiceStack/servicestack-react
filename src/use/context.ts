import { createContext, useContext } from 'react'
import type { JsonServiceClient } from '@servicestack/client'
import type { ApiState, ModalProvider } from '@/types'
import type { useMetadata } from './metadata'

// Context for API state (errors, loading, etc.)
export const ApiStateContext = createContext<ApiState | undefined>(undefined)

// Context for ServiceStack JSON client
export const ClientContext = createContext<JsonServiceClient | undefined>(undefined)

// Context for modal provider (for opening modals like ModalLookup)
export const ModalProviderContext = createContext<ModalProvider | undefined>(undefined)

// Context for metadata utilities from useMetadata hook
export const MetadataContext = createContext<ReturnType<typeof useMetadata> | undefined>(undefined)

/**
 * Hook to access the API state (loading, error) from AutoForm context
 * Use this in child components within AutoForm to access the form's API state
 */
export function useApiState(): ApiState | undefined {
    return useContext(ApiStateContext)
}

/**
 * Hook to access metadata utilities from context
 * Use this in child components to access metadata functions without needing to call useMetadata
 */
export function useMetadataContext(): ReturnType<typeof useMetadata> | undefined {
    return useContext(MetadataContext)
}
