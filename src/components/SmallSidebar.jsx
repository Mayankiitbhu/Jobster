import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { MdClose } from "react-icons/md";
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <Wrapper>
        <div className={isSidebarOpen ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
          <div className="content">
          <button className='close-btn' onClick={toggleSidebar}>
            <MdClose />
          </button>
            <Logo />
            <NavLinks toggleSidebar={toggleSidebar} />
          </div>
        </div>
    </Wrapper>
  )
}

export default SmallSidebar;