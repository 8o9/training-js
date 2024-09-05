import * as fs from "fs";

// fs.readdir(path[, options], callback)
// 引数の型はnodejs.orgかVSCode開発環境で提示されるfs.readdir()の引数の方を参照した
export const readdir = (
  path: string | Buffer | URL,
  options?:
    | { encoding?: BufferEncoding | null; withFileTypes?: false }
    | BufferEncoding
    | undefined
    | null,
) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
};

// fs.stat(path[, options], callback])
export const stat = (
  path: string | Buffer | URL,
  options?: (fs.StatOptions & { bigint?: false | undefined }) | undefined,
) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
};

// jestを使ったテストを書くのに苦労しており一旦動作確認をする
async function testReaddir() {
  try {
    const dir = "./ch13/ex03";
    const files = await readdir(dir);
    console.log("Files:", files);
  } catch (error) {
    console.error(`Error reading directory: `, error);
  }
}

async function testStat() {
  try {
    const dir = "./ch13/ex03/index.ts";
    const stats = await stat(dir);
    console.log("Stats:", stats);
  } catch (error) {
    console.error("Error getting stats:", error);
  }
}

console.log("readdir()");
testReaddir();
console.log("stat");
testStat();
