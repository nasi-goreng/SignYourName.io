// MobileLandingPage.jsx
import React, { useState, useEffect } from 'react';

const imagePath = '/images/handIllustrations/';
const images = ['A', 'C', 'E', 'I', 'L', 'N', 'U'];

const MobileLandingPage = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(images[Math.floor(Math.random() * images.length)]);
    }, 2000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="overflow-hidden min-h-screen bg-[#8953CD] flex flex-col items-center justify-center text-white space-y-10">
      <h1 className="text-4xl font-semibold relative text-white">
        Sign<i>Your </i>Name.io
      </h1>
      <div className="h-[25vh] flex items-center justify-center z-10">
        <img src={imagePath + currentImage + '.png'} alt="Hand Illustration" className="h-full" />
      </div>
      <p className="mt-6 text-base leading-20 text-center dm-mono mx-4">
        Sorry, our site is not optimized for mobile devices :(
        <br />
        <br />
        Please visit us again from your desktop
        to check out the project!
      </p>
    </div>
  );
};

export default MobileLandingPage;
