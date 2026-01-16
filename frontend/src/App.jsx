import { useState } from 'react'
import './App.css'
import Navbar from './components/Header/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h2 className='bg-red-900'>Hello Sushant</h2> */}
      <Navbar />
      <Footer />
    </>
  )
}

export default App