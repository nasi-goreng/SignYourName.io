import React, { useEffect, useState } from 'react';

const SignImages = ({ name, successfulGestures, finishedSpellingName, setFinishedSpellingName, resetName, displaySuccessMessage, setDisplaySuccessMessage, onPressSkip }) => {
  const hasImages = name.length > 0;
  

  useEffect(() => {
    if (finishedSpellingName) {
      const bounceElements = async () => {
        for (let i = 0; i < name.length; i++) {
          const element = document.getElementById(`letter-${i}`);
          if (element) {
            element.classList.add('bounce');
            await new Promise((resolve) => setTimeout(resolve, 400));
            element.classList.remove('bounce');
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 200));

        setDisplaySuccessMessage(true);
        setFinishedSpellingName(false);
      };
      bounceElements();
    }
  }, [finishedSpellingName, name, setFinishedSpellingName]);

  return (
    <div id="sign-images" className="flex flex-col items-center mt-4">
      {hasImages && !displaySuccessMessage && <p className="h-[21px] dm-mono font-medium text-lg mb-3">Copy the gestures</p>}
      {displaySuccessMessage && (
        <p className="h-[21px] dm-mono font-medium text-lg mb-3">Great Work 💜 Now try typing <b>any</b> word!</p>
      )}
      <div className="flex flex-row justify-center flex-wrap">
        {name.split('').map((letter, index) => (
          <div key={index}>
            <div id={`letter-${index}`} className="relative m-2">
              <img
                src={`/images/examples/${letter}.jpg`}
                alt={letter}
                className="w-[150px] h-[150px] rounded-3xl"
                style={{
                  border: successfulGestures[index] ? "3px solid rgb(137 83 205)" : "3px solid #CDCDCD"
                }}
              />
              {successfulGestures[index] ? (
                <img src="/images/checkbox.png" alt="Success" className="absolute w-[24px] h-[24px] -top-2 left-30" />
              ) : (
                <div className="absolute bg-white border-[3px] border-[#8953CD] rounded-full w-[24px] h-[24px] -top-2 left-30"></div>
              )}
            </div>
            {!successfulGestures[index] && !successfulGestures.slice(0, index).includes(false) && (
              <div className="mb-3 text-center text-gray-500 underline cursor-pointer dm-mono text-sm skip-fade-in" onClick={onPressSkip}>skip</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignImages;
