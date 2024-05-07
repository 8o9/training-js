type strNumObj = { [key: string]: number };

export const delOdds = (obj: strNumObj) => {
  let ret = {};
  for (const k of Object.keys(obj)) {
    if (obj[k] % 2 === 0) {
      ret = { ...ret, [k]: obj[k] };
    }
  }
  return ret;
};
