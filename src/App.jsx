import React, { useState } from 'react';
import WebcamFeed from './WebcamFeed.jsx';
import { ReactComponent as CheckMark } from './assets/checkmark.svg';
import Header from './Header.jsx';

function App() {
  const [name, setName] = useState('');
  const [successfulGestures, setSuccessfulGestures] = useState([]); // New state

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
        <div class="m-4">
        <input type="text" value={name} placeholder="your name" onChange={handleNameChange}  class="bg-transparent py-1 border-2 border-gray-300 rounded-md text-gray-600 px-4 focus:outline-none" />
        </div>
        <WebcamFeed className="mb-4 w-full md:w-1/2" />
        <div id="sign-images" className="flex flex-wrap justify-center">
          {name.split('').map((letter, index) => (
        <div className="relative m-2">
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