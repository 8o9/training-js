import { func8_1_1, func8_1_2, func8_1_3 } from "./index.ts"; // ファイルパスは適切なものに変更してください

describe("func8_1_1", () => {
  it("should return an array filled with the character when given valid inputs", () => {
    expect(func8_1_1(3, "a")).toEqual(["a", "a", "a"]);
  });

  it("should return undefined when given an invalid number", () => {
    expect(func8_1_1(-1, "c")).toBeUndefined();
    expect(func8_1_1(1.5, "a")).toBeUndefined();
  });

  it("should return undefined when given a string length not equal to 1", () => {
    expect(func8_1_1(3, "")).toBeUndefined();
    expect(func8_1_1(3, "ab")).toBeUndefined();
    expect(func8_1_1(3, "😀")).toBeUndefined();
  });

  it("should print the character, correct number of times", () => {
    const consoleSpy = jest.spyOn(console, "log");
    const output: string[] = [];

    consoleSpy.mockImplementation((v: string) => {
      output.push(v);
    });

    func8_1_1(3, "X");

    expect(output).toEqual(["X", "X", "X"]);
    consoleSpy.mockRestore();
  });
});

describe("func8_1_2", () => {
  it("should return the square of the input", () => {
    expect(func8_1_2(2)).toBe(4);
    expect(func8_1_2(-3)).toBe(9);
  });
});

describe("func8_1_3", () => {
  it('should return an object with a "now" property', () => {
    const result = func8_1_3();
    expect(result).toHaveProperty("now");
    expect(typeof result.now).toBe("number");
  });
});
