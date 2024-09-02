export const fibonacciSequence = (limit: number) => {
  if (limit < 0 || limit > Number.MAX_SAFE_INTEGER) {
    throw new Error(`should: 0 <= limit <= Number.MAX_SAFE_INTEGER`);
  }
  let [x, y] = [0, 1];
  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (y > limit) {
            return { value: undefined, done: true };
          }
          const value = y;
          [x, y] = [y, x + y];
          return { value, done: false };
        },
      };
    },
  };
};
