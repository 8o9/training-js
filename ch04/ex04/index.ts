export const bitCount = (num: number): number | undefined => {
  // 整数でない場合はundefined
  if (Number.isSafeInteger(num) === false) {
    return undefined;
  }
  // >>>を用い0埋め32bitにする
  // numが負数の時、例えば(-1).toString(2)が-1になるので
  num >>>= 0;
  // 2進数表現の文字列に変換し、1文字ずつの配列に変換、
  // 配列の要素が1の場合にcountを+1(短絡評価で&&の前がtrueの時に&&の後が実行)
  let count = 0;
  num
    .toString(2)
    .split("")
    .forEach((elm) => elm === "1" && count++);
  return count;
};

export const bitCount2 = (num: number): number | undefined => {
  // 整数でない場合はundefined
  if (Number.isSafeInteger(num) === false) {
    return undefined;
  }
  let count = 0;
  num >>>= 0;
  while (num !== 0) {
    count += num & 1;
    num >>>= 1;
  }
  return count;
};
