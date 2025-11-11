/**
 * Example: Setting up @servicestack/react with React Router
 * 
 * This example shows how to configure the library for use with
 * Vite + React + React Router (or Create React App + React Router)
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { setLinkComponent, PrimaryButton, SecondaryButton } from '@servicestack/react'

// Step 1: Configure the library to use React Router's Link component
setLinkComponent(Link)

// Step 2: Use the components - they will now use React Router for navigation
function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">React Router Example</h1>
      
      {/* These buttons will use React Router's Link component internally */}
      <div className="space-x-2">
        <PrimaryButton href="/">Home</PrimaryButton>
        <SecondaryButton href="/about">About</SecondaryButton>
        <PrimaryButton href="/contact">Contact</PrimaryButton>
      </div>
    </div>
  )
}

function About() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>
      <PrimaryButton href="/">Back to Home</PrimaryButton>
    </div>
  )
}

function Contact() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Contact Page</h1>
      <PrimaryButton href="/">Back to Home</PrimaryButton>
    </div>
  )
}

// Step 3: Set up your React Router as usual
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

