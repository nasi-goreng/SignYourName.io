import React from 'react';
import Button from './Button';

const ReadyPage = () => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
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

export default ReadyPage;
