import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'


import './CanvasMenu.css'

function CanvasMenu() {
  const dispatch = useDispatch();
  const selectedDrawingMenu = useSelector((state) => state.drawingMenu.selectedDrawingMenu);
  const selectedIsDrawing= useSelector((state) => state.drawingMenu.isDrawing);
  const IsDrawing= useSelector((state) => state.drawingMenu.isDrawing);


  console.log('------........', selectedDrawingMenu)
  console.log('------........', selectedIsDrawing)

  function clickDrawingHandler(e) {
    dispatch(drawingMenuActions.setIsDrawing({
      name: selectedIsDrawing,
      description: selectedIsDrawing
    }))

}


  
  return (
    <>
<h2>canvas menu</h2>
<button className={`  ${!IsDrawing ? 'drawing-button' : 'drawing-button-active'}`} onClick={clickDrawingHandler}> drawing</button>
    </>
  );
}

export default CanvasMenu
