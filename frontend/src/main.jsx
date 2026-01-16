import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Profile from './components/Profile/Profile.jsx'
import Store from './components/Store/Store.jsx'
import Mario from './games/Mario.jsx'
import Login from './components/Login'
// import Testing from './components/Test/Testing.jsx'
// import Testing2 from './components/Test/Testing2.jsx'
// import Login from './components/Login.jsx'
// import Home from './components/Home.jsx'
import LandingPage from './components/home/LandingPage'
import WorldDetail from './pages/WorldDetail'
import QuizPage from './pages/QuizPage'
import Worlds from './pages/World'
import ChallengePage from './pages/ChallangePage'
import Leaderboard from './components/LeaderBoard/LeaderBoard'
// import BoardData from './components/LeaderBoard/BoardData'

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
        <Route path="/login/:person" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="world" element={<Worlds />} />
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