import { sayHi, Hey } from "./hey.ts";

console.log(sayHi("Bob"));

const hey = new Hey("Alice");
console.log(hey.greet());

// npm run ts ch10/ex03/index.ts
