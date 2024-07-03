import { any } from "./index.ts";

describe("any function", () => {
  it("should return false/true/", () => {
    const overZero = (n: number) => n > 0;
    const underZero = (n: number) => n < 0;
    const isNonZero = any(overZero, underZero);

    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
    expect(isNonZero(NaN)).toBe(false);
  });

  it("should return true/false", () => {
    // 偶数
    const isEven = (n: number) => n % 2 === 0;
    // 10超
    const isGreaterThanTen = (n: number) => n > 10;
    // 4である
    const isFour = (n: number) => n === 4;

    const anyFunc = any(isEven, isGreaterThanTen, isFour);

    expect(anyFunc(2)).toBe(true); // 偶数:true, 他false
    expect(anyFunc(11)).toBe(true); // 10超: true, 他false
    expect(anyFunc(4)).toBe(true); // 4で偶数(2つtrue)
    expect(anyFunc(3)).toBe(false); // 全部false
  });
});
