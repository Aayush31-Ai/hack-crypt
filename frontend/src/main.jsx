import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
// import Home from './components/Home.jsx'
import LandingPage from './components/home/LandingPage'
import World from './pages/World'
import WorldDetail from './pages/WorldDetail'
import QuizPage from './pages/QuizPage'
import Leaderboard from './components/LeaderBoard/LeaderBoard'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route path="/login/:person" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="world" element={<World />} />
        <Route path="/world/:worldId" element={<WorldDetail />} />
        <Route path="/world/:worldId/zone/:zoneId/stage/:stageId" element={<QuizPage />} />
        <Route path='/leaderboard' element={<Leaderboard />} />

      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)