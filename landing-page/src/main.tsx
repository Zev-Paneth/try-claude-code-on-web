import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppHebrew from './AppHebrew.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppHebrew />
  </StrictMode>,
)
