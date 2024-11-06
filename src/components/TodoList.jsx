import { useEffect } from 'react'
import './TodoList.css'
import TaskCard from './TaskCard'
import { useSelector , useDispatch} from 'react-redux'
import { todoActions } from '../store/index'
import { NavLink } from 'react-router-dom'



function TodoList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks)
  console.log('tasks--------', tasks)

  useEffect(() => {
    const dataToLoadJSON = localStorage.getItem("Tasks");
    const dataToLoad = JSON.parse(dataToLoadJSON);
    // const TasksFromLocalStorage = dataToLoad?.tasks ?? []
  console.log('dataToLoad-----', dataToLoad)
  // console.log('TasksFromLocalStorage-----', TasksFromLocalStorage)
    dispatch(todoActions.loadLocalStorage(
      dataToLoad  
    ))

  }, []); 



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
