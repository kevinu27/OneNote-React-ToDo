import { useEffect } from 'react'
import './Modal.css'


import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'


function Modal({ removePicture , index}) {

  const dispatch = useDispatch()
  
  const closeModal = () => {
    console.log('closeModal----index', index)
    dispatch(drawingMenuActions.closeModal(
      false
    ))
    removePicture(index)
    //funcion que elimina
  }
  const escapeModal = () => {
    console.log('escapeModal----')
    dispatch(drawingMenuActions.closeModal(
      false
    ))    
  }


  return (
    <>
        <div className="modal-overlay" onClick={escapeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2>Eliminar</h2>
            <p>{index}</p>
            <p>¿Estás de que quieres eliminar esta imagen?</p>
            <button onClick={closeModal}>Eliminar</button>
          </div>
        </div> 
    </>
  )
}

export default Modal
