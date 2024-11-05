import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'


import './CanvasMenu.css'

function CanvasMenu() {
  const dispatch = useDispatch();
  const selectedDrawingMenu = useSelector((state) => state.drawingMenu.selectedDrawingMenu);
  const selectedIsDrawing= useSelector((state) => state.drawingMenu.isDrawing);
  const IsDrawing= useSelector((state) => state.drawingMenu.isDrawing);


  // console.log('------........', selectedDrawingMenu)
  // console.log('------........', selectedIsDrawing)

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
  dispatch(drawingMenuActions.saveLocalStorage())
  console.log('local Save')
}


  
  return (
    <>
      <div className='buttons-holder'>
        <button className={`drawing-button  ${IsDrawing ? 'drawing-button-active' : 'drawing-button-inactive'}`} onClick={clickDrawingHandler}> 
          <div className="drawing-button-icon">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit">
                <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            </div>
            <div>Drawing</div>
          </div>
        </button>
      { !IsDrawing ? <> <div className='slider-container'> <input type="range"  min='1' max='15' defaultValue='5' onChange={(e) => onSliderHandler(e)} className='slider'/> </div>
        <button className={`delete-button ${!IsDrawing ? 'delete-button' : 'drawing-button-active'}`} > 
            <div className='deleteButton'>
              <div className='delete-icon'>icon</div> borrar
            </div>
          </button>
          </> : null}
        <button className={`save-button  ${!IsDrawing ? 'save-button ' : 'drawing-button'}`}  onClick={onLocalSaveHandler} > guardar en local</button>
      </div>
    </>
  );
}

export default CanvasMenu
