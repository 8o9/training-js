import { fibonacciSequence } from "./index.ts";

describe("fibonacciSequence", () => {
  test("limit 5: should return [1, 1, 2, 3, 5]", () => {
    const limit = 5;
    const expectedSequence = [1, 1, 2, 3, 5];
    const result = Array.from(fibonacciSequence(limit));
    expect(result).toEqual(expectedSequence);
  });
  test("limit 10: => [1, 1, 2, 3, 5, 8]", () => {
    const limit = 10;
    const expectedSequence = [1, 1, 2, 3, 5, 8];
    const result = Array.from(fibonacciSequence(limit));
    expect(result).toEqual(expectedSequence);
  });
  test("limit 0: should return empty array", () => {
    const limit = 0;
    const expectedSequence: number[] = [];
    const result = Array.from(fibonacciSequence(limit));
    expect(result).toEqual(expectedSequence);
  });
  test("limit 1000", () => {
    const limit = 1000;
    const expectedSequence = [
      1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
    ];
    const result = Array.from(fibonacciSequence(limit));
    expect(result).toEqual(expectedSequence);
  });
  test("limit MAX_SAFE_INTEGER+1: should throw an Error", () => {
    expect(() => fibonacciSequence(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      "should: 0 <= limit <= Number.MAX_SAFE_INTEGER",
    );
  });
});
