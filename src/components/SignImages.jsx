import React from 'react';
// import CheckMark from './CheckMark'; // Adjust the import path as necessary

const SignImages = ({ name, successfulGestures }) => {
  return (
    <div id="sign-images" className="flex flex-col items-center mt-6">
      <p className="h-[21px] dm-mono font-medium text-lg mb-5">Copy the gestures</p>
      <div className="flex flex-row justify-center flex-wrap">
        {name.split('').map((letter, index) => (
          <div key={index} className="relative m-2">
            <img
              src={`/images/examples/${letter}.jpg`}
              alt={letter}
              className="w-[104px] h-[104px] rounded-3xl border-[3px] border-[#CDCDCD]"
            />
            {/* {successfulGestures[index] && <CheckMark className="absolute inset-0 w-full h-full text-green-500" />} */}
            <div className="absolute bg-white border-[3px] border-[#8953CD] rounded-full w-[24px] h-[24px] -top-2 left-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SignImages;
