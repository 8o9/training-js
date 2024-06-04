const prototypeObject = {
  36: "数値名プロパティ名", // "36"でも同じ?
  "name": "文字列名プロパティ"
};

const obj = Object.create(prototypeObject);

obj[-1] = "新しい数値名プロパティ";
obj["name2"] = "新しい文字列名プロパティ";

obj[36] = "プロトタイプと同名の数値名プロパティ";
obj["name"] = "プロトタイプと同名の文字列名プロパティ";

Object.defineProperty(obj, "name", {
  enumerable: false
});

for (const key in obj) {
  console.log(`${key}, ${obj[key]}`);
}
// 36, プロトタイプと同名の数値名プロパティ
// -1, 新しい数値名プロパティ
// name2, 新しい文字列名プロパティ
//// nameは列挙/表示されない

console.log('-----');

for (const key of Reflect.ownKeys(obj)) {
  console.log(`${String(key)}, ${obj[key]}`);
}
// 36, プロトタイプと同名の数値名プロパティ
// -1, 新しい数値名プロパティ
// name2, 新しい文字列名プロパティ
// name, プロトタイプと同名の文字列名プロパティ
