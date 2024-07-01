import * as ort from 'onnxruntime-web';

const transformFrames = (frames) => {
    const flattenedFrames = [];
    // Flatten the array of objects into an array of numbers
    for (const frame of frames) {
      for (const mapping of frame) {
        const { x, y, z } = mapping;
        flattenedFrames.push(x, y, z);
      }
    }
  const concatenatedFrames = new Float32Array(flattenedFrames);
  return new ort.Tensor('float32', concatenatedFrames, [1, 30, 63]);
};

const preprocess = (landmarks) => {
  const flattenedArray = landmarks.flatMap((frame) => frame.map((point) => [point.x, point.y, point.z])).flat();
  const transposedArray = [[], [], []];
  for (let i = 0; i < flattenedArray.length; i += 3) {
    transposedArray[0].push(flattenedArray[i]);
    transposedArray[1].push(flattenedArray[i + 1]);
    transposedArray[2].push(flattenedArray[i + 2]);
  }
  const flatTransposedArray = transposedArray.flat();
  const tensor = new Float32Array(flatTransposedArray);
  return new ort.Tensor('float32', tensor, [1, 3, 1260]);
};

// riko 30 frameBatchSize version (30, 21, 3) ==> (630, 3) ==> (3, 630)
const preprocessForModel4 = (landmarks) => {
  const flattenedArray = landmarks.flatMap((frame) => frame.map((point) => [point.x, point.y, point.z])).flat();
  const transposedArray = [[], [], []];
  for (let i = 0; i < flattenedArray.length; i += 3) {
    transposedArray[0].push(flattenedArray[i]);
    transposedArray[1].push(flattenedArray[i + 1]);
    transposedArray[2].push(flattenedArray[i + 2]);
  }
  const flatTransposedArray = transposedArray.flat();
  const tensor = new Float32Array(flatTransposedArray);
  return new ort.Tensor('float32', tensor, [1, 3, 630]);
}

export const indexToLetter = (index) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[index] || '';
};

export const predictONNX = async (handLandmarks, setPrediction, handleGestureSuccess, session, modelConfig) => {
  if (!session) {
    console.error('ONNX session is not loaded.');
    return;
  }

  if (handLandmarks) {
    try {
      let inputTensor;
      if (modelConfig.id === 'model3' ) {
        inputTensor = transformFrames(handLandmarks);
      } else if (modelConfig.id === 'model2' ) {
        inputTensor = preprocess(handLandmarks);
      } else if (modelConfig.id === 'model4' ) {
        inputTensor = preprocessForModel4(handLandmarks);
      } else {
        throw new Error('Invalid number of hand landmarks');
      }

      const inputName = session.inputNames[0];

      const results = await session.run({ [inputName]: inputTensor });
      const outputTensor = results[session.outputNames[0]];
      const prediction = outputTensor.data;
      const predictedIndex = prediction.indexOf(Math.max(...prediction));

      setPrediction(indexToLetter(predictedIndex));
      handleGestureSuccess(indexToLetter(predictedIndex));
    } catch (err) {
      console.error('Error in predictONNX:', err);
      return null;
    }
  } else {
    return null;
  }
};
