import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SignIn } from './screen/signin.tsx'
import './global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
