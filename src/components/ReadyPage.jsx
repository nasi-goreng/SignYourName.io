import React from 'react';
import Button from './Button';
import AnimatedCircle from './AnimatedCircle';

const ReadyPage = () => {
  // const positionA = { top: -61, left: 649 };
  // const positionB = { top: 815, left: 1172 };
  // const positionC = { top: 61, left: 1336 };

  const positionA = { top: '-6%', left: '45%' };
  const positionB = { top: '80%', left: '81.4%' };
  const positionC = { top: '6%', left: '92.8%' };

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
      <AnimatedCircle initialPosition={positionC} targetPosition={positionA} delay={0.2} />
      <AnimatedCircle initialPosition={positionA} targetPosition={positionB} delay={0.2} />
      <AnimatedCircle initialPosition={positionB} targetPosition={positionC} delay={0.2} />
      <div className="text-center">
        <h1 className="text-5xl mb-4 font-[450]">Ready?</h1>
        <p className="mb-6 font-normal text-xl">Type your name, then copy the hand shapes with your own hand.</p>
        <div className="flex flex-col items-center">
          <Button text="start" link="/sign" />
          <Button text="back" link="/" className="bg-transparent text-[#A29995]" />
        </div>
      </div>
    </div>
  );
};

export default ReadyPage;
