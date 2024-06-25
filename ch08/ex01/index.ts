// 引数、戻り値ともに括弧は省略しない
export const func8_1_1 = (n: number, c: string): string[] | undefined => {
  if (!(Number.isSafeInteger(n) && n > 0)) return undefined;
  if (!/^[a-zA-Z0-9]$/.test(c)) return undefined;
  let i = 0;
  while (i < n) {
    console.log(c);
    i++;
  }

  return Array(n).fill(c);
};

// returnを記載しない場合、戻り値については{}や()を記載しなくても良い
export const func8_1_2 = (x: number): number => x ** 2;

// 引数はない: アロー関数のため丸括弧を記載する
// returnを記載しない場合、戻り値のオブジェクトをカッコで囲む
export const func8_1_3 = () => ({ now: Date.now() });
