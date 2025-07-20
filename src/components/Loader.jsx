
import '../styles/Loader.css';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Loader = () => {
    const { loading } = useContext(AppContext);

    if (!loading) return null;

return (
    <div className="loader-container">
        <div className="loader"></div>
    </div>
);
};

export default Loader;