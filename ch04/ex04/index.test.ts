import { bitCount, bitCount2 } from "./index.ts";

describe("bitCount & bitCount2", () => {
  it("should return 3 when 7(0b111) given", () => {
    expect(bitCount(0b111)).toBe(3);
  });
  it("should return 2 when 5(0b101) given", () => {
    expect(bitCount(0b101)).toBe(2);
  });
  it("should return 32 when -1(0b1111...1) given", () => {
    expect(bitCount(-1)).toBe(32);
  });
  it("should return 0 when 0 given", () => {
    expect(bitCount(0)).toBe(0);
  });
  it("should return undefined when 0.1 given", () => {
    expect(bitCount(0.1)).toBe(undefined);
  });
  it("should return 3 when 7(0b111) given", () => {
    expect(bitCount2(0b111)).toBe(3);
  });
  it("should return 2 when 5(0b101) given", () => {
    expect(bitCount2(0b101)).toBe(2);
  });
  it("should return 32 when -1(0b1111...1) given", () => {
    expect(bitCount2(-1)).toBe(32);
  });
  it("should return 0 when 0 given", () => {
    expect(bitCount2(0)).toBe(0);
  });
  it("should return undefined when 0.1 given", () => {
    expect(bitCount2(0.1)).toBe(undefined);
  });
});
