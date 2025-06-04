import { useState } from 'react';
import '../styles/WordCard.css';

const word =  [
{
    "id": "33198",
    "english": "mother",
    "transcription": "[mʌðə]",
    "russian": "мама",
    "tags": "Family",
    "tags_json": "[\"Family\"]"
},
];
function WordCard() {
    const [showTranslation, setTranslation] = useState(false);

    const handleShowTranslation = () => {
    setTranslation(true);
    };

    return (
        <div class="word-card">
            <h2>Карточка слов</h2>
            <p>{word[0].english}</p>
            <p>{word[0].transcription}</p>
            {!showTranslation ? (
                <button className="btn translate" onClick={handleShowTranslation}>Показать перевод</button> 
            ) : null}
            {showTranslation && (
                <p className="translation">{word[0].russian}</p>
            )}
        </div>
    );
}

export default WordCard;