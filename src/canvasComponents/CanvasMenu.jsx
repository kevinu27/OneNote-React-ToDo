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
function onSliderHandler(e) {
  dispatch(drawingMenuActions.setStrokeWidth(e.target.value))
}
function onLocalSaveHandler(e) {
  // dispatch(drawingMenuActions.setStrokeWidth(e.target.value))
  console.log('local Save')
}


  
  return (
    <>
<h2>canvas menu</h2>
<div className='buttons-holder'>
  <button className={`  ${!IsDrawing ? 'drawing-button' : 'drawing-button-active'}`} onClick={clickDrawingHandler}> drawing</button>
  <div> <label >widthSlider </label> <input type="range"  min='1' max='15' defaultValue='5' onChange={(e) => onSliderHandler(e)} /> </div>
  <button className={`  ${!IsDrawing ? 'drawing-button' : 'drawing-button-active'}`} > borrar</button>
  <button className={`  ${!IsDrawing ? 'drawing-button' : 'drawing-button-active'}`}  onClick={onLocalSaveHandler} > guardar en local</button>
</div>

    </>
  );
}

export default CanvasMenu
