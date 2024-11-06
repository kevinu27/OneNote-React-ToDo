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
      className={({isActive}) => (isActive ? 'generalLink activeLink' : 'generalLink inactiveLink')}
      onClick={()=>clickSelectMenuHandler('canvas')}
      end
      >
          <div className='icon-sidebar'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="3" width="16" height="18" rx="2" ry="2" fill="#3B82F6" opacity="0.2"/>
            <circle cx="7" cy="5" r="1" fill="#3B82F6"/>
            <circle cx="12" cy="5" r="1" fill="#3B82F6"/>
            <circle cx="17" cy="5" r="1" fill="#3B82F6"/>
            <rect x="6" y="9" width="12" height="1.5" fill="#3B82F6"/>
            <rect x="6" y="12" width="12" height="1.5" fill="#3B82F6"/>
            <rect x="6" y="15" width="12" height="1.5" fill="#3B82F6"/>
          </svg>
          </div>
          <div>One Note</div>
        
        </NavLink>

      <NavLink
      to='/tasks'
      className={({isActive}) => (isActive ? 'generalLink activeLink' : 'generalLink inactiveLink')}
      onClick={()=>clickSelectMenuHandler('todo')}
      >     
        <div className='icon-sidebar'>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="4" height="4" rx="1" fill="#3B82F6"/>
          <rect x="3" y="10" width="4" height="4" rx="1" fill="#3B82F6"/>
          <rect x="3" y="17" width="4" height="4" rx="1" fill="#3B82F6"/>
          <rect x="9" y="4" width="12" height="2" fill="#3B82F6"/>
          <rect x="9" y="11" width="12" height="2" fill="#3B82F6"/>
          <rect x="9" y="18" width="12" height="2" fill="#3B82F6"/>
        </svg>
        </div>
        <div>To do</div>
    </NavLink>
    </div>
 

  </div>

<div onClick={openSidebar} className="button-sidebar">{isSidebarOpen ? '<' : '>'}</div>

</div>
</div>
    </>
  )
}

export default Sidebar
