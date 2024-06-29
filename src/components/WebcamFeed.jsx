import React, { useEffect, useRef } from 'react';
import { centerFrame, scaleFrame } from '../utils/tfjsUtils';
import PropTypes from 'prop-types';
import { predictONNX } from '../utils/onnxUtils';
import { predictTFJS } from '../utils/tfjsUtils';
import { TFJS } from '../modelConfigs';
import { useOnnxSession } from '../utils/OnnxSessionContext';

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;

const getBackgroundColor = (opacity) => `rgba(90, 44, 149, ${opacity})`;
const getLandmarkColor = (opacity) => `rgba(255, 224, 143, ${opacity})`;
const getConnectionColor = (opacity) => `rgba(156, 194, 194, ${opacity})`;

let currentLandmarkOpacity = 0;
const targetLandmarkOpacity = 1;
let currentConnectionOpacity = 0;
const targetConnectionOpacity = 1;
let currentDarkLayerOpacity = 0;
const targetDarkLayerOpacity = 0.6;
let framesBatch = [];
let TFJSmodel = null;

function WebcamFeed({ className, modelConfig, setPrediction, handleGestureSuccess }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const session = useOnnxSession();
  const handsRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext('2d');

    canvasElement.width = CANVAS_WIDTH;
    canvasElement.height = CANVAS_HEIGHT;

    handsRef.current = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handsRef.current.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    handsRef.current.onResults(async (results) => {
      context.save();
      context.clearRect(0, 0, canvasElement.width, canvasElement.height);
      context.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
      if (results.multiHandLandmarks.length) {
        console.log(results.multiHandLandmarks);
        context.fillStyle = getBackgroundColor(currentDarkLayerOpacity);
        context.fillRect(0, 0, canvasElement.width, canvasElement.height);
        if (results.multiHandLandmarks.length > 0) {
          if (framesBatch.length < modelConfig.frameBatchSize) {
            framesBatch.push(results.multiHandLandmarks[0]);
          } else {
            if (modelConfig.modelExportType === TFJS) {
              predictTFJS(framesBatch, modelConfig, setPrediction, handleGestureSuccess);
            } else {
              predictONNX(framesBatch, session, setPrediction, handleGestureSuccess);
            }
            framesBatch = [];
          }

          if (currentDarkLayerOpacity < targetDarkLayerOpacity) {
            currentDarkLayerOpacity += 0.03;
          }
          if (currentLandmarkOpacity < targetLandmarkOpacity) {
            currentLandmarkOpacity += 0.03;
          }
          if (currentConnectionOpacity < targetConnectionOpacity) {
            currentConnectionOpacity += 0.03;
          }
        } else {
          if (currentDarkLayerOpacity > 0) {
            currentDarkLayerOpacity -= 0.01;
            context.fillStyle = getBackgroundColor(currentDarkLayerOpacity);
            context.fillRect(0, 0, canvasElement.width, canvasElement.height);
          }
          if (currentLandmarkOpacity > 0) {
            currentLandmarkOpacity = 0;
          }
          if (currentConnectionOpacity > 0) {
            currentConnectionOpacity = 0;
          }
        }

        for (const landmarks of results.multiHandLandmarks) {
          const centeredLandmarks = scaleFrame(centerFrame(landmarks));
          drawConnectors(context, centeredLandmarks, HAND_CONNECTIONS, {
            color: getConnectionColor(currentConnectionOpacity),
            lineWidth: 7,
          });
          drawLandmarks(context, centeredLandmarks, { color: getLandmarkColor(currentLandmarkOpacity), radius: 8 });
        }
      }
      context.restore();
    });

    cameraRef.current = new Camera(videoElement, {
      onFrame: async () => {
        await handsRef.current.send({ image: videoElement });
      },
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    cameraRef.current.start();

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      if (handsRef.current) {
        handsRef.current.close();
        handsRef.current.onResults(null);
      }
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
  setPrediction: PropTypes.func.isRequired,
  handleGestureSuccess: PropTypes.func.isRequired,
};

export default WebcamFeed;
