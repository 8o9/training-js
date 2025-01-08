document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  //! 以下関数はWorkerスレッド、imageProcessWorker.jsに移す
  // const applyGaussianFilter = (data, width, height) => {
  //   // 5x5で固定
  //   const gaussKernel5x5 = [
  //     [1, 4, 7, 4, 1],
  //     [4, 16, 26, 16, 4],
  //     [7, 26, 41, 26, 7],
  //     [4, 16, 26, 16, 4],
  //     [1, 4, 7, 4, 1],
  //   ];
  //   const normalizedGaussKernel5x5 = gaussKernel5x5.map((row) =>
  //     row.map((value) => value / 256),
  //   );

  //   const filterD = new Uint8ClampedArray(data.length);
  //   const radius = 2; // 5x5のフィルタなので1画素から2ずつ離れたところまで

  //   for (let y = 0; y < height; y++) {
  //     for (let x = 0; x < width; x++) {
  //       // フィルタ後のRGBA値
  //       let rSum = 0,
  //         gSum = 0,
  //         bSum = 0,
  //         aSum = 0;

  //       for (let ky = -radius; ky <= radius; ky++) {
  //         for (let kx = -radius; kx <= radius; kx++) {
  //           // 境界. min(上限、下限(0かx+kwの大きい方)))
  //           const xk = Math.min(width - 1, Math.max(0, x + kx));
  //           const yk = Math.min(height - 1, Math.max(0, y + ky));
  //           // index. RGBAの順で4つずつ、row方向のピクセルの順に入っているので
  //           const idx = (yk * width + xk) * 4;
  //           const kernelValue =
  //             normalizedGaussKernel5x5[ky + radius][kx + radius];
  //           // 畳み込む
  //           rSum += data[idx] * kernelValue;
  //           gSum += data[idx + 1] * kernelValue;
  //           bSum += data[idx + 2] * kernelValue;
  //           aSum += data[idx + 3] * kernelValue;
  //         }
  //       }

  //       const dstIdx = (y * width + x) * 4;
  //       filterD[dstIdx] = rSum;
  //       filterD[dstIdx + 1] = gSum;
  //       filterD[dstIdx + 2] = bSum;
  //       filterD[dstIdx + 3] = aSum;
  //     }
  //   }
  //   return filterD;
  // };

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    //!-- 以下の処理周辺をWorkerスレッドに移す
    // 5x5のガウシアンフィルタを適用
    // const filterdData = applyGaussianFilter(data, img.width, img.height);
    // const outputImageData = new ImageData(filterdData, img.width, img.height);
    // filteredCtx.putImageData(outputImageData, 0, 0);
    const worker = new Worker("./imageProcessWorker.js");
    worker.postMessage({ data, width: img.width, height: img.height });

    worker.onmessage = (e) => {
      const filterdData = e.data;
      const outputImageData = new ImageData(filterdData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
    };
    //!-- ここまで (TODO: メッセージが返ってこなかったらどうなるんだろう)
  });

  reader.readAsDataURL(file);
});
