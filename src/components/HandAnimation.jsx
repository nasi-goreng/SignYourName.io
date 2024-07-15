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
    <div className="w-[25vw]  max-w-[392px] ml-4 flex items-center justify-center z-10">
      {currentImage ? <img src={currentImage} alt="letter" className="h-full" /> : null}
    </div>
  );
};

export default HandAnimation;
