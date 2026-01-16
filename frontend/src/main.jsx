import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Profile from './components/Profile/Profile.jsx'
import Store from './components/Store/Store.jsx'
import Mario from './games/mario.jsx'
import Login from './components/Login'
import LandingPage from './components/home/LandingPage'
import WorldDetail from './pages/WorldDetail'
import QuizPage from './pages/QuizPage'
import Worlds from './pages/World'
import ChallengePage from './pages/ChallangePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/store' element={<Store />} />
        <Route path='/mario' element={<Mario />} />
        <Route path="/login/:person" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="world" element={<Worlds />} />
          <Route path="/world/:worldId" element={<WorldDetail />} />
          <Route path="/world/:worldId/zone/:zoneId/stage/:stageId" element={<QuizPage />} />
          <Route path="/challenge" element={<ChallengePage />} />

      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)