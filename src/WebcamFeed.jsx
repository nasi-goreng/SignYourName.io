import React, { useEffect, useRef } from 'react';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

//https://developers.google.com/mediapipe/api/solutions/js/tasks-vision.drawingutils
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const getLandmarkColor = (opacity) => {
  return `rgba(255, 0, 0, ${opacity})`
}
let currentLandmarkOpacity = 0;
const targetLandmarkOpacity = 1;

const getConnectionColor = (opacity) => {
  return `rgba(0, 255, 0, ${opacity})`
}
let currentConnectionOpacity = 0;
const targetConnectionOpacity = 1;


let currentDarkLayerOpacity = 0;
const targetDarkLayerOpacity = 0.6;

function WebcamFeed({ className }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;


    canvasElement.width = CANVAS_WIDTH;  // Match the width set for the camera
    canvasElement.height = CANVAS_HEIGHT; // Match the height set for the camera

    const context = canvasElement.getContext('2d');

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results) => {

      /* 
        this is the interface for results 
        export interface Results {
          multiHandLandmarks: NormalizedLandmarkListList;
          multiHandWorldLandmarks: LandmarkListList;
          multiHandedness: Handedness[]; //this tells us left or right
          image: GpuBuffer; //this is what we draw onto the canvas
        }
      */

      context.save();
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
      context.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      if (results.multiHandLandmarks) {

        context.fillStyle = `rgba(0, 0, 0, ${currentDarkLayerOpacity})`; // Set the overlay color to dark grey with 50% opacity
        context.fillRect(0, 0, canvasElement.width, canvasElement.height); // Cover the entire canvas with the overlay        

        //if hands detected, fade in some layers
        if(results.multiHandLandmarks.length > 0) {

          //fade in dark layer
          if (currentDarkLayerOpacity < targetDarkLayerOpacity) {
            currentDarkLayerOpacity += .03;
          }

          //fade in landmarks and connections
          if (currentLandmarkOpacity < targetLandmarkOpacity) {
            currentLandmarkOpacity += 0.03;
          }
          if (currentConnectionOpacity < targetConnectionOpacity) {
            currentConnectionOpacity += 0.03;
          }
        } else {
        //if no hands detected, fade out layers

          //fade out dark backgroud
          if (currentDarkLayerOpacity > 0) {
            currentDarkLayerOpacity -= 0.03;
            context.fillStyle = `rgba(0, 0, 0, ${currentDarkLayerOpacity})`;
            context.fillRect(0, 0, canvasElement.width, canvasElement.height);
          }

          //reset hand opacity
          if (currentLandmarkOpacity > 0) {
            currentLandmarkOpacity = 0;
          }
          if (currentConnectionOpacity > 0) {
            currentConnectionOpacity = 0;
          }
        }
       

        //draw the hand landmarks
        for (const landmarks of results.multiHandLandmarks) {

          //https://developers.google.com/mediapipe/api/solutions/js/tasks-vision.drawingoptions#drawingoptions_interface
          drawConnectors(context, landmarks, HAND_CONNECTIONS, { color: getConnectionColor(currentConnectionOpacity), lineWidth: 3 });
          drawLandmarks(context, landmarks, { color: getLandmarkColor(currentLandmarkOpacity), radius: 6.3 });
        }
      }
      context.restore();
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT
    });
    camera.start();

  }, []);

  return (
    <div className={`${className} aspect-[16/9] relative`}>
      <video ref={videoRef} className="w-full h-full object-cover" style={{ display: 'none' }} />
      <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0" />
    </div>
  );
}

export default WebcamFeed;