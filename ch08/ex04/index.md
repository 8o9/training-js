- nm()はfunction()のように定義された関数で、arrow()はアロー関数で定義されている
- この違いにより、thisの値が変わる
- nest.nm()を実行した時のthisはnestオブジェクトになるので、
  - false, true
- nest.arrow()を実行した時、arrow()の中のthisはアロー関数なので、arrow()の定義されているom関数のthisを引き継ぐ
  - om()はfunctionで定義された関数なのでobj.om()とした時omのthisはobj
  - だから true, false

- 以下のようにすると、
```js
const obj = {
  om: () => {
    const nest = {
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest, this);
      },
    };
    nest.nm();
    nest.arrow();
  },
};
obj.om();
```
結果は以下のようになった
```
false, true
false, false, undefined
```