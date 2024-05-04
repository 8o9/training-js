export const add = (a: number, b: number): number => {
  // 半加算機で、x + y の和sと桁上がりcは
  // s: x xor y
  // c: x and y
  // のようになるので、
  // 和をbに、桁上がりをaに溜めていくことにして、桁上がりがなくなるまで足す
  while (a !== 0) {
    [a, b] = [(a & b) << 1, a ^ b];
  }
  return b;
};

export const sub = (a: number, b: number): number => {
  // a - b = a + (-b) = a + not(b) + 1
  return add(a, add(~b, 1));
};
