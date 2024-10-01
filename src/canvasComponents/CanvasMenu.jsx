import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tabsActions } from '../store/index'

import './CanvasMenu.css'

function CanvasMenu() {
  const selectedTabIndex = useSelector((state) => state.drawingMenu.selectedDrawingMenu);

  console.log('------........', selectedTabIndex)
  


  
  return (
    <>
<h2>canvas menu</h2>
    </>
  );
}

export default CanvasMenu
