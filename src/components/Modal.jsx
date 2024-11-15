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
  };


  return (
    <>
      
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <h2>Modal Title</h2>
            <p>This is the modal content.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
   
    </>
  )
}

export default Modal
