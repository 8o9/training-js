import fs from "fs/promises";
import path from "path";

export type WalkPath = { path: string; isDirectory: boolean };

// 12-6より
export async function* walk(rootPath: string): AsyncGenerator<WalkPath> {
  const files = await fs.readdir(rootPath);

  for (const file of files) {
    const filePath: string = path.join(rootPath, file);
    const stat = await fs.stat(filePath);
    const isDirectory: boolean = stat.isDirectory();
    if (isDirectory) {
      yield { path: filePath, isDirectory: isDirectory };
      yield* walk(filePath);
    } else {
      yield { path: filePath, isDirectory: isDirectory };
    }
  }
}

// 利用例
(async () => {
  for await (const elem of walk("./ch13/")) {
    console.log(elem);
  }
})();
// ...snip
// { path: 'ch13/ex03/index.test.ts', isDirectory: false }
// { path: 'ch13/ex03/index.ts', isDirectory: false }
// { path: 'ch13/ex04', isDirectory: true }
// { path: 'ch13/ex04/index.test.ts', isDirectory: false }
// { path: 'ch13/ex04/index.ts', isDirectory: false }
// { path: 'ch13/ex05', isDirectory: true }
// { path: 'ch13/ex05/index.ts', isDirectory: false }
// { path: 'ch13/ex06', isDirectory: true }
// { path: 'ch13/ex06/index.md', isDirectory: false }
// { path: 'ch13/ex07', isDirectory: true }
// { path: 'ch13/ex07/index.md', isDirectory: false }
// { path: 'ch13/ex08', isDirectory: true }
// { path: 'ch13/ex08/index.test.ts', isDirectory: false }
// ...
