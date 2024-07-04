export class C1 {
  #x = 42;
  x() {
    return this.#x;
  }
}

export function C2() {
  const _x = 42;
  return {
    x: function () {
      return _x;
    },
  };
}
