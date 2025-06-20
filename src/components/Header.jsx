import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png';
import '../styles/Header.css';

function Header() {
    return (
    <header className="header">
        <div className="header-container">
        <Link to="/" className="logo-link">
            <img src={logo} alt="Логотип" className="logo-img" />
        </Link>
        
        <h1 className="header-title">My dictionary</h1>
        
        <nav className="header-nav">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/game" className="nav-link">Карточки</Link>
        </nav>
        </div>
    </header>
    );
}

export default Header;