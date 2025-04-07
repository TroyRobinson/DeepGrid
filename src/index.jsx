import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app.jsx'

const rootElement = document.getElementById('root')
if (rootElement != null) {
  const root = createRoot(rootElement)
  root.render(<App />)
}
