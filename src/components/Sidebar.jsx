import { useState } from 'react'
import './Sidebar.css'
import { useSelector, useDispatch } from 'react-redux'
import { menuActions } from '../store/index'

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Function to open the sidebar
  const openSidebar = () => {
    setSidebarOpen(((prevState) => !prevState));
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>

<div className='lateral-menu'>

  <div className={`sidebar  ${isSidebarOpen ? 'visible' : 'hidden'}`} id="mySidebar">
    <a href="#" className="menu-item">To Do</a>
    <a href="#" className="menu-item">One Note</a>
  </div>

<div onClick={openSidebar} className="button-sidebar">{isSidebarOpen ? '<' : '>'}</div>

</div>
    </>
  )
}

export default Sidebar
