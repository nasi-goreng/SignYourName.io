export const TFJS = "tfjs"
export const ONNX = "onnx"

export const modelConfigs = {
    model1: {
        name: "single layer LSTM (fastest)",
        frameBatchSize: 10,
        modelExportType: TFJS,
        path: "/images/model1.json",
        stepSize: 10,
        normalization: ["center", "scale"]
    },
    model2: {
        name: "CNN-GRU (most accurate)",
        frameBatchSize: 60,
        modelExportType: ONNX,
        path: "/model_arg.onnx",
        stepSize: 10,
        normalization: []
    }, 
    model3: {
        name: "multi layer LSTM (experimental)",
        frameBatchSize: 30,
        modelExportType: ONNX,
        path: "/model_full.onnx",
        stepSize: 10,
        normalization: []
    },
}

