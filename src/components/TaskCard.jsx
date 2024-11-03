// import { useState } from 'react'
import './TaskCard.css'
import { useNavigate } from 'react-router-dom'


function TaskCard( props) {
  const navigate = useNavigate()
  const onNavigate = (id) => {
    console.log('Index', id)
    navigate(`/task/${id}`)
  };

  return (
    <>
    <div className='cardContainer'>
      <div>
        <div className='card' onClick={()=>onNavigate(props.task.id)}>
            <p>
            Nombre: {props.task.name }
            </p> 
            <p className='description'>
            Descripcion: {props.task.description }
            </p> 
            </div>
        </div>

        <div className='icon'>
        <button class="button button-icon" onClick={()=>onNavigate(props.task.id)}>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>

        <button class="button button-icon button-delete" onClick={()=>onNavigate(props.task.id)}>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

    </div>
    </>
  )
}

export default TaskCard
