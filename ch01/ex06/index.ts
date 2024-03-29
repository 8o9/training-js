/**
 * フィボナッチ数列のN個目を返す 計算リソースのためNは0n<=N<=1024nとする
 * @param {bigint} num 0以上1024まで
 * @return {*}  {(bigint | undefined)}
 */
export const fib = (num: bigint): bigint | undefined => {
  if (num > 2n ** 10n || num < 0n) {
    return undefined;
  }
  let [now, next] = [0n, 1n];
  for (let i = 0; i < num; i++) {
    [now, next] = [next, now + next];
  }
  return now;
};
