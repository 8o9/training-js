// Object.assign():
//   すべての列挙可能な自身のプロパティの値を、 1つ以上のコピー元オブジェクトからコピー先オブジェクトにコピーする
//   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
// Record<string, unknown>はオブジェクトを表す便利な型らしい. こうしないとtarget[p]のところでlintに怒られる
//   https://typescriptbook.jp/reference/type-reuse/utility-types/record
export const assign = (
  target: Record<string | symbol, unknown>,
  ...sources: Record<string | symbol, unknown>[]
) => {
  for (const source of sources) {
    // 列挙可能なプロパティ全てについてコピーするが、
    for (const p in source) {
      // 継承プロパティは除きたい。自身のプロパティのみコピーする
      if (Object.prototype.hasOwnProperty.call(source, p)) {
        target[p] = source[p];
      }
    }
    // Symbolも
    const symbolKeys = Object.getOwnPropertySymbols(source);
    for (const key of symbolKeys) {
      target[key] = source[key];
    }
  }
  return target;
};
