import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()
  
  // Hide footer on mario game page
  const hideFooter = location.pathname === '/mario'

  return (
    <div className='overflow-x-hidden'>
    <AuthProvider>
      {/* <h2 className='bg-red-900'>Hello Sushant</h2> */}
      <Navbar />
      <Outlet />
      {!hideFooter && <Footer />}
    </AuthProvider>
    </div>

  )
}

export default App