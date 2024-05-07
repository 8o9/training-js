export const fibWhile = (n: number) => {
  let i = 2;
  const fib = [1, 1];
  while (i < n) {
    fib.push(fib[i - 2] + fib[i - 1]);
    i++;
  }
  return fib;
};

export const fibDoWhile = (n: number) => {
  let i = 2;
  const fib = [1, 1];
  do {
    fib.push(fib[i - 2] + fib[i - 1]);
    i++;
  } while (i < n);
  return fib;
};

export const fibFor = (n: number) => {
  const fib = [1, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 2] + fib[i - 1]);
  }
  return fib;
};
