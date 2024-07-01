export const TFJS = "tfjs"
export const ONNX = "onnx"

export const modelConfigs = {
    model1: {
        name: "Single Layer LSTM",
        frameBatchSize: 10,
        modelExportType: TFJS,
        path: "/images/model1.json",
        stepSize: 10,
        normalization: ["center", "scale"]
    },
    model2: {
        id: "model2",
        name: "CNN-GRU",
        frameBatchSize: 60,
        modelExportType: ONNX,
        path: "/model_60fps.onnx",
        stepSize: 10,
        normalization: []
    },
    model3: {
        id: "model3",
        name: "MultiLSTM",
        frameBatchSize: 30,
        modelExportType: ONNX,
        path: "/model_full.onnx",
        stepSize: 10,
        normalization: []
    },
    model4: {
        id: "model4",
        name: "CNN-GRU 30fps",
        frameBatchSize: 30,
        modelExportType: ONNX,
        path: "/model_30fps.onnx",
        stepSize: 10,
        normalization: []
    },
        
}

