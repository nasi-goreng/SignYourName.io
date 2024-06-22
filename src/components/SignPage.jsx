import React, { useState } from 'react';
import WebcamFeed from './WebcamFeed';
import { ReactComponent as CheckMark } from '../assets/checkmark.svg';
import { loadModel, preProcess, letters } from '../utils/modelUtils';

let model = null;

const SignPage = ({ name, setName, successfulGestures, setSuccessfulGestures }) => {
  const [prediction, setPrediction] = useState('');

  const predict = async (inputData) => {
    if (!model) {
      model = await loadModel();
    }

    const processedBatch = preProcess(inputData);
    const output = model.predict(processedBatch);
    const probabilities = await output.array();
    const probabilitiesInner = probabilities[0];
    const sortedIndices = probabilitiesInner
      .map((prob, index) => ({ prob, index }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, 3);

    const predictedLetter = letters[sortedIndices[0].index];
    setPrediction(predictedLetter);
  };

  const onFrameBatchFull = async (batch) => {
    predict(batch);
  };

  const handleNameChange = (event) => {
    setName(event.target.value.toUpperCase());
    setSuccessfulGestures(new Array(event.target.value.length).fill(false));
  };

  const handleGestureSuccess = (gesture) => {
    const index = successfulGestures.indexOf(false);
    const nextLetter = name[index];
    if (gesture === nextLetter) {
      const newSuccessfulGestures = [...successfulGestures];
      newSuccessfulGestures[index] = true;
      setSuccessfulGestures(newSuccessfulGestures);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-start pt-32 relative overflow-hidden">
      <WebcamFeed onFrameBatchFull={onFrameBatchFull} className="mb-8 w-[668px]" />
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={name}
          placeholder="Your name goes here"
          onChange={handleNameChange}
          className="w-[495px] h-[40px] bg-[#FFFFFF] py-3 px-6 gap-2.5 border-2 border-[#CDCDCD] rounded-md text-gray-600 focus:outline-none"
        />
        <button
          onClick={() => handleGestureSuccess('A')}
          className="w-[118px] h-[40px] border-2 border-[#CDCDCD] rounded-2xl focus:outline-none"
        >
          <span className="w-[37px] h-[18px] text-16 font-medium leading-17.6 text-left">reset</span>
        </button>
      </div>
      <div>{prediction}</div>
      <div id="sign-images" className="flex flex-wrap justify-center">
        {name.split('').map((letter, index) => (
          <div key={index} className="relative m-2">
            <img key={index} src={`/images/examples/${letter}.jpg`} alt={letter} className="w-full h-full" />
            {successfulGestures[index] && <CheckMark className="absolute inset-0 w-full h-full text-green-500" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignPage;
