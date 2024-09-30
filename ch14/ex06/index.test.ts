import { loggingProxy } from "./index.ts";

type LogData = {
  time: string;
  method: string;
  parameter: string;
};

describe("loggingProxy", () => {
  it("should log method calls", () => {
    const obj = {
      greet(name: string) {
        return `Hello, ${name}`;
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { proxy, log }: { proxy: any; log: LogData[] } = loggingProxy(obj);
    proxy.greet("World");

    console.log(log);// debug

    expect(log.length).toBe(1); //!
    expect(log[0].method).toBe("greet");
    expect(log[0].parameter).toBe(JSON.stringify(["World"]));
  });

  it("should log constructor calls", () => {
    class Person {
      constructor(public name: string) {}
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { proxy, log }: { proxy: any; log: LogData[] } = loggingProxy(Person);
    new proxy("Alice");

    console.log(log);// debug

    expect(log.length).toBe(1);
    expect(log[0].method).toBe("Person");
    expect(log[0].parameter).toBe(JSON.stringify(["Alice"]));
  });

  it("should log multiple method calls", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {
      add(a: number, b: number) {
        return a + b;
      },
      multiply(a: number, b: number) {
        return a * b;
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { proxy, log }: { proxy: any; log: LogData[] } = loggingProxy(obj);
    proxy.add(1, 2);
    proxy.multiply(3, 4);

    console.log(log);// debug

    expect(log.length).toBe(2); //!
    expect(log[0].method).toBe("add");
    expect(log[0].parameter).toBe(JSON.stringify([1, 2]));
    expect(log[1].method).toBe("multiply");
    expect(log[1].parameter).toBe(JSON.stringify([3, 4]));
  });
});
