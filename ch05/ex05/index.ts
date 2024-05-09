type strNumObj = { [key: string]: number };

export const delOdds = (obj: strNumObj) => {
  let ret = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v % 2 === 0) {
      ret = { ...ret, [k]: v };
    }
  }
  return ret;
};
