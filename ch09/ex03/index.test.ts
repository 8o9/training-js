import { C1, C2 } from "./index.ts";

describe("C1", () => {
  it("should return 42 for C1.x()", () => {
    const c1 = new C1();
    expect(c1.x()).toBe(42);
  });
});

describe("C2", () => {
  it("should return 42 for c2.x", () => {
    const c2 = C2();
    expect(c2.x()).toBe(42);
  });
});
