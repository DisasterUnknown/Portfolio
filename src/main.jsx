import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import AppRouter from './router.jsx'

createRoot(document.getElementById('root')).render(<AppRouter />)

// it's "npm run deploy"
