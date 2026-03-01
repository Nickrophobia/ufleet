import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        style: {
          background: '#0B0F17',
          color: '#F6F7FB',
          border: '1px solid rgba(212, 160, 58, 0.3)',
        },
      }}
    />
  </StrictMode>,
)
