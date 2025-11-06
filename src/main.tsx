import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './demo/App'
import './tailwind.css'

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
