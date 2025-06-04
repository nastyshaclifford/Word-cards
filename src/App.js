import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WordList from './components/WordList';
import './styles/App.css';
import WordCard from './components/WordCard';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <WordList />
        <WordCard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
