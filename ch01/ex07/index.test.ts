import { Point } from "./index.ts";

describe("Point", () => {
  let point1: Point;
  let point2: Point;
  beforeEach(() => {
    point1 = new Point();
    point2 = new Point();
  });
  it("getCoords() return [0,0] just after init", () => {
    expect(point1.getCoords()).toStrictEqual([0, 0]);
  });
  it("setCoords() can set [1.2, 4.4]  ", () => {
    point1.setCoords([1.2, 4.4]);
    expect(point1.getCoords()).toStrictEqual([1.2, 4.4]);
  });
  it("add() can add point2: [10, 44]  ", () => {
    point1.setCoords([1.2, 4.4]);
    point2.setCoords([10, 44]);
    point1.add(point2);
    expect(point1.getCoords()).toStrictEqual([11.2, 48.4]);
  });
});
