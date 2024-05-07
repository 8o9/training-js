import { delOdds } from "./index.ts";

describe("fib", () => {
  it("should return {b:2, d:4}}", () => {
    expect(delOdds({ a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({ b: 2, d: 4 });
  });
});
