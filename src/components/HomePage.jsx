import React, { useState, useEffect } from 'react';
import Button from './Button';
import AnimatedCircle from './AnimatedCircle';
import Rectangle from './Rectangle';
import { useLocation } from 'react-router-dom';
import StaticCircle from './StaticCircle';

const HomePage = () => {
  const positionA = { top: '-6%', left: '45%' };
  const positionB = { top: '80%', left: '81.4%' };
  const positionC = { top: '6%', left: '92.8%' };

  const [visiblity, setVisiblity] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setVisiblity(true);
    return () => {
      setVisiblity(false);
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedCircle initialPosition={positionA} targetPosition={positionC} delay={0.2} />
      <AnimatedCircle initialPosition={positionB} targetPosition={positionA} delay={0.2} />
      <AnimatedCircle initialPosition={positionC} targetPosition={positionB} delay={0.2} />
      <div className="text-left w-[441px] h-[512px] absolute top-[20.8%] left-[14.8%] gap-[32px] flex flex-col items-start">
        <h1 className="text-[80px] font-[450] leading-[80px] text-[#2B2B2B] mb-4">Hello, my name is...</h1>
        <div className="relative">
          <div className="animate-blink w-[2px] h-[104px] bg-[#2B2B2B] absolute top-0"></div>
        </div>
        <p
          className="w-[441px] h-auto px-4 py-2 mt-28 bg-[#FFFFFF] border-[3px] border-[#CDCDCD] rounded-[24px] font-normal text-xl shadow-md"
          style={{ paddingTop: '18px', gap: '10px' }}
        >
          Learn how to introduce yourself in ASL!
          <br />
          Use Machine Learning to sign your name in seconds.
          <div className="mt-4">
            <Button text="let's go" link="/ready" />
          </div>
        </p>
      </div>

      {/* Decorative Teal Rectangles */}
      <Rectangle
        style={{
          height: '910.71px',
          top: '49%',
          left: '49%',
          transform: 'rotate(-95.99deg)',
        }}
        isVisible={visiblity}
      />
      <Rectangle
        style={{
          height: '351.63px',
          top: '70.86%',
          left: '4.33%',
          transform: 'rotate(-49.89deg)',
        }}
        isVisible={visiblity}
      />
      <Rectangle
        style={{
          height: '361.45x',
          top: '50%',
          left: '40.23%',
          transform: 'rotate(48.8deg)',
        }}
        isVisible={visiblity}
      />
      <Rectangle
        style={{
          height: '160px',
          top: '0%',
          left: '6.32%',
        }}
        isVisible={visiblity}
      />
      {/* Decorative Yello Circles */}
      <StaticCircle
        style={{
          top: '90.57%',
          left: '10.35%',
        }}
        isVisible={visiblity}
      />
      <StaticCircle
        style={{
          top: '12.77%',
          left: '1.74%',
        }}
        isVisible={visiblity}
      />
    </div>
  );
};

export default HomePage;
