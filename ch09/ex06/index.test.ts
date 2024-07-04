import { TypedMap } from "./index.ts";

describe("TypedMap", () => {
  it("should set and get correctly for string key", () => {
    const map = new TypedMap<string, number>();
    map.set("key1", 1);
    expect(map.get("key1")).toBe(1);
  });

  it("should set and get correctly for number keys", () => {
    const 𠮷野家 = new Map();
    𠮷野家.set(1, "𠮷野家");
    const map = new TypedMap<number, string>(𠮷野家);
    map.set(NaN, "𠮷野家");
    expect(map.get(1)).toBe("𠮷野家");
    expect(map.get(NaN)).toBe("𠮷野家");
  });

  it("aaannd, should allow method chaining", () => {
    const map = new TypedMap<string, number>();
    map.set("🧑‍🧑‍🧒", 4).set("👶", 2);
    expect(map.get("🧑‍🧑‍🧒")).toBe(4);
    expect(map.get("👶")).toBe(2);
  });
});
