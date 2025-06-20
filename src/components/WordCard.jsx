import { useState } from "react";
import { firstWords } from "./data/wordsData";
import "../styles/WordCard.css";

function WordCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setTranslation] = useState(false);

    const currentWord = firstWords[currentIndex];

    const handleShowTranslation = () => {
    setTranslation(true);
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
        <p>{currentWord.english}</p>
        <p>{currentWord.transcription}</p>
        {!showTranslation ? (
        <button className="btn translate" onClick={handleShowTranslation}>
            Показать перевод
        </button>
        ) : null}
        {showTranslation && (
            <p className="translation">{currentWord.russian}</p>
        )}
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
