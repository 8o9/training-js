export function* primes(): Generator<number> {
  // エラトステネスの篩を用いた素数ジェネレータ
  // 2から順に素数かどうかを走査するが、素数が発見された場合その素数^2に加えて、
  // その数を素因数で分解した時の素因数を足していった数(倍数?)も素数ではないと除外していくことにする。
  // 例えば12なら2, 3が素因数なので12, 14, 16, ...及び 15, 18, 21が素数ではないとできる。
  // nonPrimeは素数ではない数をkeyとし、valueにはその素因数(keyの値を割り切れる素数)を配列で入れる
  // valueとして複数の素因数が登録されることはあまり多くはないかもしれない。複数入るのは、6, 30, 60とか?
  const nonPrime: { [key: number]: number[] } = {};
  // 走査する数
  let q = 2;

  // 素数でないもの(key)の素因数(value配列の1要素)を使って素因数の倍数?も素数でないと登録していく
  while (true) {
    if (!nonPrime[q]) {
      // qが素数の場合
      yield q;
      nonPrime[q * q] = [q];
    } else {
      // qが素数ではない場合
      // nonPrime[q]に登録されいてる素因数を使ってnonPrime[q+p]も素因数ではない旨記録する
      for (const p of nonPrime[q]) {
        nonPrime[q + p] = nonPrime[q + p] ? nonPrime[q + p].concat(p) : [p];
      }
      // もうnonPrime[q]は参照しないので消す
      delete nonPrime[q];
    }
    q++;
  }
}
