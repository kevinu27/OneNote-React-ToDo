import { useState } from 'react'
import './Sidebar.css'
import { useSelector, useDispatch } from 'react-redux'
import { menuActions } from '../store/index'
import { NavLink } from 'react-router-dom'

const menuBotons = [
  {
    name: 'todo'

  },
  {
    name: 'canvas'

  }

]

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.activeMenu)

  // Function to open the sidebar
  const openSidebar = () => {
    setSidebarOpen(((prevState) => !prevState));
  };

  // Function to close the sidebar
  // const closeSidebar = () => {
  //   setSidebarOpen(false);
  // };

  const clickSelectMenuHandler = (icon) => {
    console.log('ICON', icon)
    dispatch(menuActions.selectActiveMenu(icon))
  };

  return (
    <>
<div className='side-bar-app'>
<div className='lateral-menu'>

  <div className={`sidebar  ${isSidebarOpen ? 'visible' : 'hidden'}`} id="mySidebar">
    <div className='links'>
      <NavLink
      to='/'
      className={({isActive}) => (isActive ? 'activeLink' : 'inactiveLink')}
      onClick={()=>clickSelectMenuHandler('canvas')}
      end
      >One Note</NavLink>

      <NavLink
      to='/tasks'
      className={({isActive}) => (isActive ? 'activeLink' : 'inactiveLink')}
      onClick={()=>clickSelectMenuHandler('todo')}
      >To Do</NavLink>
    </div>
 

  </div>

<div onClick={openSidebar} className="button-sidebar">{isSidebarOpen ? '<' : '>'}</div>

</div>
</div>
    </>
  )
}

export default Sidebar
