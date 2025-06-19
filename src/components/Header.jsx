import React from 'react';
import Menu from './Menu';
import '../styles/Header.css';

function Header() {
    return (
        <header className='header'>
            <h1>My dictionary</h1>
            <Menu />
        </header>
    );
}

export default Header;