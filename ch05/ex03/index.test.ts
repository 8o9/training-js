import { isWeekEnd, isWeekEndS } from "./index.ts";

describe("bitCount", () => {
  it("should return true when 土 given", () => {
    expect(isWeekEnd("土")).toBe(true);
  });
  it("should return true when 日 given", () => {
    expect(isWeekEnd("日")).toBe(true);
  });
  it("should return true when 月 given", () => {
    expect(isWeekEnd("月")).toBe(false);
  });
  it("should return true when 火 given", () => {
    expect(isWeekEnd("火")).toBe(false);
  });
  it("should return true when 水 given", () => {
    expect(isWeekEnd("水")).toBe(false);
  });
  it("should return true when 木 given", () => {
    expect(isWeekEnd("木")).toBe(false);
  });
  it("should return true when 金 given", () => {
    expect(isWeekEnd("金")).toBe(false);
  });
  it("should return true when 👹 given", () => {
    expect(isWeekEnd("👹")).toBe(false);
  });
  it("should return true when 土 given", () => {
    expect(isWeekEndS("土")).toBe(true);
  });
  it("should return true when 日 given", () => {
    expect(isWeekEndS("日")).toBe(true);
  });
  it("should return true when 月 given", () => {
    expect(isWeekEndS("月")).toBe(false);
  });
  it("should return true when 火 given", () => {
    expect(isWeekEndS("火")).toBe(false);
  });
  it("should return true when 水 given", () => {
    expect(isWeekEndS("水")).toBe(false);
  });
  it("should return true when 木 given", () => {
    expect(isWeekEndS("木")).toBe(false);
  });
  it("should return true when 金 given", () => {
    expect(isWeekEndS("金")).toBe(false);
  });
  it("should return true when 👹 given", () => {
    expect(isWeekEndS("👹")).toBe(false);
  });
});
