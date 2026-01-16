import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Testing from './components/Test/Testing.jsx'
import Testing2 from './components/Test/Testing2.jsx'
import Profile from './components/Profile/Profile.jsx'
import Store from './components/Store/Store.jsx'
import Mario from './games/mario.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='/testing' element={<Testing />} />
        <Route path='/testing2' element={<Testing2 />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/store' element={<Store />} />
        <Route path='/mario' element={<Mario />} />
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)