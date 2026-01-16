import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Testing from './components/Test/Testing.jsx'
import Navbar from './components/Header/Navbar.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
  
  )
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)