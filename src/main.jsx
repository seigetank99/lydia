import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const enableClientErrorReporting = import.meta.env.VITE_CLIENT_ERROR_REPORTING === 'true'

if (enableClientErrorReporting) {
  const report = async (payload) => {
    try {
      await fetch('/api/client-error', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      // ignore
    }
  }

  window.addEventListener('error', (event) => {
    report({
      type: 'error',
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    report({
      type: 'unhandledrejection',
      message: String(event.reason?.message || event.reason || ''),
    })
  })
}

const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
