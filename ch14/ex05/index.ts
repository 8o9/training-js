export const _type = (strings: TemplateStringsArray, ...values: unknown[]) => {
  const getType = (v: unknown) => {
    if (v === null || v === undefined) return String(v);
    return v.constructor.name;
  };
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += getType(values[i]) + strings[i + 1];
  }
  return result;
};
