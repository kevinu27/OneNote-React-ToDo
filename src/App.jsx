import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='app-layout'>

    <Sidebar/>
    <div className='main'>asd</div>
    </div>

    </>
  )
}

export default App
