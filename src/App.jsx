import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReadyPage from './components/ReadyPage';
import SignPage from './components/SignPage';
import AboutPage from './components/AboutPage';
import './index.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ready" element={<ReadyPage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
