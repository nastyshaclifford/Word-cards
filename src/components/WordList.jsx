import { useState } from 'react';
import '../styles/WordList.css';

const firstWords = [
    {
        "id": "33198",
        "english": "mother",
        "transcription": "[mʌðə]",
        "russian": "мама",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33200",
        "english": "aunt",
        "transcription": "[ænt]",
        "russian": "тётя",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33208",
        "english": "peace",
        "transcription": "[piːs]",
        "russian": "мир",
        "tags": "World",
        "tags_json": "[\"World\"]"
    },
    {
        "id": "33209",
        "english": "overwhelming",
        "transcription": "[əʊvərˈwelmɪŋ]",
        "russian": "ошеломляющий",
        "tags": "",
        "tags_json": "[\"\"]"
    },
    {
        "id": "33211",
        "english": "forecast",
        "transcription": "[ˈfɔːrkæst]",
        "russian": "прогноз",
        "tags": "",
        "tags_json": "[\"\"]"
    },
    {
        "id": "33229",
        "english": "mosquito",
        "transcription": "[məˈskiː.təʊ]",
        "russian": "комар",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33250",
        "english": "tornado",
        "transcription": "[tɔːˈneɪ.dəʊ]",
        "russian": "торнадо",
        "tags": "Weather",
        "tags_json": "[\"Weather\"]"
    },
    {
        "id": "33317",
        "english": "scrooge",
        "transcription": "[skruːdʒ]",
        "russian": "скряга",
        "tags": "",
        "tags_json": "[\"\"]"
    },
    {
        "id": "33367",
        "english": "cat",
        "transcription": "[cæt]",
        "russian": "кот",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33390",
        "english": "hang out",
        "transcription": "|ˈhæŋ ˈaʊt|",
        "russian": "тусоваться",
        "tags": "",
        "tags_json": "[\"\"]"
    },
    {
        "id": "33393",
        "english": "girl",
        "transcription": "[ɡɜːrl]",
        "russian": "девочка",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33404",
        "english": "curious",
        "transcription": "[ ˈkjʊrɪəs ]",
        "russian": "любопытный ",
        "tags": "",
        "tags_json": "[\"\"]"
    },
    {
        "id": "33406",
        "english": "brother",
        "transcription": "[brʌðə]",
        "russian": "брат",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33407",
        "english": "wind",
        "transcription": "[wɪnd]",
        "russian": "ветер",
        "tags": "Weather",
        "tags_json": "[\"Weather\"]"
    },
    { 
        "id": "33408",
        "english": "rain",
        "transcription": "[reɪn]",
        "russian": "дождь",
        "tags": "Weather",
        "tags_json": "[\"Weather\"]"
    },
    {
        "id": "33409",
        "english": "murky",
        "transcription": "[mɜːki]",
        "russian": "мрачный",
        "tags": "Weather",
        "tags_json": "[\"Weather\"]"
    },
    {
        "id": "33410",
        "english": "red",
        "transcription": "[rɛd]",
        "russian": "красный",
        "tags": "Colors",
        "tags_json": "[\"Colors\"]"
    },
    {
        "id": "33411",
        "english": "sister",
        "transcription": "[sɪstə]",
        "russian": "сестра",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33412",
        "english": "dad",
        "transcription": "[dæd]",
        "russian": "отец",
        "tags": "Family",
        "tags_json": "[\"Family\"]"
    },
    {
        "id": "33413",
        "english": "yellow",
        "transcription": "[jɛləʊ]",
        "russian": "желтый",
        "tags": "Colors",
        "tags_json": "[\"Colors\"]"
    },
    {
        "id": "33414",
        "english": "pan",
        "transcription": "[pæn]",
        "russian": "сковорода",
        "tags": "Kitchen",
        "tags_json": "[\"Kitchen\"]"
    },
    {
        "id": "33415",
        "english": "pot",
        "transcription": "[pɒt]",
        "russian": "кастрюля",
        "tags": "Kitchen",
        "tags_json": "[\"Kitchen\"]"
    },
    {
        "id": "33420",
        "english": "flor",
        "transcription": "[flɔː]",
        "russian": "пол",
        "tags": "Flat",
        "tags_json": "[\"Flat\"]"
    },
    {
        "id": "33421",
        "english": "step",
        "transcription": "[step]",
        "russian": "шаг",
        "tags": "Action",
        "tags_json": "[\"Action\"]"
    },
    {
        "id": "33422",
        "english": "dream",
        "transcription": "[driːm]",
        "russian": "мечта",
        "tags": "Mentality",
        "tags_json": "[\"Mentality\"]"
    },
    {
        "id": "33423",
        "english": "zucchini",
        "transcription": "[zʊˈkiːnɪ]",
        "russian": "кабачок",
        "tags": "Food",
        "tags_json": "[\"Food\"]"
    },
    {
        "id": "33424",
        "english": "snail",
        "transcription": "[sneɪl]",
        "russian": "улитка",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33425",
        "english": "hamster",
        "transcription": "[ˈhæmstə]",
        "russian": "хомяк",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33427",
        "english": "squirrel",
        "transcription": "[ˈskwɪrəl]",
        "russian": "белка",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33428",
        "english": "turtle",
        "transcription": "[tɜːtl]",
        "russian": "черепаха",
        "tags": "Animals",
        "tags_json": "[\"Animals\"]"
    },
    {
        "id": "33431",
        "english": "blue",
        "transcription": "[bluː]",
        "russian": "голубой",
        "tags": "Colors",
        "tags_json": "[\"Colors\"]"
    }
];

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
        setWords(words.map(word => 
            word.id === id ? editedWord : word
        ));
        setEditingId(null);
        setEditedWord({});
    };

    const handleDelete = (id) => {
        setWords(words.filter(word => word.id !== id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedWord(prev => ({
            ...prev,
            [name]: value
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
                                        <button className="btn save" onClick={() => handleSave(word.id)}>
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
                                        <button className="btn edit" onClick={() => handleEdit(word)}>
                                            Редактировать
                                        </button>
                                        <button className="btn delete" onClick={() => handleDelete(word.id)}>
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



