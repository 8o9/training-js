// npx node --loader ts-node/esm ./original.ts
for (let i = 1; i < 101; i++)
  console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");
