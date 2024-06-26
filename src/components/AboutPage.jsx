import React from 'react';
import Button from './Button';

const creds = [
  <div ><a href="https://www.linkedin.com/in/nickakeygrowth/">Nick Akey</a></div>,
  <div ><a href="https://www.linkedin.com/in/takuyastern/">Takuya (Andrew) Stern</a></div>,
  <div ><a href="https://www.linkedin.com/in/rikonaito/">Riko Naito</a></div>,
  <div ><a href="https://www.linkedin.com/in/zerolinux5/">Jesus Magana</a></div>,
]

const AboutPage = () => (
  <div className="min-h-screen bg-[#8953CD] flex flex-col items-center justify-center text-white">
    <div className="text-center" style={{ width: '550px', height: '306px', top: '356px', left: '445px', gap: '24px' }}>
      <h1 className="text-4xl mb-4">About Us</h1>
      <p className="mb-6 text-20 leading-20 text-center dm-mono">
        Thanks for checking our work out!
        <br />
        This project was conceived and developed by 
        <div className='yellow-a mt-4'>
        {creds.sort(() => Math.random() - 0.5).map((cred) => cred)}
        </div>
        <br />
        Designed by <a className='yellow-a' href="https://www.linkedin.com/in/akeymarcela/">Marcela Akey</a>.
      </p>
      <div className="flex flex-col items-center dm-mono">
        <Button text="back" link="/" className="bg-white text-[#8953CD]" />
      </div>
    </div>
  </div>
);

export default AboutPage;
