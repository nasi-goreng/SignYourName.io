import * as tf from '@tensorflow/tfjs';


export const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export async function loadModel(path) {
  const model = await tf.loadLayersModel(path);
  return model;
}

export const centerFrame = (frame) => {
  let centroidX = 0,
    centroidY = 0,
    centroidZ = 0;
  frame.forEach((coord) => {
    centroidX += coord.x;
    centroidY += coord.y;
    centroidZ += coord.z;
  });
  const n = frame.length;
  centroidX /= n;
  centroidY /= n;
  centroidZ /= n;

  const translatedFrame = frame.map((coord) => ({
    x: coord.x - centroidX + 0.5,
    y: coord.y - centroidY + 0.5,
    z: coord.z - centroidZ + 0.5,
  }));

  return translatedFrame;
};

export const scaleFrame = (frame) => {
  let centroidX = 0,
    centroidY = 0,
    centroidZ = 0;
  frame.forEach((coord) => {
    centroidX += coord.x;
    centroidY += coord.y;
    centroidZ += coord.z;
  });
  const n = frame.length;
  centroidX /= n;
  centroidY /= n;
  centroidZ /= n;

  let totalDistance = 0;
  frame.forEach((coord) => {
    totalDistance += Math.sqrt(
      Math.pow(coord.x - centroidX, 2) + Math.pow(coord.y - centroidY, 2) + Math.pow(coord.z - centroidZ, 2)
    );
  });
  const averageDistance = totalDistance / n;

  const desiredAverageDistance = 0.1;
  const scalingFactor = desiredAverageDistance / averageDistance;

  const normalizedFrame = frame.map((coord) => ({
    x: (coord.x - centroidX) * scalingFactor + centroidX,
    y: (coord.y - centroidY) * scalingFactor + centroidY,
    z: (coord.z - centroidZ) * scalingFactor + centroidZ,
  }));

  return normalizedFrame;
};

export const preProcess = (batch, modelConfig) => {

  const normalization = modelConfig.normalization;

  const centeredBatch = batch.map((frame) => {
    let normalized = frame;
    if (normalization.includes("center")) {
      normalized = centerFrame(frame);
    }
    if (normalization.includes("scale")) {
      normalized = scaleFrame(normalized);
    }
    return normalized;
  });

  const formattedForModel = centeredBatch.map((batch) => {
    return batch.map(({ x, y, z }) => {
      return [x, y, z];
    });
  });

  const flattenedBatch = formattedForModel.map((landMarks) => landMarks.reduce((acc, curr) => [...acc, ...curr], []));

  const inputTensor = tf.tensor3d([flattenedBatch]);

  return inputTensor;
};

export const predictTFJS = async (inputData) => {
  if (!model) {
    model = await loadModel(modelConfigs[selectedModel].path);
  }

  const processedBatch = preProcess(inputData, modelConfigs[selectedModel]);
  const output = model.predict(processedBatch);
  const probabilities = await output.array();
  const probabilitiesInner = probabilities[0];
  const sortedIndices = probabilitiesInner
    .map((prob, index) => ({ prob, index }))
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 3);

  return letters[sortedIndices[0].index];
};