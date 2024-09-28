export const nestedUnwritableObj = () => {
  const o = { c: { d: { e: 3 } } };
  // unwritable, unconfigurable
  Object.freeze(o.c.d);
  Object.freeze(o.c);
  Object.freeze(o);
  return o;
};

export const unwritableAndUnconfigurableObj = () => {
  const o = { a: 1 };
  // unwritable, unconfigurable
  Object.freeze(o);
  return o;
};

export const writableAndUnconfigurableObj = () => {
  const o = { b: 2 };
  Object.defineProperty(o, "b", {
    writable: true,
    configurable: false,
  });
  return o;
};
