import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todoActions } from '../store/index'
import './TaskForm.css'

function TaskForm() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.todo.tasks)


  const [formVisbility, setFormVisbility] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function clickHandler(e) {
      setFormVisbility( prevVisibility => !prevVisibility)
  }

  function clickSaveHandler(e) {
      dispatch(todoActions.addTask({
        name: name,
        description: description
      }))
      setFormVisbility(false)
  }

  function handleChangeName(event){
      setName(event.target.value)
      }

  function handleChangeDescription(event){
      setDescription(event.target.value)
      }


return (
    <div className='formBox'>
        <div className='formulario'>
        <button onClick={clickHandler}>{!formVisbility ? '+':'-'}</button>

        {
  formVisbility ?    
            <div className='formularioInner'>

                <input  type="text" required value ={name} placeholder='Nombre' onChange={handleChangeName}></input>

                <textarea  type="text" required value ={description} placeholder='Descripción' onChange={handleChangeDescription}></textarea> 

                <button className='saveButton' onClick={clickSaveHandler} >+</button>
            </div> : null
        }
  
        </div>
    </div>
)
}

export default TaskForm
