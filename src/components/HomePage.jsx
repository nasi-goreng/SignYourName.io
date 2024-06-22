import React from 'react';
import Button from './Button';

const HomePage = () => (
  <div className="min-h-screen bg-[#FEF5F1] flex flex-col items-center justify-center relative overflow-hidden">
    <div className="text-left w-[441px] h-[512px] absolute top-[298px] left-[213px] gap-[32px] flex flex-col items-start">
      <h1 className="font-circular-std text-[80px] font-[450] leading-[80px] text-[#2B2B2B] mb-4">
        Hello, my name is...
      </h1>
      <div className="relative">
        <div className="animate-blink w-[2px] h-[104px] bg-[#2B2B2B] absolute top-0"></div>
      </div>
      <p
        className="w-[441px] h-auto px-4 py-2 mt-28 bg-[#FFFFFF] border-[3px] border-[#CDCDCD] rounded-[24px] text-lg shadow-md"
        style={{ paddingTop: '18px', gap: '10px' }}
      >
        Learn how to introduce yourself in ASL! Use Machine Learning to sign your name in seconds.
        <div className="mt-4">
          <Button text="let's go" link="/ready" />
        </div>
      </p>
    </div>
  </div>
);

export default HomePage;
