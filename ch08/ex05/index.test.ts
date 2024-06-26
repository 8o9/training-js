import { sequenceToObject } from "./index.ts";

describe("sequenceToObject function", () => {
  test("should return an object with string:number pairs", () => {
    const result = sequenceToObject("a", 1, "b", 2);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test("should throw an error if the number of arguments is not even", () => {
    expect(() => {
      sequenceToObject("a", 1, "b");
    }).toThrow(
      "引数の数が偶数ではない(string, numberのペアを作るので偶数でないといけない)",
    );
  });

  test("should throw an error if the order of arguments is not string, number", () => {
    expect(() => {
      sequenceToObject("a", "b", 1, 2);
    }).toThrow("引数の順番がstring, numberの順ではない");
  });
});
