import { useState } from 'react'
import './Sidebar.css'

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
    <a href="#" className="w3-bar-item w3-button">Link 1</a>
    <a href="#" className="w3-bar-item w3-button">Link 2</a>
    <a href="#" className="w3-bar-item w3-button">Link 3</a>
  </div>

<button onClick={openSidebar} className="button-sidebar">{isSidebarOpen ? '<' : '>'}</button>

</div>
    </>
  )
}

export default Sidebar
