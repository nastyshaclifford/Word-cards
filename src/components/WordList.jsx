import { useState, useEffect, useRef } from "react";
import { firstWords } from "./data/wordsData";
import "../styles/WordList.css";

const WordList = () => {
    const [words, setWords] = useState(firstWords);
    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({});
    const [errors, setErrors] = useState({});
    const saveBtnRef = useRef(null);


    const handleEdit = (word) => {
    setEditingId(word.id);
    setEditedWord({ ...word });
    setErrors({});
};

const validateFields = () => {
    const requiredFields = ['english', 'transcription', 'russian', 'tags'];
    const newErrors = {};
    requiredFields.forEach(field => {
        if (!editedWord[field]?.trim()) {
            newErrors[field] = true;
        }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


const handleSave = (id) => {
    const isValid = validateFields();
    if (!isValid) {
        console.log('Ошибка: есть пустые поля!');
        return;
    }

    console.log('Сохраненные данные:', editedWord);
    setWords(words.map((word) => (word.id === id ? editedWord : word)));
    setEditingId(null);
    setEditedWord({});
};


const handleCancel = () => {
    setEditingId(null);
    setEditedWord({});
    setErrors({});
};

const handleDelete = (id) => {
    setWords(words.filter((word) => word.id !== id));
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedWord((prev) => ({
    ...prev,
    [name]: value,
    }));

    if (errors[name] && value.trim()) {
        setErrors(prev => ({ ...prev, [name]: false }));
    }
};

useEffect(() => {
    if (editingId && saveBtnRef.current) {
        saveBtnRef.current.focus();
    }
}, [editingId]);
return (
    <div className="container">
        <table className="word-table">
        <thead>
        <tr>
            <th>#</th>
            <th>Основное значение</th>
            <th>Транскрипция</th>
            <th>Перевод</th>
            <th>Тема</th>
            <th colSpan="2"></th>
        </tr>
        </thead>
        <tbody>
        {words.map((word, index) => (
            <tr key={word.id}>
            <td>{index + 1}</td>
            {editingId === word.id ? (
                <>
                <td>
                    <input
                        name="english"
                        value={editedWord.english || ""}
                        onChange={handleChange}
                        className={errors.english ? "error" : ""}
                    />
                </td>
                <td>
                    <input
                        name="transcription"
                        value={editedWord.transcription || ""}
                        onChange={handleChange}
                        className={errors.transcription ? "error" : ""}
                    />
                </td>
                <td>
                    <input
                        name="russian"
                        value={editedWord.russian || ""}
                        onChange={handleChange}
                        className={errors.russian ? "error" : ""}
                    />
                </td>
                <td>
                    <input
                        name="tags"
                        value={editedWord.tags || ""}
                        onChange={handleChange}
                        className={errors.tags ? "error" : ""}
                    />
                </td>
                <td>
                    <button
                    ref={saveBtnRef}
                        className="btn save"
                        onClick={() =>handleSave(word.id)}
                        disabled={Object.values(errors).some(Boolean)}
                    >
                        Сохранить
                    </button>
                    <button className="btn cancel" onClick={handleCancel}>
                        Вернуть
                    </button>
                </td>
                </>
            ) : (
                <>
                <td>{word.english}</td>
                <td>{word.transcription}</td>
                <td>{word.russian}</td>
                <td>{word.tags}</td>
                <td>
                    <button
                        className="btn edit"
                        onClick={() => handleEdit(word)}
                    >
                        Редактировать
                    </button>
                    <button
                        className="btn delete"
                        onClick={() => handleDelete(word.id)}
                    >
                        Удалить
                    </button>
                    </td>
                </>
            )}
            </tr>
        ))}
        </tbody>
    </table>
    </div>
    );
};

export default WordList;
