import { primes } from "./index.ts";

describe("primes generator", () => {
  it("should generate the first 10 prime nums", () => {
    const primeGen = primes();
    const first10Primes = [];
    for (let i = 0; i < 10; i++) {
      first10Primes.push(primeGen.next().value);
    }
    expect(first10Primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });

  it("should generate prime numbers using next().value", () => {
    const primeGen = primes();
    expect(primeGen.next().value).toBe(2);
    expect(primeGen.next().value).toBe(3);
    expect(primeGen.next().value).toBe(5);
    expect(primeGen.next().value).toBe(7);
    expect(primeGen.next().value).toBe(11);
  });

  it("should handle large prime numbers", () => {
    const primeGen = primes();
    let lastPrime;
    for (let i = 0; i < 1000000; i++) {
      lastPrime = primeGen.next().value;
    }
    expect(lastPrime).toBe(15485863);
    // 1000000番目の素数
    // https://ja.wolframalpha.com/input?i=100%E4%B8%87%E7%95%AA%E7%9B%AE%E3%81%AE%E7%B4%A0%E6%95%B0
    // 25秒くらいかかった
  });
});
