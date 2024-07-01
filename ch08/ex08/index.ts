// WIP
export function counterGroup() {
  let n = 0;
  let counterNum = 0;
  let counterSum = 0;
  return {
    newCounter() {
      const counter = {
        count() {
          return n++;
        },
        reset() {
          n = 0;
        },
      };
      counterNum++;
      counterSum += n;
      return counter;
    },
    total() {
      return counterSum;
    },
    average() {
      if (counterNum === 0) throw TypeError(`no counter`);
      return counterSum / counterNum;
    },
    variance() {
      return;
    },
  };
}
