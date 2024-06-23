// OnnxSessionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as ort from 'onnxruntime-web';

const OnnxSessionContext = createContext(null);

export const useOnnxSession = () => {
  
  const c = useContext(OnnxSessionContext);
  console.log("c inside useonnnxsescion ", c)
  return c
};

export const OnnxSessionProvider = ({ children, modelConfig }) => {
  console.log("OnnxSessionProvider is being called!" )
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Load the ONNX model when the component mounts
    const loadModel = async () => {
      try {
        const session = await ort.InferenceSession.create(modelConfig.path);
        console.log("sesion inside onnxsessioncontexgt ", session)
        setSession(session);
      } catch (err) {
        console.error('Failed to load ONNX model:', err);
      }
    };

    loadModel();
  }, []);

  return (
    <OnnxSessionContext.Provider value={session}>
      {children}
    </OnnxSessionContext.Provider>
  );
};