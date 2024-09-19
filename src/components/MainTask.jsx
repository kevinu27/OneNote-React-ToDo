// import { useState } from 'react'
import './MainTask.css'
import TaskForm from './TaskForm'
import TodoList from './TodoList'

function MainTask() {


  return (
    <>
    <div className='Main-task'>
      <div className='taskForm-holder'>
        <TaskForm/>
      </div>
        <TodoList/>
    </div>
    </>
  )
}

export default MainTask
