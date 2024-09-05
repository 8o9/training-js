import { promises as fs } from "fs";
import * as path from "path";

export async function fetchSumOfFileSizes(pathDir: string) {
  const files = await fs.readdir(pathDir);
  const fileStats = await Promise.all(
    files.map((file) => fs.stat(path.join(pathDir, file))),
  );
  const sizeTotal = fileStats.reduce((total, stats) => total + stats.size, 0);
  return sizeTotal;
}

// 使ってみた `ls -la`で見た値と同じだった
fetchSumOfFileSizes("./ch13/ex10/")
  .then((size) => console.log(`total size: ${size}`))
  .catch((error) => console.log(error));
