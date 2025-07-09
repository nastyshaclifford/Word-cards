import React from 'react';
import '../styles/ProgressCounter.css';

export default function ProgressCounter({ studied, total }) {
    const progressPercentage = Math.round((studied / total) * 100);
    const isComplete = studied === total && total > 0;

    return (
        <div className={`progress-counter-container ${isComplete ? 'complete' : ''}`}>
            <div className="compact-progress">
                {isComplete ? (
                    <div className="completion-message">
                        <span className="celebrate-icon"></span>
                        Все слова изучены! Поздравляем!
                    </div>
                ) : (
                    <>
                        <span>Прогресс: </span>
                        <strong>{studied}/{total}</strong>
                    </>
                )}
                <div className="progress-bar">
                    <div 
                        className="progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
    