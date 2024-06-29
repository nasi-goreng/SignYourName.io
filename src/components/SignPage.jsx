import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WebcamFeed from './WebcamFeed';
import { ReactComponent as CheckMark } from '../assets/checkmark.svg';
import StaticCircle from './StaticCircle';
import Rectangle from './Rectangle';
import { modelConfigs } from '../modelConfigs';

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

  const handleGestureSuccess = (gesture) => {
    const index = successfulGestures.indexOf(false);
    const nextLetter = name[index];
    if (gesture === nextLetter) {
      const newSuccessfulGestures = [...successfulGestures];
      newSuccessfulGestures[index] = true;
      setSuccessfulGestures(newSuccessfulGestures);
    }
  };

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
    <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-start pt-32 relative overflow-hidden ">
      <div>
        <div className="flex items-center space-x-4 justify-end mt-10">
          <select
            className="w-[200px] h-[40px] bg-[#FEF5F1] border-2 border-[#CDCDCD] rounded-md text-gray-600 focus:outline-none border-0 text-right"
            onChange={(e) => setSelectedModel(e.target.value)}
            value={selectedModel}
          >
            <option value="model1">{modelConfigs.model1.name}</option>
            <option value="model2">{modelConfigs.model2.name}</option>
            <option value="model3">{modelConfigs.model3.name}</option>
          </select>
        </div>      
        <WebcamFeed
          prediction={prediction}
          handleGestureSuccess={cachedHandleGestureSuccess}
          setPrediction={setPrediction}
          className="mb-6 w-[668px]"
          modelConfig={modelConfig}
        />
      </div>
      <div>
      <div className="dm-mono text-lg mb-2">Type your name</div>
        <div className="flex items-center space-x-4 dm-mono">
          <input
            type="text"
            value={name}
            placeholder="Your name goes here"
            onChange={handleNameChange}
            className="w-[495px] h-[40px] bg-[#FFFFFF] py-3 px-6 gap-2.5 border-2 border-[#CDCDCD] rounded-md text-gray-600 focus:outline-none font-thin"
          />
          <button
            onClick={() => handleGestureSuccess('A')}
            className="w-[118px] h-[40px] border-2 border-[#CDCDCD] rounded-2xl focus:outline-none"
          >
            <span className="w-[37px] h-[18px] text-16 font-medium leading-17.6 text-left text-[#6C6C6C]">reset</span>
          </button>
      </div>
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
