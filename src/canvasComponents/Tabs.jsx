import { useState, useRef, useEffect  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tabsActions } from '../store/index'

import './Tabs.css'

function Tabs() {
  const tabs = useSelector((state) => state.tabs.tabs)
  const selectedTabIndex = useSelector((state) => state.tabs.selectedTabIndex)
  console.log('tabs------', tabs)
  console.log('selectedTabIndex------', selectedTabIndex)
  const dispatch = useDispatch();
  

  function setActiveTab(tab) {
    console.log('clickedtab', tab)
    dispatch(tabsActions.addTab(tab))

  };

  
  return (
    <>
    <div className='tabs'>

    {
      tabs.map((tab, key) => <p key={tab.tabId} onClick={()=> setActiveTab(tab.tabId)} 
      className={`base-class ${selectedTabIndex === tab.tabId ? 'active-tab' : ''} another-class`}
      > {tab.tabName} {tab.tabId} {tab.tabId} </p>)
   
    }
    <p >+</p>
    </div>
    </>
  );
}

export default Tabs
