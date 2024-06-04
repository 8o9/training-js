// WIP
export const getAllProperties = (obj: object): (symbol|string)[] => {
  // 列挙可能な継承プロパティはObject.keys()
  // 列挙不可・Symbolを含めた独自プロパティはReflect.ownKeys()
  let ret_array: (symbol|string)[] = Reflect.ownKeys(obj);
  let proto = Object.getPrototypeOf(obj);

  while(proto !== null && proto !== Object.prototype) {
    ret_array = [...ret_array, ...Object.keys(proto)];
    proto = Object.getPrototypeOf(proto);
  }
  return ret_array;
};
