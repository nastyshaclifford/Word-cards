import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WordList from './components/WordList';
import './styles/App.css';
import WordCard from './components/WordCard';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppContext, AppProvider } from './context/AppContext';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';

function App() {
  return (
    <AppProvider>
    <Router>
    <div className="app">
      <Header />
      <ErrorMessage />
      <Loader />
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
    </AppProvider>
  );
}

export default App;
