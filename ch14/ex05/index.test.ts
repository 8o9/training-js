import { _type } from "./index.ts";

describe("_type function", () => {
  it("補完値一つでさまざまな型を試す", () => {
    expect(_type`This is a ${123} test`).toBe("This is a Number test");
    expect(_type`This is a ${"string"} test`).toBe("This is a String test");
    expect(_type`This is a ${true} test`).toBe("This is a Boolean test");
    expect(_type`This is a ${null} test`).toBe("This is a null test");
    expect(_type`This is a ${undefined} test`).toBe("This is a undefined test");
    expect(_type`This is a ${[]} test`).toBe("This is a Array test");
    expect(_type`This is a ${{}} test`).toBe("This is a Object test");
    expect(_type`This is a ${NaN} test`).toBe("This is a Number test");
  });

  it("複数の補完値では", () => {
    expect(_type`Values: ${123}, ${"string"}, ${true}`).toBe(
      "Values: Number, String, Boolean",
    );
  });

  it("補完値なし", () => {
    expect(_type`a`).toBe("a");
  });
});
