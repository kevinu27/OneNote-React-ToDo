import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import './TaskDetail.css'

function TaskDetail() {
  const param = useParams()
  console.log('param-----', param.id)
  const tasks = useSelector((state) => state.todo.tasks)
  const task = tasks.filter(task => task.id == param.id)
  const [Task, setTask] = useState(task[0]);
  const navigate = useNavigate()
  console.log('tasks-----', tasks)
  console.log('task-----', task[0])

  function onGoback(e) {
    console.log('goback----')
    navigate(`/tasks`)

  }

  return (
    <>
    <div className="taskDetail">
      <div className="headerTaskDetail">
        <div className="title-go-back">
          <div className="back-arrow" onClick={onGoback}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          </div>
          <h2>Task Detail</h2>
        </div>
        <div className="edit-button">
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          </div>
          <div>Edit Task</div>
        </div>
      </div>
    

      <div className="mainCardDetail">
        <div className="cardUpper">
          <p className="taskName">{Task.name}</p>

          <div className="status-buttons">
            {/* pending, in progress, etc */}
          </div>
        </div>

        <div class="divider-line"></div>
        <div className="cardLower">
        <p className="taskDescripcion">descripcion</p>
        <p  className="taskDescripcionValue">{Task.description}</p>
        </div>

        <div className="cardDates">
          <div className="createdDate">
            <div className="date-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="#666" stroke-width="2"/>

                <line x1="3" y1="9" x2="21" y2="9" stroke="#666" stroke-width="2"/>

                <line x1="7" y1="2" x2="7" y2="5" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                <line x1="17" y1="2" x2="17" y2="5" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                </svg>

            </div>
            <div className="date-text">
              <p>Creado</p>
              <p className="dateDate"> aqui va la fecha de creacion</p>
            </div>
          </div>

          <div className="createdDue">
          <div className="date-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#666" stroke-width="2" fill="none"/>

              <line x1="12" y1="12" x2="12" y2="7" stroke="#666" stroke-width="2" stroke-linecap="round"/>

              <line x1="12" y1="12" x2="15" y2="12" stroke="#666" stroke-width="2" stroke-linecap="round"/>
            </svg>
            </div>
            <div className="date-text">
              <p>fecha creacion</p>
              <p className="dateDate">aqui va la fecha de creacion</p>
            </div>
          </div>
        </div>
        <div class="divider-line2"></div>
        <div className="bottom-card">
          <div className="marginDiv"></div>
          <div className="bottom-card2">
            <div className="comment-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             
              <rect x="3" y="3" width="20" height="16" rx="3" stroke="#666" stroke-width="2" fill="none"/>

              <path d="M7 20 L7 28 L10 20" stroke="#666" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>
            </div>
            <textarea  type="text" required  placeholder='Añadr comentario...'></textarea> 
          </div>
        </div>


      </div>
    </div>
    </>
  )
}

export default TaskDetail
