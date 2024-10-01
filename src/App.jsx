import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import MainTask from './components/MainTask'
import Canvas from './canvasComponents/Canvas'
import Tabs from './canvasComponents/Tabs'
import CanvasMenu from './canvasComponents/CanvasMenu'


import { useSelector } from 'react-redux'


function App() {
  const [count, setCount] = useState(0)
  const menu = useSelector((state) => state.menu.activeMenu)
  // console.log('menu-----', menu)

  return (
    <>
    <div className='app-layout'>
    <div className='side-bar-app'>
    <Sidebar/>
    </div>

    <div className='main'>
      {
        menu == 'todo' ? <MainTask/> : null
      }

      <div className='canvas-layout'>
      
      {
        menu == 'canvas' ? <CanvasMenu/> : null
      }
                  {
        menu == 'canvas' ? <Tabs/> : null
      }
            {
        menu == 'canvas' ? <Canvas/> : null
      }
      </div>

    </div>
    </div>

    </>
  )
}

export default App
