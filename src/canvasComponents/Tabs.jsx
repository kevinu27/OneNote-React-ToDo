import { useState, useRef, useEffect  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tabsActions } from '../store/index'

import './Tabs.css'

function Tabs() {
  const tabs = useSelector((state) => state.tabs.tabs)
  const selectedTabIndex = useSelector((state) => state.tabs.selectedTabIndex)
  console.log('tabs------', tabs)
  const dispatch = useDispatch();
  
  function setActiveTab(tab) {
    console.log('clickedtab', tab)
    dispatch(tabsActions.setActiveTab(tab))
  };

  function addTab(tab) {
    console.log('addTab', tab)
    dispatch(tabsActions.addTab(tab))
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
            value={`${tab.tabName} ${tab.tabId}`} // Set input's value
          />
        ))
      }
    <p  onClick={()=> addTab(
      
      {
        tabId: tabs.length,
        tabName: "new tab"
    }
      
      
      )} >+ </p>
    </div>
    </>
  );
}

export default Tabs
