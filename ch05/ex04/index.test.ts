import { fibWhile, fibDoWhile, fibFor } from "./index.ts";

describe("fib", () => {
  it("should return [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibWhile(10)).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("should return [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibDoWhile(10)).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  it("should return [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]", () => {
    expect(fibFor(10)).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
