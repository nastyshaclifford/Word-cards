import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
    return (
        <div className='not-found-container'>
            <div className='not-found-content'>
                <h1 className='not-found-title'>404</h1>
                <h2 className='not-found-subtitle'>Страница не найдена</h2>
                <p className='not-found-text'>
                    Oops... Кажется, мы не можем найти то, что вы ищете. Повторите попытку позже.</p>
                    <Link to='/' className='not-found-button'>
                    Вернуться на главную страницу
                    </Link>
            </div>
        </div>
    );
}

export default NotFound;