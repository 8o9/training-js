export type Matrix2d = [[number, number], [number, number]];

export const addMatrix = (a: Matrix2d, b: Matrix2d) => {
  const c: Matrix2d = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      c[i][j] = a[i][j] + b[i][j];
    }
  }
  return c;
};

export const mulMatrix = (a: Matrix2d, b: Matrix2d) => {
  const c: Matrix2d = [
    [0, 0],
    [0, 0],
  ];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      for (let k = 0; k < 2; k++) {
        c[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return c;
};
