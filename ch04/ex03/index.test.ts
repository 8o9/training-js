import { add, sub } from "./index.ts";

describe("complexNumber", () => {
  describe("add", () => {
    it("should return 3 when 1, 2 given", () => {
      expect(add(1, 2)).toBe(3);
    });
  });
  describe("sub", () => {
    it("should return -1 when 1, 2 given", () => {
      expect(sub(1, 2)).toBe(-1);
    });
  });
});
