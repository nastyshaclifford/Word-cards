    import { useState, useEffect, useRef, useContext } from "react";
    import { AppContext } from "../context/AppContext";
    import "../styles/WordList.css";

    const WordList = () => {
        const { words, updateWord, deleteWord, loading, error } = useContext(AppContext);
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


    const handleSave = async (id) => {
        const isValid = validateFields();
        if (!isValid) {
            console.log('Ошибка: есть пустые поля!');
            return;
        }

        try {
            await updateWord(editedWord); 
                setEditingId(null);
                setEditedWord({});
            } catch (err) {
                console.error('Ошибка при сохранении слова', err);
            }
            };

            const handleCancel = () => {
                setEditingId(null);
                setEditedWord({});
                setErrors({});
            };

        const handleDelete = async (id) => {
            try {
            await deleteWord(id); 
            if (editingId === id) {
                setEditingId(null);
                setEditedWord({});
            }
            } catch (err) {
            console.error('Ошибка при удалении слова', err);
            }
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
        {loading ? (
            <p>Загрузка...</p>
        ) : error ? (
            <p className="error-message">Ошибка загрузки данных: {error}</p>
        ) : (
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

                    <td>
                    {editingId === word.id ? (
                        <input
                        name="english"
                        value={editedWord.english || ""}
                        onChange={handleChange}
                        className={errors.english ? "error" : ""}
                        />
                    ) : (
                        word.english
                    )}
                    </td>

                    <td>
                    {editingId === word.id ? (
                        <input
                        name="transcription"
                        value={editedWord.transcription || ""}
                        onChange={handleChange}
                        className={errors.transcription ? "error" : ""}
                        />
                    ) : (
                        word.transcription
                    )}
                    </td>

                    <td>
                    {editingId === word.id ? (
                        <input
                        name="russian"
                        value={editedWord.russian || ""}
                        onChange={handleChange}
                        className={errors.russian ? "error" : ""}
                        />
                    ) : (
                        word.russian
                    )}
                    </td>

                    <td>
                    {editingId === word.id ? (
                        <input
                        name="tags"
                        value={editedWord.tags || ""}
                        onChange={handleChange}
                        className={errors.tags ? "error" : ""}
                        />
                    ) : (
                        word.tags
                    )}
                    </td>

                    <td>
                    {editingId === word.id ? (
                        <div>
                        <button
                            ref={saveBtnRef}
                            className="btn save"
                            onClick={() => handleSave(word.id)}
                            disabled={Object.values(errors).some(Boolean)}
                        >
                            Сохранить
                        </button>
                        <button className="btn cancel" onClick={handleCancel}>
                            Вернуть
                        </button>
                        </div>
                    ) : (
                        <div>
                        <button className="btn edit" onClick={() => handleEdit(word)}>
                            Редактировать
                        </button>
                        <button className="btn delete" onClick={() => handleDelete(word.id)}>
                            Удалить
                        </button>
                        </div>
                    )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    };

export default WordList;
