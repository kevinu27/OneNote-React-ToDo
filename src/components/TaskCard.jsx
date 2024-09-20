// import { useState } from 'react'
import './TaskCard.css'

function TaskCard( props) {


  return (
    <>
    <div className='card'>
    <p>
     Nombre: {props.task.name }
    </p> 
    <p>
     Descripcion: {props.task.description }
    </p> 
    </div>
    </>
  )
}

export default TaskCard
