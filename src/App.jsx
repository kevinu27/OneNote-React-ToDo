import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar'
import MainTask from './components/MainTask'
import Canvas from './canvasComponents/Canvas'
import Tabs from './canvasComponents/Tabs'
import CanvasMenu from './canvasComponents/CanvasMenu'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import { useSelector } from 'react-redux'
import RootLayout from './RootLayout'
import CanvasPage from './pages/CanvasPage'
import TaskDetail from './pages/TaskDetail'


function App() {
  const menu = useSelector((state) => state.menu.activeMenu)
  // console.log('menu-----', menu)
  const router = createBrowserRouter([  // Note the array brackets here
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        { path: '/', element: <CanvasPage/> },
        { path: '/tasks', element: <MainTask/> },
        { path: '/task/:id', element: <TaskDetail/> },
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router} />

    {/* <div className='app-layout'>
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
    </div> */}

    </>
  )
}

export default App
