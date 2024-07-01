import { addMyCall, myFunc } from "./index.ts";

describe("addMyCall", () => {
  test("When given function has no arg, then it can call this", () => {
    const f: myFunc = function () {
      return this.a;
    };
    addMyCall(f);
    expect(f.myCall && f.myCall({ a: 1 })).toBe(1); // myCallの存在を先に確認
  });

  test("When given function has 1 arg, then it can call this", () => {
    const f: myFunc = function (x) {
      return this.a + x;
    };
    addMyCall(f);
    expect(f.myCall && f.myCall({ a: 1 }, 2)).toBe(3);
  });

  test("When given function has multiple args, then it can call this", () => {
    const f: myFunc = function (x, y, z, u, v) {
      return this.a + x + y + z + u + v;
    };
    addMyCall(f);
    expect(f.myCall && f.myCall({ a: 1 }, 2, 3, 4, 5, 6)).toBe(21);
  });
});
