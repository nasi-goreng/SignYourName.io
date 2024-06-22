import React from 'react';
import Button from './Button';

const ReadyPage = () => (
  <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl mb-4">Ready?</h1>
      <p className="mb-6">Type your name, then copy the hand shapes with your own hand.</p>
      <div className="flex flex-col items-center">
        <Button text="start" link="/sign" />
        <Button text="back" link="/" className="bg-transparent text-[#A29995]" />
      </div>
    </div>
  </div>
);

export default ReadyPage;
