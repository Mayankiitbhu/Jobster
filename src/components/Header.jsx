import React from 'react';
import logo from '../assets/images/logo.svg';

const Header = () => {
  return (
    <main>
        <nav>
            <img src={logo} alt='logo' />
        </nav>
    </main>
  )
}

export default Header;