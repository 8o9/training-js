```js
async function h1() {
  try {
    await wait3();
    logA();
    await wait2();
    logB();
    await wait1();
    logC();
  } catch (e) {
    log(e.message);
  }
}
```

- 3秒たってA出力、2秒たってB出力、1秒たってC出力、という予想
- 多分そうなったと思う
- `await`のところで完了を待つから

```js
function h2() {
  // NOTE: h3 との比較用
  new Promise(() => {
    errX();
  }).catch((e) => log(e.message));
}
```

- Promise()がreturnされていないので、h2を呼んでも呼び出した側にPromiseが渡らずthen()やcatch()は使えない。
- Promise()の中の関数が即実行され、Promise内部で例外が発生して自動的にすぐrejectされてXが表示されるのでは。

```js
function h3() {
  // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
  new Promise(async () => {
    errX();
  }).catch((e) => log(e.message));
}
```

- 同様にreturnされていないので呼び出し側でチェーンできないが、asyncはなくても良さそうで、動作もh2()と変わらないと予想した
- 実行した環境(playcode.io/javascript)ではXが表示されなかった。ブラウザのコンソールではXが即表示された

```js
async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
```

- p2の中のwait1()の方が、p1の中のwait2()よりも短いのではあるが、await p1とあるのでそもそもp2が実行されないと考えた。結果、errX()が実行されてそれがキャッチされ、Xが出力されると思った。
- ブラウザで実行したところXが出力されたが、errY()がキャッチできなかったという表示がX出力前にあった。ので、p2も動作していることが推察された。つまり考えが誤っていた
- p1, p2はPromise()を返すようになっているため、p1, p2が評価されたところで同時にタイマーが動き始めるのではないか。wait1()の方が1秒早く終わってerrY()を実行しようとするも、await p1の方が先に記載されているのでerrY()は実行されない、1秒たってawait p1のところで待機しているためerrX()が実行され、キャッチされてXが出力されるのではないだろうか
