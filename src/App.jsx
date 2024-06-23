import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReadyPage from './components/ReadyPage';
import SignPage from './components/SignPage';
import AboutPage from './components/AboutPage';
import './index.css';
import { modelConfigs } from './modelConfigs';
import { OnnxSessionProvider } from "./utils/OnnxSessionContext"

function App() {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]);

  //todo - maybe this state can be lower, like just in the sign in page
  const [selectedModel, setSelectedModel] = useState("model2");
  const location = useLocation();

  const modelConfig = modelConfigs[selectedModel]

  return (
    <OnnxSessionProvider modelConfig={modelConfig}>
      <div className="App">
        <Header />
        
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ready" element={<ReadyPage />} />
              <Route
                path="/sign"
                element={
                  
                    <SignPage
                      setSelectedModel={setSelectedModel}
                      selectedModel={selectedModel}
                      name={name}
                      setName={setName}
                      successfulGestures={successfulGestures}
                      setSuccessfulGestures={setSuccessfulGestures}
                    />
                }
              />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AnimatePresence>
      </div>
    </OnnxSessionProvider>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
