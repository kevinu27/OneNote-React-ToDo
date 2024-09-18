import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import MainTask from './components/MainTask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app-layout'>

    <Sidebar/>
    <div className='main'>
      <MainTask/>

    </div>
    </div>

    </>
  )
}

export default App
