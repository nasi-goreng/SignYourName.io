import React, { useState, useEffect, useCallback, useMemo } from 'react';
import WebcamFeed from './WebcamFeed';
import StaticCircle from './StaticCircle';
import Rectangle from './Rectangle';
import { modelConfigs } from '../modelConfigs';
import SignImages from './SignImages';
import Dropdown from './Dropdown';
import AnimatedCircle from './AnimatedCircle';

const positionA = { top: '-6%', left: '45%' };
const positionE = { top: '89.19%', left: '90.07%' };

const positionB = { top: '80%', left: '81.4%' };
const positionF = { top: '-6.88%', left: '79.72%' };

const positionC = { top: '6%', left: '92.8%' };
const positionD = { top: '13.65%', left: '22.5%' };

const SignPage = () => {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]);
  const [selectedModel, setSelectedModel] = useState(Math.random() < 0.5 ? 'model1' : 'model2');
  const modelConfig = useMemo(() => modelConfigs[selectedModel], [selectedModel]);
  const [prediction, setPrediction] = useState('');
  const [finishedSpellingName, setFinishedSpellingName] = useState(false);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);

  const handleNameChange = (event) => {
    const filteredValue = event.target.value.replace(/\s+/g, '');
    setName(filteredValue.toUpperCase());
    setSuccessfulGestures(new Array(event.target.value.length).fill(false));
    setDisplaySuccessMessage(false);
  };

  const handleReset = () => {
    setName('');
    setSuccessfulGestures([]);
  };

  const handleGestureSuccess = (gesture) => {
    console.log({gesture})
    const index = successfulGestures.indexOf(false);
    const nextLetter = name[index];
    if (gesture === nextLetter) {
      const newSuccessfulGestures = [...successfulGestures];
      newSuccessfulGestures[index] = true;
      setSuccessfulGestures(newSuccessfulGestures);
      if (newSuccessfulGestures.every((match) => !!match)) {
        setFinishedSpellingName(true);
      }
    }
  };

  useEffect(() => {
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
    <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-start pt-[4vh] relative overflow-hidden ">
      <div>
        {/* <Dropdown modelConfigs={modelConfigs} setSelectedModel={setSelectedModel} selectedModel={selectedModel} /> */}
        <div className="flex items-center space-x-4 justify-end mt-10">
          <select
            className="be-vietnam text-base font-semibold w-[275px] h-[40px] bg-[#FEF5F1] rounded-md text-gray-600 focus:outline-none border-0 text-right"
            onChange={(e) => setSelectedModel(e.target.value)}
            value={selectedModel}
          >
            <option value="model1" className="dm-mono font-medium text-sm">
              {modelConfigs.model1.name}
            </option>
            <option value="model2" className="dm-mono font-medium text-sm">
              {modelConfigs.model2.name}
            </option>
            <option value="model3" className="dm-mono font-medium text-sm">
              {modelConfigs.model3.name}
            </option>
          </select>
        </div>
        <WebcamFeed
          prediction={prediction}
          handleGestureSuccess={cachedHandleGestureSuccess}
          setPrediction={setPrediction}
          className="mb-4 w-[40vw]"
          modelConfig={modelConfig}
        />
      </div>
      <div>
        <div className="dm-mono text-lg mb-1">Type your name</div>
        <div className="flex items-center space-x-4 dm-mono">
          <input
            type="text"
            value={name}
            placeholder="Your name goes here"
            onChange={handleNameChange}
            className="w-[495px] h-[40px] bg-[#FFFFFF] py-3 px-6 gap-2.5 border-2 border-[#CDCDCD] rounded-md text-gray-600 focus:outline-none font-thin"
          />
          <button
            onClick={handleReset}
            className="w-[118px] h-[40px] border-2 border-[#CDCDCD] rounded-2xl focus:outline-none hover:border-[#8953CD]"
          >
            <span className="w-[37px] h-[18px] text-16 font-medium leading-17.6 text-left text-[#6C6C6C]">reset</span>
          </button>
        </div>
      </div>
      <SignImages
        onPressSkip={() => {
          const nextLetter = name[successfulGestures.indexOf(false)];
          cachedHandleGestureSuccess(nextLetter);
        }}
        displaySuccessMessage={displaySuccessMessage}
        setDisplaySuccessMessage={setDisplaySuccessMessage}
        name={name}
        resetName={() => setName('')}
        successfulGestures={successfulGestures}
        finishedSpellingName={finishedSpellingName}
        setFinishedSpellingName={setFinishedSpellingName}
      />
      {/* <Rectangle className={`absolute h-[155px] top-[-7%] left-[89%] rotate-[70deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[64px] top-[45%] left-[-1%] rotate-[30deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[450px] top-[63%] left-[95%] rotate-[57deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[580px] top-[74%] left-[60%] rotate-[80deg]`} isVisible={visiblity} /> */}
      {/* <StaticCircle className={`top-[-3.64%] left-[74.58%] circle circle-a`} isVisible={visiblity} />
      <StaticCircle className={`top-[90.47%] left-[75.49%] circle circle-b`} isVisible={visiblity} />
      <StaticCircle className={`top-[29.97%] left-[-3.40%] circle circle-c`} isVisible={visiblity} /> */}
      {/* <StaticCircle className={`top-[90.57%] left-[10.35%] circle circle-b`} isVisible={visiblity} />
      <StaticCircle className={`top-[12.77%] left-[1.74%] circle circle-a`} isVisible={visiblity} />     
      <StaticCircle className={`top-[-6.88%] left-[79.72%] circle circle-d`} delay={0.2} isVisible={visiblity}/>
      <StaticCircle className={`top-[13.65%] left-[22.5%] circle circle-c`} delay={0.2} isVisible={visiblity} />   
       */}
      {/* <AnimatedCircle initialPosition={positionE} targetPosition={positionA} delay={0.2} /> */}
      <AnimatedCircle initialPosition={positionF} targetPosition={positionB} delay={0.2} className="circle circle-d"/>
      <AnimatedCircle initialPosition={positionD} targetPosition={positionC} delay={0.2} className="circle circle-c" />
      <StaticCircle className={`top-[90.57%] left-[10.35%] circle circle-b`} isVisible={visiblity} />
      <StaticCircle className={`top-[12.77%] left-[1.74%] circle circle-a`} isVisible={visiblity} />       
    </div>
  );
};

export default SignPage;
