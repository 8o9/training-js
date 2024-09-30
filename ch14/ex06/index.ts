/* eslint-disable @typescript-eslint/no-explicit-any */
export const loggingProxy = <T extends object>(o: T) => {
  const loggingData: {
    time: string;
    method: string;
    parameter: string;
  }[] = [];
  const makeLogObj = (func: any, args: any) => {
    const _timeNow = new Date().toISOString();
    loggingData.push({
      time: _timeNow,
      method: `${func.name}`,
      parameter: JSON.stringify(args),
    });
    console.log(`Logged: ${func.name}, Args: ${JSON.stringify(args)}`);// debug
  };

  const handlers: ProxyHandler<object> = {
    apply(
      target: (this: any, ...args: readonly any[]) => unknown,
      thisArg: any,
      argList: readonly any[],
    ) {
      // console.log(`apply called: ${target.name}, argList: ${JSON.stringify(argList)}`);// debug
      makeLogObj(target, argList);
      return Reflect.apply(target, thisArg, argList);
    },
    construct(
      target: new (...args: readonly any[]) => unknown,
      argList: readonly any[],
      // eslint-disable-next-line @typescript-eslint/ban-types
      newTarget: Function,
    ) {
      // console.log(`construct called: ${target.name}, argList: ${JSON.stringify(argList)}`);// debug
      makeLogObj(target, argList);
      return Reflect.construct(target, argList, newTarget);
    },
    // applyが呼ばれる時に必要(new proxy('Alice')では不要)
    get(target, p, receiver) {
      const val = Reflect.get(target, p, receiver);
      console.log(`get called, val: ${val}`);
      if (typeof val === 'function') return new Proxy(val, handlers);
      return val;
    }
  };

  return { proxy: new Proxy(o, handlers), log: loggingData };
};
