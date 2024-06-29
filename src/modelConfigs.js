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
        name: "MultiLSTM",
        frameBatchSize: 30,
        modelExportType: ONNX,
        path: "/model_full.onnx",
        stepSize: 10,
        normalization: []
    },
    model3: {
        name: "CNN-GRU",
        frameBatchSize: 60,
        modelExportType: ONNX,
        path: "/model_arg.onnx",
        stepSize: 10,
        normalization: []
    }    
}

