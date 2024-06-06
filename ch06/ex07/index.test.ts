import { assign } from "./index.ts";

describe("test assign", () => {
  test.each([
    { target: { x: 1 }, sources: [{ y: 2 }], expected: { x: 1, y: 2 } },
    {
      target: { x: 1 },
      sources: [{ y: 2 }, { x: "japan" }],
      expected: { y: 2, x: "japan" },
    },
    {
      target: { x: 1 },
      sources: [
        { x: 2, y: 2 },
        { y: 3, z: 4 },
      ],
      expected: { x: 2, y: 3, z: 4 },
    },
  ])(
    "$expected === Object.assign($target, $sources)",
    ({ target, sources, expected }) => {
      expect(assign(target, ...sources)).toStrictEqual(expected);
    },
  );
});
