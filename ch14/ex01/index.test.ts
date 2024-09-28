import {
  nestedUnwritableObj,
  unwritableAndUnconfigurableObj,
  writableAndUnconfigurableObj,
} from "./index.ts";

test("Unwritable and unconfigurable object", () => {
  const a = unwritableAndUnconfigurableObj();
  expect(a).toStrictEqual({ a: 1 });
  expect(() => (a.a = 3)).toThrow();
  // @ts-expect-error ts(2790)
  expect(() => delete a.a).toThrow();
});

test("Writable and unconfigurable object", () => {
  const b = writableAndUnconfigurableObj();
  expect(b).toStrictEqual({ b: 2 });
  b.b = 3;
  expect(b.b).toBe(3);
  // @ts-expect-error ts(2790)
  expect(() => delete b.b).toThrow();
});

test("Nested unwritable object", () => {
  const c = nestedUnwritableObj();
  expect(c).toStrictEqual({ c: { d: { e: 3 } } });
  // @ts-expect-error ts(2339)
  expect(() => (c.f = 1)).toThrow();
  // @ts-expect-error ts(2339)
  expect(() => (c.c.f = 1)).toThrow();
  // @ts-expect-error ts(2339)
  expect(() => (c.c.d.f = 1)).toThrow();
  // @ts-expect-error ts(2339)
  expect(() => (c.c.d.e.f = 1)).toThrow();
});
