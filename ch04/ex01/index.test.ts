import { complexNumber, add, sub, mul, div } from "./index.ts";
let a: complexNumber;
let b: complexNumber;
let exp: complexNumber;

describe("complexNumber", () => {
  describe("add", () => {
    it("1 should return expected data", () => {
      a = { re: 0, im: 0 };
      b = { re: 0, im: 0 };
      exp = { re: 0, im: 0 };
      expect(add(a, b)).toStrictEqual(exp);
    });
    it("2 should return expected data", () => {
      a = { re: 1, im: -1 };
      b = { re: 2, im: -2 };
      exp = { re: 3, im: -3 };
      expect(add(a, b)).toStrictEqual(exp);
    });
  });
  describe("sub", () => {
    it("1: should return expected data", () => {
      a = { re: 0, im: 0 };
      b = { re: 0, im: 0 };
      exp = { re: 0, im: 0 };
      expect(sub(a, b)).toStrictEqual(exp);
    });
    it("2: should return expected data", () => {
      a = { re: 1, im: -1 };
      b = { re: 2, im: -2 };
      exp = { re: -1, im: 1 };
      expect(sub(a, b)).toStrictEqual(exp);
    });
  });
  describe("mul", () => {
    it("1: should return expected data", () => {
      a = { re: 0, im: 0 };
      b = { re: 0, im: 0 };
      exp = { re: 0, im: 0 };
      expect(mul(a, b)).toStrictEqual(exp);
    });
    it("2: should return expected data", () => {
      a = { re: 1, im: -1 };
      b = { re: 2, im: -2 };
      exp = { re: 2, im: 2 };
      expect(mul(a, b)).toStrictEqual(exp);
    });
  });
  describe("div", () => {
    it("1: should return expected data", () => {
      a = { re: 1, im: -2 };
      b = { re: 2, im: 3 };
      exp = { re: 0.5, im: -2 / 3 };
      expect(div(a, b)).toStrictEqual(exp);
    });
    it("2: should return expected data", () => {
      a = { re: 0.1, im: -12 };
      b = { re: 2, im: -2 };
      exp = { re: 0.05, im: 6 };
      expect(div(a, b)).toStrictEqual(exp);
    });
  });
});
