import React, { useState } from 'react';
import WebcamFeed from './WebcamFeed.jsx';
import { ReactComponent as CheckMark } from './assets/checkmark.svg';
import Header from './Header.jsx';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

async function loadModel() {
  const model = await tf.loadLayersModel('/images/model.json');
  return model;
}

// const calcFrameCentroid = (frame) => {
//   let xSum = 0;
//   let ySum = 0;
//   let zSum = 0;
//   frame.forEach(({x, y, z}) => {
//     xSum += x;
//     ySum += y;
//     zSum += z;
//   })
//   const xMean = xSum / frame.length;
//   const yMean = ySum / frame.length;
//   const zMean = zSum / frame.length;
//   const xMeanCentered = xMean - .5;
//   const yMeanCentered = yMean - .5;
//   const zMeanCentered = zMean;
//   return {xMeanCentered, yMeanCentered, zMeanCentered};
// }

export const centerFrame = (frame) => {
    // Calculate the centroid of the frame
    let centroidX = 0, centroidY = 0, centroidZ = 0;
    frame.forEach(coord => {
        centroidX += coord.x;
        centroidY += coord.y;
        centroidZ += coord.z;
    });
    const n = frame.length;
    centroidX /= n;
    centroidY /= n;
    centroidZ /= n;

    // Translate the frame to the origin centered at (0.5, 0.5, 0.5)
    const translatedFrame = frame.map(coord => ({
        x: coord.x - centroidX + 0.5,
        y: coord.y - centroidY + 0.5,
        z: coord.z - centroidZ + 0.5
    }));

    return translatedFrame;
}

export const scaleFrame = (frame) => {
  // Calculate the centroid of the frame
  let centroidX = 0, centroidY = 0, centroidZ = 0;
  frame.forEach(coord => {
      centroidX += coord.x;
      centroidY += coord.y;
      centroidZ += coord.z;
  });
  const n = frame.length;
  centroidX /= n;
  centroidY /= n;
  centroidZ /= n;

  // Calculate the average distance from the centroid to all points
  let totalDistance = 0;
  frame.forEach(coord => {
      totalDistance += Math.sqrt(
          Math.pow(coord.x - centroidX, 2) +
          Math.pow(coord.y - centroidY, 2) +
          Math.pow(coord.z - centroidZ, 2)
      );
  });
  const averageDistance = totalDistance / n;

  // Calculate the scaling factor to normalize the average distance to a fixed value (e.g., 0.1)
  const desiredAverageDistance = 0.1;
  const scalingFactor = desiredAverageDistance / averageDistance;

  // Apply the scaling transformation to the entire frame
  const normalizedFrame = frame.map(coord => ({
      x: (coord.x - centroidX) * scalingFactor + centroidX,
      y: (coord.y - centroidY) * scalingFactor + centroidY,
      z: (coord.z - centroidZ) * scalingFactor + centroidZ
  }));

  return normalizedFrame;
}

export const normalizeBatch = (batch) => {
  const normalizedBatch = batch.map(frame => centerFrame(scaleFrame(frame)));
  return normalizedBatch;
}

let model = null;

/*
  This is where you will write the logic to turn the hand landmarks into whatever format you need for your model....

*/
let logged = false;

const preProcess = (batch) => {
  
  
  //scale and center the frames
  const centeredBatch = batch.map(frame => scaleFrame(centerFrame(frame)));

  //restructure so its a series of arrays instead of objects
  const formattedForModel = centeredBatch.map(batch => {
    return batch.map(({x, y, z}) => {
      return [x, y, z];
    });
  });

  //flatten that into 
  const flattenedBatch = formattedForModel.map(landMarks => landMarks.reduce((acc, curr) => [...acc, ...curr], []));
  // if(!logged) {
    console.log("flattened batch ", flattenedBatch[0][2])
  //   logged = true;
  // }
  
  const inputTensor = tf.tensor3d([flattenedBatch]);

  return inputTensor
}

function App() {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]); // New state
  const [prediction, setPrediction] = useState('');

  const predict = async (inputData) => {
    if (!model) {
      model = await loadModel();
    }

    const processedBatch = preProcess(inputData)

    const output = model.predict(processedBatch);
    const probabilities = await output.array();
    const probabilitiesInner = probabilities[0];
    const sortedIndices = probabilitiesInner.map((prob, index) => ({ prob, index }))
      .sort((a, b) => b.prob - a.prob)
      .slice(0, 3);
    // sortedIndices.forEach(({ prob, index }) => {
    //   console.log(`Letter: ${letters[index]}, Probability: ${(prob * 100).toFixed(2)}%`);
    // });
    const predictedLetter = letters[sortedIndices[0].index];
    setPrediction(predictedLetter);
  }

  const onFrameBatchFull = async (batch) => {
    //batch comes in as 10x21x3
    //flatten the sub arrays so that it is 10x63


    //const normalizedInputTensor = normalizeInputData(inputTensor);


    // Check the shape of the tensor
    predict(batch);
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