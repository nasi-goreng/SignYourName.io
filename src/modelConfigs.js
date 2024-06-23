export const modelConfigs = {
    model1: {
        name: "Single Layer LSTM",
        frameBatchSize: 10,
        modelExportType: "tfjs",
        path: "/images/model1.json",
        stepSize: 10,
        normalization: ["center", "scale"]
    },
    model2: {
        name: "Jesus Model",
        frameBatchSize: 30,
        modelExportType: "onnx",
        path: "/model_full.onnx",
        stepSize: 10,
        normalization: []
    }    
}