import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ort from 'onnxruntime-web';

const OnnxSessionContext = createContext(null);

export const useOnnxSession = () => {
  return useContext(OnnxSessionContext);
};

export const OnnxSessionProvider = ({ children, modelConfig }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const session = await ort.InferenceSession.create(modelConfig.path);
        setSession(session);
      } catch (err) {
        console.error('Failed to load ONNX model:', err);
      } 
    };

    loadModel();
  }, [modelConfig.path]);


  return <OnnxSessionContext.Provider value={session}>{children}</OnnxSessionContext.Provider>;
};
