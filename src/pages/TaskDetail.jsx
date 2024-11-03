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
    <div className="mainCardDetail">
      
      <p>name:{Task.name}</p>
      <p>descripcion:{Task.description}</p>
    </div>
    </>
  )
}

export default TaskDetail
