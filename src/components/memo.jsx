import React, { useState, useEffect } from 'react';
import Button from './Button';
import AnimatedCircle from './AnimatedCircle';
import Rectangle from './Rectangle';
import { useLocation } from 'react-router-dom';
import StaticCircle from './StaticCircle';
import TypingAnimation from './TypingAnimation';
import HandAnimation from './HandAnimation';
import { getDistanceFromEdge } from '../utils/design';

const HomePage = () => {
  const positionA = { top: '-6%', left: '45%' };
  const positionE = { top: '89.19%', left: '90.07%' };

  const positionB = { top: '80%', left: '81.4%' };
  const positionF = { top: '-6.88%', left: '79.72%' };

  const positionC = { top: '6%', left: '92.8%' };
  const positionD = { top: '13.65%', left: '22.5%' };

  const [visibility, setVisibility] = useState(true);
  const location = useLocation();
  const [currentLetter, setCurrentLetter] = useState('');

  useEffect(() => {
    setVisibility(true);
    return () => {
      setVisibility(false);
    };
  }, [location]);

  const handleLetterTyped = (letter) => {
    setCurrentLetter(letter);
  };
  const handleLetterDeleted = () => {
    setCurrentLetter('');
  };

  return (
    <div className="min-h-screen bg-[#FEF5F1] flex items-center justify-center relative overflow-hidden pt-16">
      <div className="flex flex-row items-center justify-center w-auto mt-4">
        {/* Left Side */}
        <div
          className={`w-5/6 flex flex-col items-start justify-center text-left p-8 pr-20 pl-3 relative z-20`}
          style={{ left: `${getDistanceFromEdge()}%` }}
        >
          <div className="w-1/3">
            <h1 className="text-[80px] font-[450] leading-[80px] text-[#2B2B2B] mb-4 tracking-wide">
              Hello, my name is...
            </h1>
            <div className="tracking-wide relative flex items-center mb-4">
              <TypingAnimation
                words={['LUNA', 'ALEC', 'NEIL']}
                onLetterTyped={handleLetterTyped}
                onLetterDeleted={handleLetterDeleted}
              />
            </div>
            <p className="w-[425px] px-4 py-2 mt-4 bg-[#FFFFFF] border-[3px] border-[#CDCDCD] rounded-[24px] font-normal text-xl shadow-md dm-mono">
              Learn how to introduce yourself in ASL! Use Machine Learning to sign your name in seconds.
              <div className="mt-4">
                <Button text="let's go" link="/ready" />
              </div>
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div
          className={`flex items-center justify-center ml-8 absolute `}
          style={{ right: `${getDistanceFromEdge()}%` }}
        >
          <HandAnimation currentLetter={currentLetter} />
        </div>
      </div>

      <AnimatedCircle initialPosition={positionE} targetPosition={positionA} delay={0.2} />
      <AnimatedCircle initialPosition={positionF} targetPosition={positionB} delay={0.2} />
      <AnimatedCircle initialPosition={positionD} targetPosition={positionC} delay={0.2} />

      {/* Decorative Teal Rectangles */}
      <Rectangle className={`absolute h-[910.71px] top-1/2 left-1/2 rotate-[-95.99deg]`} isVisible={visibility} />
      <Rectangle
        className={`absolute h-[351.63px] top-[70.86%] left-[4.33%] rotate-[-49.89deg]`}
        isVisible={visibility}
      />
      <Rectangle className={`absolute h-[160px] top-0 left-[6.32%]`} isVisible={visibility} />
      <Rectangle className={`absolute h-[361.45px] top-[-13%] left-[20%] rotate-[48.8deg]`} isVisible={visibility} />
      <Rectangle className={`absolute h-[160px] top-[-5%] left-[93%] rotate-[-25.35deg]`} isVisible={visibility} />
      <Rectangle className={`absolute h-[160px] top-[85%] left-[96%] rotate-[-65.22deg]`} isVisible={visibility} />
      {/* Decorative Yellow Circles */}
      <StaticCircle className={`top-[90.57%] left-[10.35%]`} isVisible={visibility} />
      <StaticCircle className={`top-[12.77%] left-[1.74%]`} isVisible={visibility} />
    </div>
  );
};

export default HomePage;
