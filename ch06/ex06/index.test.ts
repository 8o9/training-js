import { getAllProperties } from "./index.ts";

const SYMBOL = Symbol("hoge");
const SYMBOL2 = Symbol("hogege");
const obj = {
  1: "ichi",
  name: "sho-hey",
  [SYMBOL]: 2454,
  name2: "ichi-ro",
};
Object.defineProperty(obj, "name2", {
  enumerable: false,
});
const obj2 = Object.create(obj);
obj2["atama"] = "ashi";
obj2["hiza"] = "hiji";
Object.defineProperty(obj2, "hiza", {
  enumerable: false,
});
// obj[SYMBOL2] = 255;
// WIP
describe("getAllProperties", () => {
  it("should return Array[has all properties]", () => {
    console.log(getAllProperties(obj2));
    expect(getAllProperties(obj2)).toStrictEqual(["atama", "hiza", "1", "name", "name2", SYMBOL]);
  });
});
