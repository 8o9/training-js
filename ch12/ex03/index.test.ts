import { counterIter } from "./index.ts";

describe("counterIter", () => {
  test("max: 5 => should return collect value", () => {
    const max = 5;
    const iter = counterIter(max)[Symbol.iterator]();
    const results = [];

    for (let result = iter.next(); !result.done; result = iter.next()) {
      results.push(result.value);
    }

    expect(results).toEqual([1, 2, 3, 4, 5]);
  });

  test("max: 3 => should return done when max is exceeded (using next())", () => {
    const max = 3;
    const iter = counterIter(max)[Symbol.iterator]();

    iter.next(); // 1
    iter.next(); // 2
    iter.next(); // 3
    const result = iter.next(); // done

    expect(result).toEqual({ value: undefined, done: true });
  });

  test("max: 3 => should reset counter when throw())", () => {
    const max = 3;
    const iter = counterIter(max)[Symbol.iterator]();

    iter.next(); // 1
    iter.next(); // 2
    iter.throw(); // reset
    const result = iter.next(); // 1 again

    expect(result).toEqual({ value: 1, done: false });
  });

  test("should return correct value when return is called", () => {
    const max = 3;
    const iter = counterIter(max)[Symbol.iterator]();

    iter.next(); // 1
    const result = iter.return(99); // return

    expect(result).toEqual({ value: 99, done: true });
  });
});
