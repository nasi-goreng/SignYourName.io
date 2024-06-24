import React, { useEffect, useRef } from 'react';
import { centerFrame, scaleFrame } from '../utils/tfjsUtils';
import PropTypes from 'prop-types'; 
// import { drawLandmarks } from '@mediapipe/drawing_utils';
import { predictONNX } from '../utils/onnxUtils'
import { predictTFJS } from '../utils/tfjsUtils'
import { TFJS } from '../modelConfigs';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const getLandmarkColor = (opacity) => {
  return `rgba(255, 0, 0, ${opacity})`;
};
let currentLandmarkOpacity = 0;
const targetLandmarkOpacity = 1;

const getConnectionColor = (opacity) => {
  return `rgba(0, 255, 0, ${opacity})`;
};
let currentConnectionOpacity = 0;
const targetConnectionOpacity = 1;

let currentDarkLayerOpacity = 0;
const targetDarkLayerOpacity = 0.6;

let framesBatch = [];

let TFJSmodel = null;

function WebcamFeed({ className, modelConfig, session, setPrediction, handleGestureSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    canvasElement.width = CANVAS_WIDTH; // Match the width set for the camera
    canvasElement.height = CANVAS_HEIGHT; // Match the height set for the camera

    const context = canvasElement.getContext('2d');

    // eslint-disable-next-line no-undef
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(async (results) => {
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
        //if hands detected ...
        if (results.multiHandLandmarks.length > 0) {

          //add to frames array
          if (framesBatch.length < modelConfig.frameBatchSize) {
            framesBatch.push(results.multiHandLandmarks[0]);
          } else {
            if(modelConfig.modelExportType === TFJS){
              predictTFJS(framesBatch, modelConfig, setPrediction, handleGestureSuccess);
            } else {
              predictONNX(framesBatch, session, setPrediction, handleGestureSuccess)
            }
            framesBatch = [];
          }

          //fade in dark layer
          if (currentDarkLayerOpacity < targetDarkLayerOpacity) {
            currentDarkLayerOpacity += 0.03;
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
            currentDarkLayerOpacity -= 0.01;
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
          const centeredLandmarks = scaleFrame(centerFrame(landmarks));
          //https://developers.google.com/mediapipe/api/solutions/js/tasks-vision.drawingoptions#drawingoptions_interface
          // eslint-disable-next-line no-undef
          drawConnectors(context, centeredLandmarks, HAND_CONNECTIONS, {
            color: getConnectionColor(currentConnectionOpacity),
            lineWidth: 3,
          });
          drawLandmarks(context, centeredLandmarks, { color: getLandmarkColor(currentLandmarkOpacity), radius: 6.3 });
        }
      }
      context.restore();
    });

    // eslint-disable-next-line no-undef
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });
    camera.start();
    return () => {
      camera.stop();
      hands.close();
      hands.onResults(null);
    };
  }, [session, modelConfig, setPrediction, handleGestureSuccess]);

  return (
    <div className={`${className} aspect-[16/9] relative`}>
      <video ref={videoRef} className="w-full h-full object-cover rounded-2xl" style={{ transform: 'scaleX(-1)' }} />
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 rounded-2xl"
        style={{ transform: 'scaleX(-1)' }}
      />
    </div>
  );
}

WebcamFeed.propTypes = {
  className: PropTypes.string.isRequired,
  modelConfig: PropTypes.object.isRequired,
  session: PropTypes.object,
  setPrediction: PropTypes.func.isRequired,
  handleGestureSuccess: PropTypes.func.isRequired,
}

export default WebcamFeed;
