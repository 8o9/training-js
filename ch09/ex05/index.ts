// MDNによると「instanceof 演算子は、あるコンストラクターの prototype プロパティが、
// あるオブジェクトのプロトタイプチェーンの中のどこかに現れるかどうかを検査します。返値は論理値です。」
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/instanceof
//
// memo:
// サイ本の9.2にあるように、prototypeプロパティを持つコンストラクタ関数を
// new コンストラクタ関数()と呼んだ際、コンストラクタ関数.prototypeが継承される
// ので、コンストラクターはクラスとほぼ同じだと思われる
// また9.2.2や図9-1にあるように、関数.prorotype.constructor.prototype === 関数.prototype
export function instanceOf<T>(
  object: unknown,
  constructor: { new (...args: unknown[]): T },
): boolean {
  while (object) {
    if (object === constructor.prototype) {
      return true;
    }
    object = Object.getPrototypeOf(object);
  }
  return false;
}
