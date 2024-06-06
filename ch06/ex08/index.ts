export const restrict = (
  target: Record<string, unknown>,
  template: Record<string, unknown>,
) => {
  for (const p in target) {
    // templateに無いプロパティをtargetから消す
    if (!Object.prototype.hasOwnProperty.call(template, p)) {
      delete target[p];
    }
  }
  return target;
};

export const substract = (
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
) => {
  for (const source of sources) {
    for (const p in source) {
      // sourceの各プロパティがtargetにあったら消す
      if (Object.prototype.hasOwnProperty.call(source, p) && p in target) {
        delete target[p];
      }
    }
  }
  return target;
};
