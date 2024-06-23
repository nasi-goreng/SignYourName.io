import React, { useState, useEffect } from 'react';
import Button from './Button';
import AnimatedCircle from './AnimatedCircle';
import StaticCircle from './StaticCircle';
import Rectangle from './Rectangle';
import { useLocation } from 'react-router-dom';

const ReadyPage = () => {
  const positionA = { top: '-6%', left: '45%' };
  const positionE = { top: '89.19%', left: '90.07%' };

  const positionB = { top: '80%', left: '81.4%' };
  const positionF = { top: '-6.88%', left: '79.72%' };

  const positionC = { top: '6%', left: '92.8%' };
  const positionD = { top: '13.65%', left: '22.5%' };

  const [visiblity, setVisiblity] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setVisiblity(true);
    return () => {
      setVisiblity(false);
    };
  }, [location]);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
      <div className="text-center z-20">
        <h1 className="text-5xl mb-4 font-[450]">Ready?</h1>
        <p className="mb-6 font-normal text-xl">Type your name, then copy the hand shapes with your own hand.</p>
        <div className="flex flex-col items-center">
          <Button text="start" link="/sign" />
          <Button text="back" link="/" className="bg-transparent text-[#A29995]" />
        </div>
      </div>

      <AnimatedCircle initialPosition={positionA} targetPosition={positionE} delay={0.2} />
      <AnimatedCircle initialPosition={positionB} targetPosition={positionF} delay={0.2} />
      <AnimatedCircle initialPosition={positionC} targetPosition={positionD} delay={0.2} />

      {/* Decorative Teal Rectangles */}
      <Rectangle className={`absolute h-[155px] top-[90.07%] left-[10%] rotate-[-50deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[276px] top-[-8.35%] left-[20%] rotate-[-30deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[276px] top-[0%] left-[93%] rotate-[-50.35deg]`} isVisible={visiblity} />
      <Rectangle className={`absolute h-[500px] top-[50%] left-[98%] rotate-[10deg]`} isVisible={visiblity} />

      {/* Decorative Yello Circles */}
      <StaticCircle className={`top-[81.14%] left-[-2.5%]`} isVisible={visiblity} />
    </div>
  );
};

export default ReadyPage;
