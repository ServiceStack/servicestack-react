import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './demo/App'
import './tailwind.css'
import { setDefaultFormats } from './use/formatters'

// Initialize date formatting with Australian locale
const browserLocale = 'en-AU' // Force Australian date format (DD/MM/YYYY)

console.log('Using locale:', browserLocale)

setDefaultFormats({
  locale: browserLocale, // Australian locale for DD/MM/YYYY date format
  date: {
    method: "Intl.DateTimeFormat",
    options: "{dateStyle:'medium'}"
  }
})

// Initialize dark mode from localStorage
const colorScheme = localStorage.getItem('color-scheme')
console.log('Initial color-scheme from localStorage:', colorScheme)
console.log('HTML classList before:', document.documentElement.classList.toString())

if (colorScheme === 'dark') {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

console.log('HTML classList after:', document.documentElement.classList.toString())

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
