import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import './TaskDetail.css'

function TaskDetail() {
  const param = useParams()
  console.log('param-----', param.id)
  const tasks = useSelector((state) => state.todo.tasks)
  const task = tasks.filter(task => task.id == param.id)
  const [Task, setTask] = useState(task[0]);
  console.log('tasks-----', tasks)
  console.log('task-----', task[0])

  return (
    <>
    <div className="taskDetail">
      <div className="headerTaskDetail">
        <div className="title-go-back">
          <h2>-</h2>
          <h2>Task Detail</h2>
        </div>
        <div className="edit-button">
          <div>icon</div>
          <div>edit task</div>
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
            icon

            </div>
            <div className="date-text">
              <p>a</p>
              <p>a</p>
            </div>
          </div>

          <div className="createdDue">
          <div className="date-icon">
            icon
            </div>
            <div className="date-text">
              <p>a</p>
              <p>a</p>
            </div>
          </div>
        </div>
        <div class="divider-line2"></div>
        <div className="bottom-card">
          <div className="marginDiv"></div>
          <div className="bottom-card2">
            <div className="comment-icon">
              icon
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
