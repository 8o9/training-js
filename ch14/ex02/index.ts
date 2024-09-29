export class MyArrayLike {
  constructor(length: number) {
    this.length = length;
    for (let i = 0; i < length; i++) {
      this[i] = undefined;
    }
  }
  // 配列のように長さを取得できる
  length: number;
  // index signatureで配列のように要素が取れる
  [index: number]: string | number | undefined;

  static get [Symbol.species]() {
    return this;
  }
}

// @TODO ts(2417)の解消
//   - isArray, of, fromの実装がないからダメとのことだがisArrayでany[]を使うと他の28メソッドなども実装しろと言われる
export class MyArray extends Array {
  constructor(items: unknown[]) {
    // super(...items); だと、ts-234
    // 配列の初期化と設定
    super(items.length);
    for (let i = 0; i < items.length; i++) {
      this[i] = items[i];
    }
  }
  // map()やslice()といったArrayのメソッドで新しくMyArrayLikeを返す
  static get [Symbol.species]() {
    return MyArrayLike;
  }
}
