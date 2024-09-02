import fs from "fs";
import path from "path";

export type WalkPath = { path: string; isDirectory: boolean };

export function* walk(rootPath: string): Generator<WalkPath> {
  const files = fs.readdirSync(rootPath);

  for (const file of files) {
    const filePath: string = path.join(rootPath, file);
    const isDirectory: boolean = fs.statSync(filePath).isDirectory();
    if (isDirectory) {
      yield { path: filePath, isDirectory: isDirectory }; // @TODO こう書いて動いたが納得してない
      yield* walk(filePath);
    } else {
      yield { path: filePath, isDirectory: isDirectory };
    }
  }
}

// WI
const printF = (rootPath: string) => {
  for (const f of walk(rootPath)) {
    console.log(f);
  }
};

printF("./ch12/");
