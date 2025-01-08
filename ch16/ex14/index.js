import { Worker } from "worker_threads";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

if (!inputFilePath || !outputFilePath) {
  console.error("Usage: node index.js [inputFilePath] [outputFilePath]");
  process.exit(1);
}

// 同一ディレクトリにimageProcessWorker.jsがあることが前提
// workerDataがキーのデータをWorkerに渡す
const worker = new Worker(path.join(__dirname, "imageProcessWorker.js"), {
  workerData: { inputFilePath, outputFilePath },
});

worker.on("message", (message) => {
  console.log(message);
});

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

worker.on("exit", (code) => {
  if (code !== 0) {
    console.error(`Worker stopped with exit code ${code}`);
  }
});
