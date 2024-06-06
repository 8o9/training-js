export const getAllProperties = (obj: object): (symbol | string)[] => {
  // 列挙不可・Symbolを含めた独自プロパティはReflect.ownKeys()
  const ret_array: (symbol | string)[] = [...Reflect.ownKeys(obj)];

  // 列挙可能なプロパティ。継承したものも含む
  for (const p in obj) {
    ret_array.push(p);
  }

  // 重複は省く
  return [...new Set(ret_array)];
};
