import React, { useEffect, useRef } from 'react';

function WebcamFeed({ className }) {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, []);

  return (
    <div className={`${className} aspect-[16/9]`}>
      <video ref={videoRef} className="w-full h-full object-cover" />
    </div>
  );
}

export default WebcamFeed;