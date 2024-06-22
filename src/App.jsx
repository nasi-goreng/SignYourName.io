import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReadyPage from './components/ReadyPage';
import SignPage from './components/SignPage';
import AboutPage from './components/AboutPage';
import './index.css';

function App() {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]); // New state

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ready" element={<ReadyPage />} />
          <Route
            path="/sign"
            element={
              <SignPage
                name={name}
                setName={setName}
                successfulGestures={successfulGestures}
                setSuccessfulGestures={setSuccessfulGestures}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
