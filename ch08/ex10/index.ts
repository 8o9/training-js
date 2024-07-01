type obj = { [key: string]: number };

export type myFunc = {
  (this: obj, ...args: number[]): number;
  myCall?: (thisArg: obj, ...args: number[]) => number;
};

export function addMyCall(f: myFunc) {
  f.myCall = function (thisArg: obj, ...args: number[]) {
    return f.bind(thisArg, ...args)();
  };
}
