import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = "http://itgirlschool.justmakeit.ru/api/words";

    const fetchWords = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();
            setWords(data);
            setError(null);
        } catch (err) {
            setError('Не удалось загрузить слова');
        } finally {
            setLoading(false);
        }
        };

        const addWord = async (newWord) => {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newWord)
                });
                if(!response.ok) throw new Error('Ошибка добавления');
                const createdWord = await response.json();
                setWords([...words, createdWord]);
            } catch (err) {
                setError('Ошибка при добавлении слова');
            }
            };

            const deleteWord = async (id) => {
                console.log(id);
                try {
                    const response = await fetch(`${API_URL}/${id}/delete`, {
                        method: 'POST'
                    });
                    if (!response.ok) throw new Error('Ошибка удаления');
                    setWords(words.filter(word => word.id !== id));
                } catch (err) {
                    setError('Ошибка при удалении слова');
                }
            };

            const updateWord = async (updatedWord) => {
                console.log(updatedWord);
                try {
                    const response = await fetch(`${API_URL}/${updatedWord.id}/update`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedWord)  
                });
                if (!response.ok) throw new Error('Ошибка обновления');
                setWords (words.map(word => word.id === updatedWord.id ? updatedWord : word));
                } catch (err) {
                    setError('Ошибка при обновлении слова');
                }
            };

            useEffect(() => {
                fetchWords();
            }, []);

            return (
                <AppContext.Provider
                value={{ words, loading, error, fetchWords, addWord, deleteWord, updateWord }}
                >
                    {children}
                </AppContext.Provider>
            );
        };