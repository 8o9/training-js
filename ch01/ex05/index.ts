/**
 * 引数の絶対を返す
 * @param {number} x
 * @return {*}  {number}
 */
export function abs(x: number): number {
  return Math.abs(x);
}

/**
 * 数値の配列を受け取り、その総和を返す
 * @param {number[]} x
 * @return {*}  {number}
 */
export const sum = (x: number[]): number => {
  return x.reduce((accum, current) => accum + current, 0);
};

/**
 * 引数の階乗を返す
 * @param {bigint} x
 * @return {*}  {(bigint | undefined)}
 */
export const factorial = (x: bigint): bigint | undefined => {
  if (x > 2n ** 10n || x < 0n) {
    return undefined;
  }
  if (x === 0n) {
    return 1n;
  }
  const prev = factorial(x - 1n);
  if (prev === undefined) {
    return undefined;
  }
  return x * prev;
};
