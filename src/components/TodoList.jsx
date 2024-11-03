// import { useState } from 'react'
import './TodoList.css'
import TaskCard from './TaskCard'
import { useSelector } from 'react-redux'
// import { todoActions } from '../store/index'
import { NavLink } from 'react-router-dom'

function TodoList() {
  // const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks)
  console.log('tasks--------', tasks)



  return (
    <>
    <div className='todolist-holder'>
    {tasks.map((task, index) => (

          <TaskCard key={index} task={task}  /> 

        ))}
      {/* <TaskCard/>
      <TaskCard/> */}
    
    </div>
    </>
  )
}

export default TodoList
