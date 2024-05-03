//  npx node --loader ts-node/esm ./index.ts
for (let i = 1; i < 101; i++) {
  let res = "";
  if (i % 15) {
    // i % 15 !== 0
    if (i % 3) {
      // i % 3 !== 0
      if (i % 5) {
        // i % 5 !== 0
        res = i.toString();
      } else {
        // i % 5 === 0
        res = "Buzz";
      }
    } else {
      // i % 3 === 0
      res = "Fizz";
    }
  } else {
    // i % 15 === 0
    res = "FizzBuzz";
  }
  console.log(res);
}
