// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

const defineProperty = <T>(
  obj: T,
  key: keyof T,
  value: T[keyof T],
  writable: boolean,
  enumerable: boolean,
  configurable: boolean,
): void => {
  Object.defineProperty(obj, key, {
    value: value,
    writable: writable,
    enumerable: enumerable,
    configurable: configurable,
  });
};

type TestObj = {
  key1?: number; // optionalでないとdeleteできない
};

const testProperty = (obj: TestObj) => {
  console.log(obj);
  console.log(Object.prototype.hasOwnProperty.call(obj, "key1"));
  console.log(Object.prototype.propertyIsEnumerable.call(obj, "key1"));
  console.log(Object.getOwnPropertyNames(obj));
  try {
    obj["key1"] = -0xff;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
  console.log(obj["key1"]);
  try {
    delete obj.key1;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
    }
  }
  console.log(obj);
  console.log(Object.getOwnPropertyNames(obj));
  console.log(`\n-----\n`);
};

const obj1: TestObj = {};
console.log(`wr: t, enu: t, conf: t`);
defineProperty(obj1, "key1", 1, true, true, true); // tt 変更削除可能
testProperty(obj1);

const obj2: TestObj = {};
console.log(`wr: f, enu: t, conf: t`);
defineProperty(obj2, "key1", 2, false, true, true); // tt 変更不可削除可能
testProperty(obj2);

const obj3: TestObj = {};
console.log(`wr: t, enu: f, conf: t`);
defineProperty(obj3, "key1", 3, true, false, true); // tf 列挙できず表示されないが変更でき、消せる
testProperty(obj3);

const obj4: TestObj = {};
console.log(`wr: t, enu: t, conf: f`);
defineProperty(obj4, "key1", 4, true, true, false); // tt 変更できるが消せない
testProperty(obj4);

const obj5: TestObj = {};
console.log(`wr: f, enu: f, conf: t`);
defineProperty(obj5, "key1", 5, false, false, true); // tf 列挙できぬ・変更できない・削除できる
testProperty(obj5);

const obj6: TestObj = {};
console.log(`wr: f, enu: t, conf: f`);
defineProperty(obj6, "key1", 6, false, true, false); // tt 列挙できる、変更できない、削除できない
testProperty(obj6);

const obj7: TestObj = {};
console.log(`wr: t, enu: f, conf: f`);
defineProperty(obj7, "key1", 7, true, false, false); // tf 列挙できない、変更できる、削除できない
testProperty(obj7);

const obj8: TestObj = {};
console.log(`wr: f, enu: f, conf: f`);
defineProperty(obj8, "key1", 8, false, false, false); // tf 列挙できない、変更できない、削除できない
testProperty(obj8);
