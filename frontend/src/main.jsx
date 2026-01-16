import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Testing from './components/Test/Testing.jsx'
import Testing2 from './components/Test/Testing2.jsx'
<<<<<<< HEAD
import Profile from './components/Profile/Profile.jsx'
import Store from './components/Store/Store.jsx'
import Mario from './games/mario.jsx'
=======
import Login from './components/Login.jsx'
// import Home from './components/Home.jsx'
import LandingPage from './components/home/LandingPage'
import World from './pages/World'
import WorldDetail from './pages/WorldDetail'
import QuizPage from './pages/QuizPage'
>>>>>>> 64e443612792dba897c217df2ef7cdbd4a84189d

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
<<<<<<< HEAD
        <Route path='/testing' element={<Testing />} />
        <Route path='/testing2' element={<Testing2 />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/store' element={<Store />} />
        <Route path='/mario' element={<Mario />} />
=======
        <Route path="/login/:person" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="world" element={<World />} />
          <Route path="/world/:worldId" element={<WorldDetail />} />
          <Route path="/world/:worldId/zone/:zoneId/stage/:stageId" element={<QuizPage />} />

>>>>>>> 64e443612792dba897c217df2ef7cdbd4a84189d
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)