import {
  factorial_recursion,
  factorial_recursion2,
  factorial_array_loop,
  factorial_loop,
} from "./index.ts";

describe("Factorial functions", () => {
  test("factorial_recursion returns correct values", () => {
    expect(factorial_recursion(2, 3)).toBe(8);
    expect(factorial_recursion(3, 3)).toBe(27);
  });

  test("factorial_recursion2 returns correct values", () => {
    expect(factorial_recursion2(2, 4)).toBe(16);
    expect(factorial_recursion2(3, 2)).toBe(9);
  });

  test("factorial_array_loop returns correct values", () => {
    expect(factorial_array_loop(2, 5)).toBe(32);
    expect(factorial_array_loop(3, 4)).toBe(81);
  });

  test("factorial_loop returns correct values", () => {
    expect(factorial_loop(2, 6)).toBe(64);
    expect(factorial_loop(-3, 5)).toBe(-243);
  });
});
