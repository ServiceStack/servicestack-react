import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './tailwind.css'
import App from './demo/App'
import { ClientContext } from './use/client'
import { JsonApiClient } from '@servicestack/client'

const colorScheme = localStorage.getItem('color-scheme')
if (colorScheme === 'dark') {
    document.querySelector('html')?.classList.add('dark')
} else {
    document.querySelector('html')?.classList.remove('dark')
}

const client = JsonApiClient.create('http://localhost:5000')

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientContext.Provider value={client}>
        <App />
      </ClientContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)
