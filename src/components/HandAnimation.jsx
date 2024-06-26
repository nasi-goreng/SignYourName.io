import React, { useState, useEffect } from 'react';

const HandAnimation = ({ currentLetter }) => {
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (currentLetter) {
      setCurrentImage(`/images/handIllustrations/${currentLetter}.png`);
    } else {
      setCurrentImage('');
    }
  }, [currentLetter]);

  return (
    <div className="w-[392px] h-[538px] ml-4 flex items-center justify-center">
      {currentImage ? <img src={currentImage} alt="letter" className="w-full h-full" /> : null}
    </div>
  );
};

export default HandAnimation;
