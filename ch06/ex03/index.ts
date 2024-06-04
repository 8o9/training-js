const o = { x: 1 };

const p = Object.create(o);
p.y = 2;

const q = Object.create(p);
q.z = 3;

const f = q.toString(); // eslint-disable-line
console.log(q.x + q.y);

// ` o` が `p` および `q` のプロトタイプチェーン上に存在すること、
// および、`p` が`q` のプロトタイプチェーン上に存在すること
console.log(o.isPrototypeOf(p)); // eslint-disable-line
console.log(p.isPrototypeOf(q)); // eslint-disable-line
console.log(o.isPrototypeOf(q)); // eslint-disable-line

const printPropertyChain = (obj: { [key: string]: number }) => {
  if (obj === null) return;
  console.log(Object.getOwnPropertyNames(obj));
  printPropertyChain(Object.getPrototypeOf(obj));
};

console.log("chain of object p");
printPropertyChain(p);

console.log("chain of object q");
printPropertyChain(q);

// `Object`, `Array`, `Date`, `Map` のプロトタイプチェーンの継承関係を確認
console.log(Object.prototype.isPrototypeOf(Array)); // eslint-disable-line
console.log(Object.prototype.isPrototypeOf(Date)); // eslint-disable-line
console.log(Object.prototype.isPrototypeOf(Map)); // eslint-disable-line
console.log(Array.prototype.isPrototypeOf(Date)); // eslint-disable-line
console.log(Array.prototype.isPrototypeOf(Map)); // eslint-disable-line
console.log(Date.prototype.isPrototypeOf(Map)); // eslint-disable-line
console.log(Date.prototype.isPrototypeOf(Array)); // eslint-disable-line
console.log(Map.prototype.isPrototypeOf(Array)); // eslint-disable-line
console.log(Map.prototype.isPrototypeOf(Date)); // eslint-disable-line
