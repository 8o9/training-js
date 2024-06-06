import { getAllProperties } from "./index.ts";

describe("getAllProperties", () => {
  it("should return Array[has all properties]", () => {
    const HOGEGE = Symbol("hogege");
    const obj = {
      1: "ichi",
      cotton: "candy",
    };
    const obj2 = Object.create(obj);
    obj2["atama"] = "ashi";
    obj2["hiza"] = "hiji";
    Object.defineProperty(obj2, "hiza", {
      enumerable: false,
    });
    obj2[HOGEGE] = 255;
    expect(getAllProperties(obj2)).toStrictEqual([
      "atama",
      "hiza",
      HOGEGE,
      "1",
      "cotton",
    ]);
  });
});
