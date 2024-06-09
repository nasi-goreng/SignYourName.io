import React, { useState } from 'react';
import WebcamFeed from './WebcamFeed.jsx';
import { ReactComponent as CheckMark } from './assets/checkmark.svg';
import Header from './Header.jsx';

const letters = ['C', 'G', 'J', 'M', 'N', 'Z'];

async function loadModel() {
  const model = await tf.loadLayersModel('/images/model.json');
  return model;
}

const calcFrameCentroid = (frame) => {
  let xSum = 0;
  let ySum = 0;
  frame.forEach(({x, y}) => {
    xSum += x;
    ySum += y;
  })
  const xMean = xSum / frame.length;
  const yMean = ySum / frame.length;
  const xMeanCentered = xMean - .5;
  const yMeanCentered = yMean - .5;
  return {xMeanCentered, yMeanCentered};
}

export const centerFrame = (frame) => {
  const {xMeanCentered, yMeanCentered} = calcFrameCentroid(frame);

  const centeredFrame = frame.map(({x, y, z}) => ({x: x - xMeanCentered, y: y - yMeanCentered, z: z}));
  return centeredFrame;
}

export const scaleFrame = (frame) => {
  const goal_average_distance = .1
  const n = frame.length
  const averageDistance = frame.reduce((acc, coord) => {
    const distance = Math.sqrt(Math.pow(coord.x - 0.5, 2) + Math.pow(coord.y - 0.5, 2));
    acc += distance;
    return acc;
  }, 0) / n;
  console.log('Average Distance:', averageDistance);

  const scalingFactor = goal_average_distance / averageDistance;
  console.log('Scaling Factor:', scalingFactor);
  
  const scaledCoords = frame.map(coord => {
    return {
        x: 0.5 + scalingFactor * (coord.x - 0.5),
        y: 0.5 + scalingFactor * (coord.y - 0.5)
    };
  });
  return scaledCoords
}

export const normalizeBatch = (batch) => {
  const normalizedBatch = batch.map(frame => centerFrame(scaleFrame(frame)));
  return normalizedBatch;
}

let model = null;

function App() {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]); // New state
  const [prediction, setPrediction] = useState('');

  const predict = async (inputData) => {
    
  
    if(!model) {
      model = await loadModel();
    }
    const output = model.predict(inputData);
    const probabilities = await output.array();
    const probabilitiesInner = probabilities[0]
    const maxProb = Math.max(...probabilitiesInner)
    const maxProbabilityIndex = probabilitiesInner.indexOf(maxProb);
    const predictedLetter = letters[maxProbabilityIndex];
    setPrediction(predictedLetter)
  }

  const onFrameBatchFull = async (batch) => {
    //batch comes in as 10x21x3
    //flatten the sub arrays so that it is 10x63
    const flattenedBatch = batch.map(landMarks => landMarks.reduce((acc, curr) => [...acc, ...curr], []));
    
    const inputTensor = tf.tensor3d([flattenedBatch]);

    //const normalizedInputTensor = normalizeInputData(inputTensor);


    // Check the shape of the tensor
    predict(inputTensor);
  }



  const handleNameChange = (event) => {
    setName(event.target.value.toUpperCase());
    // create an array of false values with the same length as the name state
    setSuccessfulGestures(new Array(event.target.value.length).fill(false));
  };

  // Call this function when a gesture is successfully made
  const handleGestureSuccess = (gesture) => {
    // get the index of the first flase value in the successfulGestures array
    const index = successfulGestures.indexOf(false);
    const nextLetter = name[index];
    // check if the gesture is the correct gesture for the next letter in the name
    if (gesture === nextLetter) {
      // create a new array with the same values as successfulGestures
      const newSuccessfulGestures = [...successfulGestures];
      // set the value at the index to true
      newSuccessfulGestures[index] = true;
      // update the successfulGestures state with the new array
      setSuccessfulGestures(newSuccessfulGestures);
    }
  };

  return (
    <>
      <Header />
      <div className="App flex flex-col items-center">
        {/* <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">SignYourName.io</h1> */}
        <div className="mb-4">
        <input type="text" value={name} placeholder="your name" onChange={handleNameChange}  className="bg-transparent py-1 border-2 border-gray-300 rounded-md text-gray-600 px-4 focus:outline-none" />
        </div>
        <WebcamFeed onFrameBatchFull={onFrameBatchFull} className="mb-4 w-full md:w-1/2" />
        <div>{prediction}</div>
        <div id="sign-images" className="flex flex-wrap justify-center">
          {name.split('').map((letter, index) => (
            <div key={index} className="relative m-2">
              <img key={index} src={`/images/${letter}.jpg`} alt={letter} className="w-full h-full" />
              {successfulGestures[index] && <CheckMark className="absolute inset-0 w-full h-full text-green-500" />} {/* Conditionally render check mark */}
              {/* https://commons.wikimedia.org/wiki/File:Eo_circle_green_checkmark.svg */}
            </div>
          ))}
        </div>
        <button onClick={() => handleGestureSuccess('A')} className="mb-4 p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500">Simulate 'A' Gesture</button>
      </div>
    </>
  );
}

export default App;