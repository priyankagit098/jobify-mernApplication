import React from 'react'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'

const BigSidebar = () => {

  const {showSidebar}= useAppContext()
  
  return (
   <Wrapper>
    {/* <div className= "sidebar-container show-sidebar"> */}
    <div className={showSidebar? "sidebar-container" : "sidebar-container show-sidebar"}>
      <div className='content'>
      <header>
      <Logo/>
      </header>
      <NavLinks/>
      </div>
    </div>
   </Wrapper>
  )
}

export default BigSidebar

// {showSidebar? "sidebar-container show-sidebar" : "sidebar-container"}