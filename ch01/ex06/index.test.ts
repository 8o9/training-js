import { fib } from "./index.ts";

describe("math", () => {
  describe("fib", () => {
    it("should return 0n when 0n given", () => {
      expect(fib(0n)).toBe(0n);
    });
    it("should return 1n when 1n given", () => {
      expect(fib(1n)).toBe(1n);
    });
    it("should return 1n when 2n given", () => {
      expect(fib(2n)).toBe(1n);
    });
    it("should return 5n when 5n given", () => {
      expect(fib(5n)).toBe(5n);
    });
    it("should return 2111485077978050n when 75n given", () => {
      expect(fib(75n)).toBe(2111485077978050n);
    });
    it("should return 4506......n when 1024n given [WolframAlpha says...]", () => {
      expect(fib(1024n)).toBe(
        4506699633677819813104383235728886049367860596218604830803023149600030645708721396248792609141030396244873266580345011219530209367425581019871067646094200262285202346655868899711089246778413354004103631553925405243n,
      );
    });
    it("should return undefined when -1n given", () => {
      expect(fib(-1n)).toBe(undefined);
    });
    it("should return undefined when 1025n given", () => {
      expect(fib(1025n)).toBe(undefined);
    });
    it("should return undefined when 2n**53n given", () => {
      expect(fib(2n ** 53n)).toBe(undefined);
    });
    it("should return 0n when -0n given", () => {
      expect(fib(-0n)).toBe(0n);
    });
  });
});
