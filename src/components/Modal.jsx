import { useEffect } from 'react'
import './Modal.css'


import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'


function Modal() {

  const dispatch = useDispatch()
  
  const closeModal = () => {
    console.log('closeModal')
    dispatch(drawingMenuActions.closeModal(
      false
    ))
    //funcion que elimina
  };


  return (
    <>
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2>Eliminar</h2>
            <p>¿Estás de que quieres eliminar esta imagen?</p>
            <button onClick={closeModal}>Eliminar</button>
          </div>
        </div> 
    </>
  )
}

export default Modal
