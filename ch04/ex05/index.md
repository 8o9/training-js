<!-- Fizz、Buzz、FizzBuzz、数値、それぞれのケースで式がどのように評価されるか言及しつつ処理を説明しなさい。
```javascript
for (i = 1; i < 101; i++)
  console.log((i % 3 ? "" : "Fizz") + (i % 5 ? "" : "Buzz") || i); -->

- "FizzBuzz"が出力される場合

  - 例えば`i`が15の時、`console.log("Fizz" + "Buzz" || 15)`のようになる
  - 演算子の優先度は`+`の方が高いため、
  - `console.log("FizzBuzz" || 15)`のようになり、`||`の左辺を評価して`true` に変換される値のため`||`の右辺は評価されず、
  - `true`に変化される値の左辺が返されて`console.log("FizzBuzz")`となって"FizzBuzz"が出力される

- "Fizz"が出力される場合

  - 同様に、例えば`i`が3のとき、
  - `console.log("Fizz" + "" || 3)` のようになる。
  - `console.log("Fizz" || 3)`
  - `console.log("Fizz")`
  - となって"Fizz"が出力される

- "Buzz"が出力される場合

  - 同様に、例えば`i`が5のとき、以下のようになる
  - `console.log("" + "Buzz" || 5)`
  - `console.log("Buzz" || 5)`
  - `console.log("Buzz")`

- 数値が出力される場合

  - 例えば`i`が1のとき、
  - `console.log("" + "" || 1)`
  - `console.log("" || 1)`
  - のようになる。`""`は`false`に変換される値のため、`||`の右辺が評価され、`1`が返される
  - 結果、数値が出力される

- テキスト以外の参考
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Operator_precedence
