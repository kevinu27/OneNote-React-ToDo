import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { drawingMenuActions } from '../store/index'

import './Tabs.css'

function Tabs() {
  
  const tabs = useSelector((state) => state.drawingMenu.tabs)
  const selectedTabIndex = useSelector((state) => state.drawingMenu.selectedTabIndex)
  const dispatch = useDispatch();
  const [tabsLocal, setTabsLocal] = useState(tabs)

  function setActiveTab(tabIndex, tabColor) {
    dispatch(drawingMenuActions.setActiveTab({
      tabIndex: tabIndex,
      tabColor: tabColor
    }))
  };


  function addTab(tab) {
    console.log('adding tab', tab)
    dispatch(drawingMenuActions.addTab(tab))
  };

  const handleInputChange = (event, id) => {
    const newValue = event.target.value;

    const updatedTabs = tabs.map((tab, index) => {
      if (index === id) {
        return { ...tab, tabName: newValue }; // Create a new object with updated tabName
      }
      return tab // Return the existing tab for all others
    });
    dispatch(drawingMenuActions.updateTabName(updatedTabs))
  };

  function getRandomLightColor() {
    // Generate random values for red, green, and blue channels, but keep them in a higher range (180-255) for a light color
    const r = Math.floor(Math.random() * 76) + 180; // 180 to 255
    const g = Math.floor(Math.random() * 76) + 180; // 180 to 255
    const b = Math.floor(Math.random() * 76) + 180; // 180 to 255

    // Convert to a hex string and pad with zeroes if necessary
    const toHex = (value) => value.toString(16).padStart(2, '0');
    console.log('-------', `#${toHex(r)}${toHex(g)}${toHex(b)}`)

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function tabId() {
  const now = new Date();
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0')
  const randomPart = Math.random().toString(36).substring(2, 8)
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}-${randomPart}`;
}

const removingTab = (e, id) => {
  console.log('e en el removing', id)
  dispatch(drawingMenuActions.removeTab(id))
}
  
  return (
    <>
    <div className='tabs'>

    { 
        tabs.map((tab, key) => (
          <div className='tabContainer'
          key={tab.tabId}
          style={{ backgroundColor: tab.tabColor }}>
          <input
            key={tab.tabId}
            type="text" 
            onClick={() => setActiveTab(tab.tabId, tab.tabColor)}
            className={`base-class ${selectedTabIndex === tab.tabId ? 'active-tab' : ''} another-class`}
            placeholder={tab.tabName}
            value={tabsLocal.tabName}
            onChange={(e) => handleInputChange(e, tab.tabId)}
            style={{ backgroundColor: tab.tabColor }}
          />
          <div className='closingTabX'
          style={{ backgroundColor: tab.tabColor }}
          onClick={(e)=>removingTab(e, tab.tabId)}

          > 
          <p> +</p>
          
          </div>
          </div>
        ))
      }
    <p  onClick={()=> addTab(
      
      {
        tabId: tabId(),
        tabName: `new tab ${tabs.length + 1}`,
        tabColor: getRandomLightColor() 
      }
      
      
      )}
      className='addtabButton' >+ </p>
    </div>
    </>
  );
}

export default Tabs
