import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { todoActions } from '../store/index'
import './TaskForm.css'

function TaskForm() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks)

    console.log('tasks en el componente', tasks)

  const [formVisbility, setFormVisbility] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  function clickHandler(e) {
      setFormVisbility( prevVisibility => !prevVisibility)
  }

  function clickSaveHandler(e) {
      console.log('click Save')
      // props.save(name, description)
      dispatch(todoActions.addTask({
        name: name,
        description: description
      }))
      setFormVisbility(false)
  }

  function handleChangeName(event){
      setName(event.target.value)
      console.log('name', name )
      }

  function handleChangeDescription(event){
      setDescription(event.target.value)
      console.log('description', description )
      }


return (
    <div className='formBox'>
        <div className='formulario'>
        <button onClick={clickHandler}>+</button>
{
  formVisbility ?    
        <div className='formularioInner'>  

        <label>Nombre</label>
        <input  type="text" required value ={name}  onChange={handleChangeName}></input>

        <label>Descripcion</label>
        <textarea  type="text" required value ={description}  onChange={handleChangeDescription}></textarea> 

        <button className='saveButton' onClick={clickSaveHandler} >guardar tarea</button>
   </div> : null
}
  
        </div>
    </div>
)
}

export default TaskForm
