import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Header/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <h2 className='bg-red-900'>Hello Sushant</h2> */}
      <Navbar />
    </>
  )
}

export default App