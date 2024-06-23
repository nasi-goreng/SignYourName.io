import React from 'react';
import Button from './Button';

const AboutPage = () => (
  <div className="min-h-screen bg-[#8953CD] flex flex-col items-center justify-center text-white">
    <div className="text-center" style={{ width: '550px', height: '306px', top: '356px', left: '445px', gap: '24px' }}>
      <h1 className="text-4xl mb-4">About Us</h1>
      <p className="mb-6 text-20 leading-20 text-center">
        Thanks for checking our work out!
        <br />
        This project was conceived and developed by Deep Atlas alumni: Nicholas Akey, Name, Name, Name.
        <br />
        Designed by Marcela Akey.
      </p>
      <div className="flex flex-col items-center">
        <Button text="Back" link="/" className="bg-white text-[#8953CD]" />
      </div>
    </div>
  </div>
);

export default AboutPage;
