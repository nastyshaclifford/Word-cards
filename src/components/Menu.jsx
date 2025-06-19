import { React } from 'react';
import { Link } from 'react-router-dom';


function Menu() {
    return (
        <nav className="menu">
            <Link to='/'>Главная</Link>
            <Link to='/game'>Карточки</Link>
        </nav>
    );
}

export default Menu;
