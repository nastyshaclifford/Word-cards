import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WordList from './components/WordList';
import './styles/App.css';
import WordCard from './components/WordCard';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="app">
      <Header />
      <main>
        <Routes>
        <Route path="/" element={<WordList />} />
        <Route path='/game' element={<WordCard />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
