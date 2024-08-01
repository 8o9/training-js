export class TypeMap {
  private map = new Map();

  set(key: new (...args: unknown[]) => unknown, value: unknown): void {
    // あとで使うinstanceofはプリミティブ値(String ...)に対応していないらしい
    if (key === String && typeof value !== "string") {
      throw new Error("Value is not a string");
    }
    if (key === Number && typeof value !== "number") {
      throw new Error("Value is not a number");
    }
    if (key === Boolean && typeof value !== "boolean") {
      throw new Error("Value is not a boolean");
    }
    if (typeof value === "object" && !(value instanceof key)) {
      throw new Error("Value is not an instance of the key constructor()");
    }
    this.map.set(key, value);
  }

  get(key: new (...args: unknown[]) => unknown): unknown {
    return this.map.get(key);
  }
}

/////////////////////


const typeMap = new TypeMap();
typeMap.set(String, "string");
typeMap.set(Number, 123);
class Foo {}
typeMap.set(Foo, new Foo());

// typeMap.set(Date, "not a date"); // -> Error

console.log(typeMap.get(String)); // -> "string"
console.log(typeMap.get(Number)); // -> 123
console.log(typeMap.get(Foo)); // -> Foo {}