import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='overflow-x-hidden'>
    <AuthProvider>
      {/* <h2 className='bg-red-900'>Hello Sushant</h2> */}
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
    </div>

  )
}

export default App