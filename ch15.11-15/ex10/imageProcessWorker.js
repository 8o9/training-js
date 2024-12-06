// const filterdData = applyGaussianFilter(data, img.width, img.height);
// 元々のこの部分をworkerで実施する
self.onmessage = e => {
  const { data, width, height } = e.data;

  const applyGaussianFilter = (data, width, height) => {
    // 5x5で固定
    const gaussKernel5x5 = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1],
    ];
    const normalizedGaussKernel5x5 = gaussKernel5x5.map((row) =>
      row.map((value) => value / 256),
    );

    const filterD = new Uint8ClampedArray(data.length);
    const radius = 2; // 5x5のフィルタなので1画素から2ずつ離れたところまで

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // フィルタ後のRGBA値
        let rSum = 0,
          gSum = 0,
          bSum = 0,
          aSum = 0;

        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            // 境界. min(上限、下限(0かx+kwの大きい方)))
            const xk = Math.min(width - 1, Math.max(0, x + kx));
            const yk = Math.min(height - 1, Math.max(0, y + ky));
            // index. RGBAの順で4つずつ、row方向のピクセルの順に入っているので
            const idx = (yk * width + xk) * 4;
            const kernelValue =
              normalizedGaussKernel5x5[ky + radius][kx + radius];
            // 畳み込む
            rSum += data[idx] * kernelValue;
            gSum += data[idx + 1] * kernelValue;
            bSum += data[idx + 2] * kernelValue;
            aSum += data[idx + 3] * kernelValue;
          }
        }

        const dstIdx = (y * width + x) * 4;
        filterD[dstIdx] = rSum;
        filterD[dstIdx + 1] = gSum;
        filterD[dstIdx + 2] = bSum;
        filterD[dstIdx + 3] = aSum;
      }
    }
    return filterD;
  }

  const filterdData = applyGaussianFilter(data, width, height);
  self.postMessage(filterdData);
};