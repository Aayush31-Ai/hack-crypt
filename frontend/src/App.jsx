import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h2 className='bg-red-900'>Hello Sushant</h2> */}
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App