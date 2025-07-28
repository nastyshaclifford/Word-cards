    import { useState, useRef, useEffect } from "react";
    import { observer } from "mobx-react";
    import { wordStore } from "../stores/WordStore"; 
    import "../styles/WordList.css";

    const WordList = observer(() => {
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
        const newErrors = {};
        ['english', 'transcription', 'russian', 'tags'].forEach(field => {
        if (!editedWord[field]?.trim()) newErrors[field] = true;
        });
        setErrors(newErrors);
        return !Object.keys(newErrors).length;
    };

    const handleSave = async (id) => {
        if (!validateFields()) return;
        
        try {
        await wordStore.updateWord(editedWord);
        setEditingId(null);
        } catch (err) {
        console.error('Ошибка сохранения:', err);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setErrors({});
    };

    const handleDelete = async (id) => {
        try {
        await wordStore.deleteWord(id);
        if (editingId === id) setEditingId(null);
        } catch (err) {
        console.error('Ошибка удаления:', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWord(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
    };

    useEffect(() => {
        if (editingId && saveBtnRef.current) saveBtnRef.current.focus();
    }, [editingId]);

    if (wordStore.loading) return <p>Загрузка...</p>;
    if (wordStore.error) return <p className="error-message">Ошибка: {wordStore.error}</p>;

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
                <th colSpan="2">Действия</th>
            </tr>
            </thead>
            <tbody>
            {wordStore.words.map((word, index) => (
                <tr key={word.id}>
                <td>{index + 1}</td>
                
                {['english', 'transcription', 'russian', 'tags'].map(field => (
                    <td key={field}>
                    {editingId === word.id ? (
                        <input
                        name={field}
                        value={editedWord[field] || ""}
                        onChange={handleChange}
                        className={errors[field] ? "error" : ""}
                        />
                    ) : (
                        word[field]
                    )}
                    </td>
                ))}

                <td>
                    {editingId === word.id ? (
                    <>
                        <button
                        ref={saveBtnRef}
                        className="btn save"
                        onClick={() => handleSave(word.id)}
                        disabled={Object.values(errors).some(Boolean)}
                        >
                        Сохранить
                        </button>
                        <button className="btn cancel" onClick={handleCancel}>
                        Отмена
                        </button>
                    </>
                    ) : (
                    <>
                        <button className="btn edit" onClick={() => handleEdit(word)}>
                        Редактировать
                        </button>
                        <button className="btn delete" onClick={() => handleDelete(word.id)}>
                        Удалить
                        </button>
                    </>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    });

    export default WordList;
