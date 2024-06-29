import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WebcamFeed from './WebcamFeed';
import { ReactComponent as CheckMark } from '../assets/checkmark.svg';
import StaticCircle from './StaticCircle';
import Rectangle from './Rectangle';
import { modelConfigs } from '../modelConfigs';
import SignImages from './SignImages';

const SignPage = () => {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]);
  const [selectedModel, setSelectedModel] = useState('model2');
  const modelConfig = useMemo(() => modelConfigs[selectedModel], [selectedModel]);
  const [prediction, setPrediction] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value.toUpperCase());
    setSuccessfulGestures(new Array(event.target.value.length).fill(false));
  };

  const handleReset = () => {
    setName('');
    setSuccessfulGestures([]);
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

  useEffect(() => {
    console.log(prediction)
    handleGestureSuccess(prediction);
  }, [prediction]);

  const cachedHandleGestureSuccess = useCallback(handleGestureSuccess, [
    successfulGestures,
    name,
    setSuccessfulGestures,
  ]);

  const [visiblity, setVisiblity] = useState(true);
  useEffect(() => {
    setVisiblity(true);
    return () => {
      setVisiblity(false);
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-start pt-32 relative overflow-hidden">
      <WebcamFeed
        handleGestureSuccess={cachedHandleGestureSuccess}
        setPrediction={setPrediction}
        className="mt-10 mb-10 w-[668px]"
        modelConfig={modelConfig}
      />
      <div className="flex items-center space-x-4">
        <select
          className="w-[200px] h-[40px] bg-[#FFFFFF] border-2 border-[#CDCDCD] rounded-md text-gray-600 focus:outline-none"
          onChange={(e) => setSelectedModel(e.target.value)}
          value={selectedModel}
        >
          <option value="model1">{modelConfigs.model1.name}</option>
          <option value="model2">{modelConfigs.model2.name}</option>
          <option value="model3">{modelConfigs.model3.name}</option>
        </select>
      </div>
      <div className="flex flex-col items-center dm-mono">
        <div className="w-full max-w-[613px] flex justify-start mb-2">
          <p className="text-left font-medium text-sm">Type your name</p>
        </div>
        <div className="w-full max-w-[613px] flex flex-row justify-center">
          <input
            type="text"
            value={name}
            placeholder="Your name goes here"
            onChange={handleNameChange}
            className="w-[495px] h-[40px] bg-[#FFFFFF] py-3 px-6 gap-2.5 border-2 border-[#CDCDCD] rounded-lg text-gray-600 focus:outline-none mr-2"
          />
          <button
            onClick={handleReset}
            className="w-[118px] h-[40px] border-2 border-[#CDCDCD] rounded-2xl focus:outline-none hover:border-[#8953CD]"
          >
            <span className="w-[37px] h-[18px] text-16 font-medium leading-17.6 text-left text-[#6C6C6C]">reset</span>
          </button>
        </div>
      </div>
      <SignImages name={name} successfulGestures={successfulGestures} />
      <Rectangle className={`absolute h-[155px] top-[-7%] left-[89%] rotate-[70deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[64px] top-[45%] left-[-1%] rotate-[30deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[450px] top-[63%] left-[95%] rotate-[57deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[580px] top-[74%] left-[60%] rotate-[80deg]`} isVisible={visiblity} />
      <StaticCircle className={`top-[-3.64%] left-[74.58%]`} isVisible={visiblity} />
      <StaticCircle className={`top-[90.47%] left-[75.49%]`} isVisible={visiblity} />
      <StaticCircle className={`top-[29.97%] left-[-3.40%]`} isVisible={visiblity} />
    </div>
  );
};

export default SignPage;
