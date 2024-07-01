### 1

再帰呼び出しをする際にreturnするものが関数自身の結果のみである場合、
スタック領域にデータを保持しておく必要がなくなるため、メモリがあまり使われずオーバーフローしないよう最適化できると考えました。

### 2

手元の環境ではダメでした

- TypeScript online playground
  - `[ERR]: "Executed JavaScript Failed:" [ERR]: Maximum call stack size exceeded `
- bun 1.1.17
  - `Infinity`
