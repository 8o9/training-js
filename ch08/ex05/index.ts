export const sequenceToObject = (...values: (string | number)[]) => {
  // 引数の数は偶数でないといけない。これだけだとstring:numberの順番はチェックできないので
  if (values.length % 2 !== 0) {
    throw new Error(
      `引数の数が偶数ではない(string, numberのペアを作るので偶数でないといけない)`,
    );
  }
  const ret: { [key: string]: number } = {};
  // 順序もstring: numberであることを確認しつつ返答オブジェクトを作成する
  for (let i = 0; i < values.length; i += 2) {
    if (typeof values[i] !== "string" || typeof values[i + 1] !== "number") {
      throw new Error(`引数の順番がstring, numberの順ではない`);
    }
    ret[values[i]] = Number(values[i + 1]);
  }
  return ret;
};
