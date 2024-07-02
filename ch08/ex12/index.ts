export const f = (argsstr: string) => {
  // $で始まり数字1桁か2桁のものを変数として抽出し配列に入れる。見つからなければ空の配列
  const argsarr = argsstr.match(/\$\d{1,2}/g) || [];
  // Function()の最後の文字列を作成する。'return 'がない場合、'return 'をf()の引数につける
  const fbody = (argsstr.includes("return ") ? "" : "return ") + argsstr;
  // MDNによると関数本体の前までは、カンマで変数を並べたもので良い(空配列の場合空文字になる。無問題)
  return Function(argsarr.join(","), fbody);
};
