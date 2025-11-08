import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { JsonServiceClient } from '@servicestack/client'
import { ClientContext } from '../use/context'
import { loadMetadata } from '../use/metadata'
import { authContext } from '../use/auth'
import { Authenticate } from '../demo/dtos'

// Create a JsonServiceClient instance for the gallery
//const client = new JsonServiceClient('https://blazor-gallery.jamstacks.net')
const client = new JsonServiceClient('https://blazor-gallery.servicestack.net')

loadMetadata({ client })

// Authenticate on load
const authCts = authContext()
client.api(new Authenticate({ provider: 'credentials', userName: 'admin@email.com', password: 'p@55wOrd' }))
  .then(r => {
    if (r.response) {
      authCts.signIn(r.response)
    }
  })

interface GalleryProviderProps {
  children: ReactNode
}

export function GalleryProvider({ children }: GalleryProviderProps) {
  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}

export { client }

