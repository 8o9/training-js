export const isWeekEnd = (c: string) => {
  // 完全週休二日制における休日は土日でなくても良いが、今回は土日を休日とする
  if (c === "土" || c === "日") {
    return true;
  } else {
    return false;
  }
};

export const isWeekEndS = (c: string) => {
  // 完全週休二日制における休日は土日でなくても良いが、今回は土日を休日とする
  let res = false;
  switch (c) {
    case "土":
    case "日":
      res = true;
  }
  return res;
};
