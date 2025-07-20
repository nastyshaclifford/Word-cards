import React from 'react';
import '../styles/ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    if (!message) return null;

    return (
        <div className="error-message-container">
        <div>
        <h2 className="error-message-title">Ошибка</h2>
        <p className="error-message-text">{message}</p>
        </div>
    </div>
    );
};

export default ErrorMessage;