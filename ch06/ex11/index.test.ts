import { ppp } from "./index.ts";

describe("substract", () => {
  it("get x, y when r:1, theta: pi/2", () => {
    ppp.r = 1.0;
    ppp.theta = Math.PI / 2;
    expect(ppp.x).toBe(1 * Math.cos(Math.PI / 2));
    expect(ppp.y).toBe(1);
  });
  it("set x, y and get r and theta", () => {
    ppp.x = 1;
    ppp.y = -1;
    expect(ppp.r).toBe(Math.sqrt(2));
    expect(ppp.theta).toBeCloseTo(-Math.PI / 4);
  });
});
