import { addMatrix, mulMatrix, Matrix2d } from "./index.ts";

describe("Matrix operations", () => {
  test("addMatrix", () => {
    const a: Matrix2d = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix2d = [
      [5, 6],
      [7, 8],
    ];
    const expected: Matrix2d = [
      [6, 8],
      [10, 12],
    ];
    expect(addMatrix(a, b)).toEqual(expected);
  });

  test("mulMatrix", () => {
    const a: Matrix2d = [
      [1, 2],
      [3, 4],
    ];
    const b: Matrix2d = [
      [5, 6],
      [7, 8],
    ];
    const expected: Matrix2d = [
      [19, 22],
      [43, 50],
    ];
    expect(mulMatrix(a, b)).toEqual(expected);
  });
});
