export type complexNumber = {
  re: number;
  im: number;
};

export const add = (a: complexNumber, b: complexNumber): complexNumber => {
  return { re: a.re + b.re, im: a.im + b.im };
};

export const sub = (a: complexNumber, b: complexNumber): complexNumber => {
  return { re: a.re - b.re, im: a.im - b.im };
};

export const mul = (a: complexNumber, b: complexNumber): complexNumber => {
  return { re: a.re * b.re, im: a.im * b.im };
};

export const div = (a: complexNumber, b: complexNumber): complexNumber => {
  return { re: a.re / b.re, im: a.im / b.im };
};
