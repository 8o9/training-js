export function any<T>(
  ...funcs: Array<(arg: T) => boolean>
): (arg: T) => boolean {
  return function (arg: T): boolean {
    // false || f1(arg) || f2(arg) || ... || fN(arg)
    // valueは最初false, value = false || f1(arg) ... 以下略
    return funcs.reduce((value, func) => value || func(arg), false);
  };
}
