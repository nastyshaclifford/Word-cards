import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WordList from './components/WordList';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <WordList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
