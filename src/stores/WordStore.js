import { makeAutoObservable } from "mobx";

class WordStore {
    words = [];
    loading = true;
    error = null;

    API_URL = "http://itgirlschool.justmakeit.ru/api/words";

    constructor() {
        makeAutoObservable(this);
        this.fetchWords();
    }

    async fetchWords() {
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки слов');
            const data = await response.json();
            this.words = data;
            this.loading = false;
        } catch (err) {
            this.error = 'Ошибка при загрузке слов';
            this.loading = false;
        }
    }

    async addWord(newWord) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: { "Content-Type": "application/json" 
                },
                body: JSON.stringify(newWord)
            });
            if (!response.ok) throw new Error('Ошибка добавления слова');
            const createdWord = await response.json();
            this.words = [...this.words, createdWord];
        } catch (err) {
            this.error = 'Ошибка при добавлении слова'
        }
    }
    async deleteWord(id) {
            try {
            const response = await fetch(`${this.API_URL}/${id}/delete`, {
                method: 'POST'
            });
            if (!response.ok) throw new Error('Ошибка удаления');
            this.words = this.words.filter(word => word.id !== id);
            } catch (err) {
            this.error = 'Ошибка при удалении слова';
            }
        }
        
        async updateWord(updatedWord) {
                try {
                const response = await fetch(`${this.API_URL}/${updatedWord.id}/update`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedWord)  
                });
                if (!response.ok) throw new Error('Ошибка обновления');
                this.words = this.words.map(word => 
                    word.id === updatedWord.id ? updatedWord : word
                );
                } catch (err) {
                this.error = 'Ошибка при обновлении слова';
                }
            }
        }

        export const wordStore = new WordStore();
