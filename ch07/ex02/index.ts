export const fizzbuzz = (n: number) => {
  Array.from({ length: n }, (_, i) => i + 1).forEach((i) =>
    console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i),
  );
};

export const sumOfSquaredDifference = (f: number[], g: number[]) => {
  let sum = 0;
  f.map((n, i) => n - g[i]).forEach((v) => (sum += v ** 2));
  return sum;
};

export const sumOfEvensIsLargerThan42 = (array: number[]) => {
  let sum = 0;
  array.filter(x => x % 2 === 0).forEach(x => sum += x);
  return sum >= 42;
};
