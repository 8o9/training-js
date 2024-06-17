import {
  fizzbuzz,
  sumOfSquaredDifference,
  sumOfEvensIsLargerThan42,
} from "./index.ts";

describe("fizzbuzz", () => {
  test("should print FizzBuzz for multiples of 3 and 5", () => {
    console.log = jest.fn();
    fizzbuzz(15);
    expect(console.log).toHaveBeenCalledWith("FizzBuzz");
  });

  test("should print Fizz for multiples of 3", () => {
    console.log = jest.fn();
    fizzbuzz(3);
    expect(console.log).toHaveBeenCalledWith("Fizz");
  });

  test("should print Buzz for multiples of 5", () => {
    console.log = jest.fn();
    fizzbuzz(5);
    expect(console.log).toHaveBeenCalledWith("Buzz");
  });
});

describe("sumOfSquaredDifference", () => {
  test("should return the sum of squared differences", () => {
    const f = [1, 2, 3];
    const g = [4, 5, 6];
    const result = sumOfSquaredDifference(f, g);
    expect(result).toBe(27);
  });
});

describe("sumOfEvensIsLargerThan42", () => {
  test("should return true if the sum of even numbers is larger than 42", () => {
    const array = [20, 22, 3];
    const result = sumOfEvensIsLargerThan42(array);
    expect(result).toBe(true);
  });

  test("should return false if the sum of even numbers is not larger than 42", () => {
    const array = [20, 21, 3];
    const result = sumOfEvensIsLargerThan42(array);
    expect(result).toBe(false);
  });
});
