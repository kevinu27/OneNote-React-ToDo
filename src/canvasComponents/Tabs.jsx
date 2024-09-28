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



  
  function setActiveTab(tab) {
    dispatch(tabsActions.setActiveTab(tab))
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

  
  return (
    <>
    <div className='tabs'>

    {
        tabs.map((tab, key) => (
          <input
            key={tab.tabId}
            type="text" 
            onClick={() => setActiveTab(tab.tabId)}
            className={`base-class ${selectedTabIndex === tab.tabId ? 'active-tab' : ''} another-class`}
            placeholder={tab.tabName}
            value={tabsLocal.tabName}
            onChange={(e) => handleInputChange(e, tab.tabId)}
          />
        ))
      }
    <p  onClick={()=> addTab(
      
      {
        tabId: tabs.length,
        tabName: `new tab ${tabs.length + 1}`
    }
      
      
      )} >+ </p>
    </div>
    </>
  );
}

export default Tabs
