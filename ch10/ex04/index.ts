import meinDefault, { meineFunction as renamedFunction, Mein } from "./mein.ts";

console.log(renamedFunction());

const myClassInstance = new Mein("Alice");
console.log(myClassInstance.name);

// default export
console.log(meinDefault());

// export again
export { renamedFunction, Mein };
export default meinDefault;

// npm run ts ch10/ex04/index.ts
