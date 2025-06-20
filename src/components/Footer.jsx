import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/icon.png';

function Footer() {
    return (
    <footer className='footer'>
        <div className='footer-container'>
            <Link to='/' className='footer-logo-link'>
            <img src={logo} alt='Логотип' className='footer-logo'/>
            </Link>
            <p className='footer-paragraph'>© 2025 My Dictionary App</p>
            </div>
    </footer> 
    );
}

export default Footer;