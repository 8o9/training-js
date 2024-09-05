## f1()

```js
function f1() {
  wait3()
    .then(logA)
    .then(() => wait2().then(logB))
    .then(() => wait1().then(logC));
}
```

- 予想通り順に出力された
  - 3秒>A>2秒>B>1秒>C
- 3秒して(wait3) logA が実行され、wait2().then(logB) の解決後 (2秒後に B 出力) に wait1().then(logC) が実行されたから

## f2()

```js
function f2() {
  wait3()
    .then(logA)
    .then(() => {
      wait2().then(logB);
    })
    .then(() => wait1().then(logC));
}
```

- 3秒まってAが出力、2秒たってB, さらに1秒経ってCが出力されると思った（returnがないのはわかるがNOTEがなかったら読み飛ばしそう）
- 3秒>A>1秒>C>1秒>Bの順だった。2つ目のthen()にreturnがないので、2つ目のthen()実行後Promiseは返るが満たされるのを待たずにwait2()が動き始め、すぐに3つ目のthen()も実行が開始し、1秒後Cが出力され、さらに1秒後Bが出力されたから

## f3()

```js
function f3() {
  // NOTE: then のコールバック内の例外は try/catch でキャッチできるだろうか
  try {
    wait(0).then(logA).then(errX);
  } catch (e) {
    logB();
  } finally {
    logC();
  }
}
```

- A > B > Cのように出力されると思ってしまったが、実行直後にC>Aの順に表示されただけだった
- 考察
  - まずtry{}のwait(0)、then()、then()でPromiseが登録
  - その後すぐにtry節は終わるためfinallyでCが出力、
  - wait(0)でPromiseが満たされてlogAでAが出力、Promiseが満たされてerrXを実行するもcatch()とは非同期に動いているのでError("X")をしても捉えられずにBは出力されない

## f4()

```js
function f4() {
  // NOTE: f5 との比較用
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then((value) =>
      wait(1000).then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}
```

- 2秒してAが出力、1秒してBが出力、直後に100が出力されるだろう > そうなったと思う
- 2つ目のthenの中のthenで100がreturnされているが、それが2つ目のthenに渡る(使われない)。
- value => wait(1000)...のように書かれるので、Bを出力後100が返って、それがvalue => のアロー関数でreturnに渡り、次のthen((v)...)に渡ったんだろう

## f5()

```js
function f5() {
  // NOTE: 2つ目の then の引数が関数でなく Promise になっている (典型的なミス)
  wait2()
    .then(() => {
      logA();
      return 40;
    })
    .then(
      wait1().then(() => {
        logB();
        return 100;
      }),
    )
    .then((v) => log(v));
}
```

- 2つ目の引数が関数になっていないので、非同期で2つ目のthen()のなかのwait1以下がすぐに実行されるだろうと思った。
- 1秒 > B > 1秒 > A, 40
  - wait2開始直後にwait1も開始し解決後にBが出力、100はreturnされるがthenには渡らない(関数ではないので)
  - 1秒後にAが出力、40をreturnし
  - 3つ目のthen()で40が出力

## f6()

```js
function f6() {
  // NOTE: 1つの Promise に対し then を2回呼び出すとどうなるか
  const p = wait1().then(logA);
  p.then(() => wait1()).then(logB);
  p.then(() => wait2()).then(logC);
}
```

- 2つのthen()はどちらも登録されて並行して動き、1秒待ってA, 1秒待ってB, 1秒待ってC出力されると思った
  - 1s > A > 1s > B > 1s > C

## f7()

```js
function f7() {
  // NOTE: 2つ目の wait の引数が実行される差には p は解決済み
  // (= 解決済みの Promise の then を呼び出すとどうなるか)
  const p = wait1().then(logA);
  wait2()
    .then(() => {
      return p.then(logB);
    })
    .then(logC);
}
```

- 実行後1秒経ってA出力、その後1秒してBとCが同時に出力だと思った: そのようだった
  - 1s > A > 1s > B, C
  - 2つ目のthenの中身は解決済みになっているので即実行される?

## f8()

```js
function f8() {
  // NOTE: f9, f10 との比較用
  wait1()
    .then(errX)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
```

- 実行して1秒後、X出力後にAが出力と予想(errYのthen()は飛ばされる): そのようだった
  - 1s > X > A

## f9()

```js
function f9() {
  // NOTE: f12 との比較用
  wait1()
    .then(() => 42)
    .then(errY)
    .catch((e) => log(e.message))
    .finally(logA);
}
```

- Y出力後にA出力だと思った(errYがcatch(), その後finallyが実行)
  - 1s > Y, A

## f10()

```js
function f10() {
  // NOTE: then(r, c) と then(r).catch(c) は等しいか？
  wait1()
    .then(() => 42)
    .then(errY, (e) => log(e.message))
    .finally(logA);
}
```

- p.383を読んで、1つ目の`then(() => 42)`でエラーが起きていないので、errYが実行されると考えた(e => log(e.message)は実行されない)
- が、errYでErrorをthrowしても受け取る人がいない
- のでfinally(logA)だけ実行されるから1s経ったらAが出力されると考えた
- そのような感じになった

## f11()

```js
function f11() {
  // f12 との比較用: new Promise 内の throw は .catch でキャッチできるか？
  new Promise((resolve, reject) => {
    errX();
  }).catch((e) => log(e.message));
}
```

- errX()を実行してもrejectしてないからcatchできず、何も起きないと考えた
- が、即Xが出力されたのでcatchできていそうだった。Error発生時にrejectされた？

## f12()

```js
function f12() {
  // new Promise 内だがコールバック関数で throw した場合は？
  new Promise((resolve, reject) => {
    setTimeout(() => errX(), 0);
  }).catch((e) => log(e.message));
}
```

- setTimeout()でのコールバック関数では例外をスローする先がないので何も起きなさそう
- ブラウザのコンソールでは何も起きなかった

```
// playcode.io/javascriptでは、エラー
Error: X
    at errX (<anonymous>:21:9)
stack
:
"Error: X\n at errX (<anonymous>:21:9)\n at <anonymous>:99:22"
message
:
"X"
```
