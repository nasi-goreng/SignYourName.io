export const TFJS = 'tfjs';
export const ONNX = 'onnx';

export const modelConfigs = {
  model1: {
    name: 'single layer LSTM (fastest)',
    frameBatchSize: 10,
    modelExportType: TFJS,
    path: '/images/model1.json',
    stepSize: 10,
    normalization: ['center', 'scale'],
  },
  model2: {
    id: 'model2',
    name: 'CNN-GRU (most accurate)',
    frameBatchSize: 30,
    modelExportType: ONNX,
    path: '/model977.onnx',
    stepSize: 10,
    normalization: [],
  },
  model3: {
    id: 'model3',
    name: 'multi layer LSTM (experimental)',
    frameBatchSize: 30,
    modelExportType: ONNX,
    path: '/model_full.onnx',
    stepSize: 10,
    normalization: [],
  },
  //   model4: {
  //     id: 'model4',
  //     name: 'CNN-GRU 30fps',
  //     frameBatchSize: 30,
  //     modelExportType: ONNX,
  //     path: '/model977.onnx',
  //     stepSize: 10,
  //     normalization: [],
  //   },
};
