import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tabsActions } from '../store/index'

import './Tabs.css'

function Tabs() {
  
  const tabs = useSelector((state) => state.tabs.tabs)
  const selectedTabIndex = useSelector((state) => state.tabs.selectedTabIndex)
  console.log('tabs------', tabs)
  const dispatch = useDispatch();
  const [tabsLocal, setTabsLocal] = useState(tabs);
  // let updatedTabs = tabs




  
  function setActiveTab(tabIndex, tabColor) {
    dispatch(tabsActions.setActiveTab({
      tabIndex:tabIndex,
      tabColor: tabColor
    }))
  };

  function addTab(tab) {
    dispatch(tabsActions.addTab(tab))
  };

  const handleInputChange = (event, id) => {
    const newValue = event.target.value;

    const updatedTabs = tabs.map((tab, index) => {
      if (index === id) {
        return { ...tab, tabName: newValue }; // Create a new object with updated tabName
      }
      return tab; // Return the existing tab for all others
    });
    dispatch(tabsActions.updateTabName(updatedTabs))
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

  
  return (
    <>
    <div className='tabs'>

    {
        tabs.map((tab, key) => (
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
        ))
      }
    <p  onClick={()=> addTab(
      
      {
        tabId: tabs.length,
        tabName: `new tab ${tabs.length + 1}`,
        tabColor: getRandomLightColor() 
      }
      
      
      )} >+ </p>
    </div>
    </>
  );
}

export default Tabs
