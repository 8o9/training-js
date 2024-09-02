## イテレータ

- 反復処理ができることを示す[Symbol.iterator](), イテレーションのロジックとなるnext()は`for ...of`を使って勝手に呼び出された。
  - [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%8D%E5%BE%A9%E5%8F%AF%E8%83%BD%E3%83%97%E3%83%AD%E3%83%88%E3%82%B3%E3%83%AB)
- next()は直接呼び出しても良い
- throw()例外をスローできた
- Symbol.iteratorはMDNでは`@@iterator`という呼び方もされていた
- 例ではSymbol.iteratorが自分自身(this)を返しているため、複数のイテレータを作ると状態を同時に利用してしまう。そのためSymbol.iteratorのなかでnext()以降をreturnしても良いかもしれない

```js
// ブラウザのコンソールで実行

const iter = counterIter(5);

// -- 1
for (const num of iter) {
  console.log(num);
}
// counterIter: Symbol.iterator
// counterIter: next
// 1
// counterIter: next
// 2
// counterIter: next
// 3
// counterIter: next
// 4
// counterIter: next
// 5
// counterIter: next

// -- 2
iter.next();
// {value: undefined, done: true}

iter2.next();
// counterIter: next;
// {value: 1, done: false}

iter2.next();
// counterIter: next;
// {value: 2, done: false}

iter2.next();
// counterIter: next;
// {value: 3, done: false}

iter2.next();
// counterIter: next;
// {value: undefined, done: true}

// -- 3
try {
  iter2.throw(new Error("Something went wrong"));
} catch (e) {
  console.log(e);
}
```

## ジェネレータ関数

- 以下の実行例を試した
  - `counterGen`のみの行が出るのが最初の`next()`なのは、それまで実行されていないから。またyieldで停止するのでそれ以降は出ない
  - `for`文が終わるまでは`finally()`にはいかず`yield`し続ける
  - ジェネレータオブジェクト(cnt)のthrow()で呼び出せた

```js
// ブラウザのコンソールで実行
const cnt = counterGen(3);
cnt.next();
// counterGen
// counterGen: next
// {value: 1, done: false}
cnt.next();
// counterGen: next
// {value: 2, done: false}
cnt.next();
// counterGen: next
// {value: 3, done: false}
cnt.next();
// counterGen: finally
// {value: undefined, done: true}
cnt.next();
// {value: undefined, done: true}
console.log(cnt.throw(new Error("エラーですか☺️")));
// Uncaught
// Error: エラーですか☺️
```
