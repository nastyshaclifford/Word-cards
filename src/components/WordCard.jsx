import { useState, useEffect, useRef } from "react";
import { firstWords } from "./data/wordsData";
import "../styles/WordCard.css";
import ProgressCounter from './ProgressCounter';

function WordCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setTranslation] = useState(false);
    const [studiedWords, setStudiedWords] = useState([]);

    const translateButtonRef = useRef(null);

    const currentWord = firstWords[currentIndex];

    useEffect(() => {
        if (!showTranslation && translateButtonRef.current) {
            const timer = setTimeout(() => {
                translateButtonRef.current.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, showTranslation]);

    const handleShowTranslation = () => {
    setTranslation(true);
    if (!studiedWords.includes(currentWord.id)) {
        setStudiedWords([...studiedWords, currentWord.id]);
    }
};

    const handleChangeBack = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setTranslation(false);
    }
};

    const handleChangeNext = () => {
    if (currentIndex < firstWords.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setTranslation(false);
    }
    };


    return (
        <div className="card-wrapper">
            <button
                className="btn back"
                onClick={handleChangeBack}
                disabled={currentIndex === 0}
            >
                Назад
            </button>

            <div className="word-card">
                <h2>Карточка слов</h2>
                <p className="english-word">{currentWord.english}</p>
                <p className="transcription">{currentWord.transcription}</p>

                <div className="translation-section">
                    {!showTranslation ? (
                        <button 
                        ref={translateButtonRef}
                        className="btn translate"
                        onClick={handleShowTranslation}
                        >
                            Показать перевод
                        </button>
                    ) : (
                        <p className="translation">{currentWord.russian}</p>
                    )}

                    <ProgressCounter 
                        studied={studiedWords.length} 
                        total={firstWords.length} 
                    />
                </div>
            </div>

            <button
                className="btn nxt"
                onClick={handleChangeNext}
                disabled={currentIndex === firstWords.length - 1}
            >
                Вперед
            </button>
        </div>
    );
}

export default WordCard;
