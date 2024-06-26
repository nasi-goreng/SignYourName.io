import React, { useState, useEffect } from 'react';
import Button from './Button';
import AnimatedCircle from './AnimatedCircle';
import Rectangle from './Rectangle';
import { useLocation } from 'react-router-dom';
import StaticCircle from './StaticCircle';
import TypingAnimation from './TypingAnimation';
import HandAnimation from './HandAnimation';

const HomePage = () => {
  const positionA = { top: '-6%', left: '45%' };
  const positionE = { top: '89.19%', left: '90.07%' };

  const positionB = { top: '80%', left: '81.4%' };
  const positionF = { top: '-6.88%', left: '79.72%' };

  const positionC = { top: '6%', left: '92.8%' };
  const positionD = { top: '13.65%', left: '22.5%' };

  const [visiblity, setVisiblity] = useState(true);
  const location = useLocation();
  const [currentLetter, setCurrentLetter] = useState('');

  useEffect(() => {
    setVisiblity(true);
    return () => {
      setVisiblity(false);
    };
  }, [location]);

  const handleLetterTyped = (letter) => {
    setCurrentLetter(letter);
  };
  const handleLetterDeleted = () => {
    setCurrentLetter('');
  };

  return (
    <div className="min-h-screen bg-[#FEF5F1] flex items-center justify-center relative overflow-hidden">
      <div className="flex flex-row w-full h-full z-20">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col items-start justify-center text-left p-8">
          <h1 className="text-[80px] font-[450] leading-[80px] text-[#2B2B2B] mb-4">Hello, my name is...</h1>
          <div className="relative flex items-center mb-4">
            <TypingAnimation
              words={['LUNA', 'ALEC', 'NEIL']}
              onLetterTyped={handleLetterTyped}
              onLetterDeleted={handleLetterDeleted}
            />
          </div>
          <p className="w-full px-4 py-2 mt-4 bg-[#FFFFFF] border-[3px] border-[#CDCDCD] rounded-[24px] font-normal text-xl shadow-md">
            Learn how to introduce yourself in ASL!
            <br />
            Use Machine Learning to sign your name in seconds.
            <div className="mt-4">
              <Button text="let's go" link="/ready" />
            </div>
          </p>
        </div>
        {/* Right Side */}
        <div className="flex items-center justify-center">
          <HandAnimation currentLetter={currentLetter} />
        </div>
      </div>

      <AnimatedCircle initialPosition={positionE} targetPosition={positionA} delay={0.2} />
      <AnimatedCircle initialPosition={positionF} targetPosition={positionB} delay={0.2} />
      <AnimatedCircle initialPosition={positionD} targetPosition={positionC} delay={0.2} />

      {/* Decorative Teal Rectangles */}
      <Rectangle className={`absolute h-[910.71px] top-1/2 left-1/2 rotate-[-95.99deg]`} isVisible={visiblity} />
      <Rectangle
        className={`absolute h-[351.63px] top-[70.86%] left-[4.33%] rotate-[-49.89deg]`}
        isVisible={visiblity}
      />
      <Rectangle className={`absolute h-[160px] top-0 left-[6.32%]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[361.45px] top-[-13%] left-[20%] rotate-[48.8deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[160px] top-[-5%] left-[93%] rotate-[-25.35deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[160px] top-[85%] left-[96%] rotate-[-65.22deg]`} isVisible={visiblity} />
      {/* Decorative Yellow Circles */}
      <StaticCircle className={`top-[90.57%] left-[10.35%]`} isVisible={visiblity} />
      <StaticCircle className={`top-[12.77%] left-[1.74%]`} isVisible={visiblity} />
    </div>
  );
};

export default HomePage;
