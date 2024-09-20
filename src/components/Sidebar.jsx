import { useState } from 'react'
import './Sidebar.css'
import { useSelector, useDispatch } from 'react-redux'
import { menuActions } from '../store/index'

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
  console.log('Active menu del state:--', menu)

  // Function to open the sidebar
  const openSidebar = () => {
    setSidebarOpen(((prevState) => !prevState));
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const clickSelectMenuHandler = (icon) => {
    console.log('ICON', icon)
    dispatch(menuActions.selectActiveMenu(icon))
  };

  return (
    <>

<div className='lateral-menu'>

  <div className={`sidebar  ${isSidebarOpen ? 'visible' : 'hidden'}`} id="mySidebar">
    <a href="#" className="menu-item" onClick={()=>clickSelectMenuHandler('todo')}>To Do</a>
    <a href="#" className="menu-item" onClick={()=>clickSelectMenuHandler('canvas')}>One Note</a>
  </div>

<div onClick={openSidebar} className="button-sidebar">{isSidebarOpen ? '<' : '>'}</div>

</div>
    </>
  )
}

export default Sidebar
