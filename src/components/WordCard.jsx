    import { useState, useEffect, useRef } from "react";
    import "../styles/WordCard.css";
    import ProgressCounter from './ProgressCounter';
    import { wordStore } from '../stores/WordStore';
    import { observer } from 'mobx-react';

    const WordCard = observer(() => {
    const words = wordStore.words;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTranslation, setShowTranslation] = useState(false);
    const [studiedWords, setStudiedWords] = useState([]);

    const translateButtonRef = useRef(null);

    useEffect(() => {
        let timer;
        if (!showTranslation && translateButtonRef.current) {
        timer = setTimeout(() => {
            translateButtonRef.current.focus();
        }, 50);
        }
        return () => {
        if (timer) clearTimeout(timer);
        };
    }, [currentIndex, showTranslation]);

    if (!words || words.length === 0) {
        return <p>Загрузка слов...</p>;
    }

    const currentWord = words[currentIndex];

    const handleShowTranslation = () => {
        setShowTranslation(true);
        if (!studiedWords.includes(currentWord.id)) {
        setStudiedWords([...studiedWords, currentWord.id]);
        }
    };

    const handleChangeBack = () => {
        if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setShowTranslation(false);
        }
    };

    const handleChangeNext = () => {
        if (currentIndex < words.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowTranslation(false);
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
                total={words.length}
            />
            </div>
        </div>

        <button
            className="btn nxt"
            onClick={handleChangeNext}
            disabled={currentIndex === words.length - 1}
        >
            Вперед
        </button>
        </div>
    );
    });

    export default WordCard;

