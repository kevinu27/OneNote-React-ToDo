
import { useState } from 'react'

import './CanvasPage.css'
import MainTask from './../components/MainTask'
import Canvas from './../canvasComponents/Canvas'
import Tabs from './../canvasComponents/Tabs'
import CanvasMenu from './../canvasComponents/CanvasMenu'
import { useSelector } from 'react-redux'


function CanvasPage() {
  const menu = useSelector((state) => state.menu.activeMenu)


  return (
    <>
      <div className='app-layout'>

          <div className='main'>
            <div className='canvas-layout'>
              <CanvasMenu/>
              <Tabs/> 
              <Canvas/> 
            </div>
          </div>
      </div>
    </>
  )
}

export default CanvasPage
