export const counterIter = (max: number) => {
  let c = 1;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          if (c > max) {
            return { value: undefined, done: true };
          }
          const value = c;
          c++;
          return { value, done: false };
        },
        return(value: number) {
          return { value, done: true };
        },
        throw() {
          // reset!
          c = 1;
          return { value: undefined, done: true };
        },
      };
    },
  };
};
