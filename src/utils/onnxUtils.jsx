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
    return new Float32Array(flattenedFrames);
};

const indexToLetter = (index) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters[index] || '';
};

export const predictONNX = async (handLandmarks, session) => {
    if (handLandmarks && handLandmarks.length === 30) {
        
        try {
            // Prepare input data
            const concatenatedFrames = transformFrames(handLandmarks);
            const inputTensor = new ort.Tensor('float32', concatenatedFrames, [1, 30, 63]);

            // Run the model
            const results = await session.run({ input: inputTensor });

            // Get the output
            const outputTensor = results.output;
            const prediction = outputTensor.data;
            const predictedIndex = prediction.indexOf(Math.max(...prediction));

            return indexToLetter(predictedIndex);
        } catch (err) {
            console.error('Failed to load ONNX model:', err);
            return null;
        }
    } else {
        return null;
    }
}
