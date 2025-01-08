import { parentPort, workerData } from "worker_threads";
import sharp from "sharp";
import fs from "fs";

// Workerから渡されたデータを取得
const { inputFilePath, outputFilePath } = workerData;

// ガウシアンフィルタを適用
async function applyGaussianFilter(inputPath, outputPath) {
  try {
    // 画像読み込み(sharpパッケージが必要)
    const image = sharp(inputPath);
    const { width, height } = await image.metadata();

    // ガウシアンフィルタ
    const blurredImage = await image
      .resize(width, height)
      .blur(2) // フィルタの強度
      .toBuffer();

    // 適用後の画像を保存
    fs.writeFileSync(outputPath, blurredImage);
    parentPort.postMessage("Image processing complete!!!");
  } catch (error) {
    parentPort.postMessage(`Error: ${error.message}`);
  }
}

applyGaussianFilter(inputFilePath, outputFilePath);
