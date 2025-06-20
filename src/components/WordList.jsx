import { useState } from "react";
import { firstWords } from "./data/wordsData";
import "../styles/WordList.css";

const WordList = () => {
    const [words, setWords] = useState(firstWords);
    const [editingId, setEditingId] = useState(null);
    const [editedWord, setEditedWord] = useState({});

    const handleEdit = (word) => {
    setEditingId(word.id);
    setEditedWord({ ...word });
};

    const handleCancel = () => {
    setEditingId(null);
    setEditedWord({});
};

    const handleSave = (id) => {
    setWords(words.map((word) => (word.id === id ? editedWord : word)));
    setEditingId(null);
    setEditedWord({});
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
};

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
                        value={editedWord.english}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="transcription"
                        value={editedWord.transcription}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="russian"
                        value={editedWord.russian}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        name="tags"
                        value={editedWord.tags}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <button
                        className="btn save"
                        onClick={() => handleSave(word.id)}
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
