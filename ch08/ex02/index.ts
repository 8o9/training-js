export const factorial_recursion = (x: number, n: number): number => {
  if (n === 0) return 1;
  // console.log(`x: ${x}, n: ${n}`);
  return x * factorial_recursion(x, n - 1);
};

// 末尾最適を目指した
export const factorial_recursion2 = (
  x: number,
  n: number,
  acc: number = 1,
): number => {
  if (n === 0) return acc;
  // console.log(`x: ${x}, n: ${n}, acc: ${acc}`);
  return factorial_recursion2(x, n - 1, x * acc);
};

// WIP:
// 繰り返し2乗法を調べたので実装してみるが途中である
// nを2進数で表現することを考えると、
// n = 0*2^64 + 1*2^63 + ... 1*2^1 + 1*2^0 のように表せるから、
// x^n = x^2^63 * ... * x^2^1 * x^2^0
// export const factorial_recursion3 = (x:number, n:number) => {
//   const ret = 1;
//   // 最下位ビットから、1になっているビットの時だけ
//   while(n > 0) {
//     if( (x & 1) === 1){
//       ret *= x;
//     }

//     x =
//     n = n >> 1;
//   }
// };

export const factorial_array_loop = (x: number, n: number) => {
  return Array(n)
    .fill(x)
    .reduce((x, y) => x * y, 1);
};

export const factorial_loop = (x: number, n: number) => {
  let ret = 1;
  for (let i = 0; i < n; i++) {
    ret *= x;
  }
  return ret;
};
