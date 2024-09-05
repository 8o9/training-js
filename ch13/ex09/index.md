```js
async function i1() {
  // NOTE: any で1つ Promise が解決された時に他の Promise はどうなるだろうか
  let v = 0;

  v = await Promise.any([
    wait1().then(() => 42),
    wait2()
      .then(() => (v = 100))
      .then(() => 0),
  ]);

  log(v);
  await wait2();
  log(v);
  // await wait(500);
  // log(v);
  // await wait(500);
  // log(v);
  // await wait(500);
  // log(v);
  // await wait(500);
  // log(v);
}
```

- vには42が入っているだけだと思っていたが、2度目のlog(v)で100が出た
- Promise.any()に渡った配列の2つ目の要素は動作しており、vという変数に100が入ったと推測した(上記コメント部分)。

```js
async function i2() {
  const v = await Promise.all([
    wait3().then(() => {
      logA();
      return "A";
    }),
    wait2().then(() => {
      logB();
      return "B";
    }),
    wait1().then(() => {
      logC();
      return "C";
    }),
  ]);
  log(v);
}
```

- C, B, Aが1秒ごとに出力され、vには全てのタスク?が完了した結果が入っていると推測した、多分そうなった

```js
async function i3() {
  // NOTE: all で引数の1つが失敗すると他の Promise はどうなるだろうか
  let v = 42;
  try {
    await Promise.all([
      wait3().then(() => {
        v = 0;
        errX();
      }),
      wait2().then(() => {
        logB();
        return "B";
      }),
      wait1().then(() => {
        errY();
      }),
    ]);
  } catch (e) {
    log(e.message);
    log(v);
    await wait3();
    log(v);
  }
}
```

- 予測せず実行してしまった。結果から中身を考察した
- Promise.all()の中の3タスクは同時に開始して何かしら結果が出るまでずっと待つはずなので、
  - 開始1秒後3番目のタスクで例外が発生しキャッチ、Yとv(まだ42)が出力
    - 同時にwait3()開始・完了まち(await)
  - 開始2秒後に2番目のタスクでBが出力
  - 開始3秒後にvが0にセットされる。例外Xはcatch()できない（すでに実行されているから？）
  - 開始4秒後にwait3()が完了し、catch()の中でv(0)が出力される

```js
async function i4() {
  // NOTE: i5, i6 との比較用 (直列に処理を実行したいものとする)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(() => wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
```

- 開始から5, 4, 3, 2, 1秒後にそれぞれ0, 1, 2, 3, 4を出力後"COMPLETED"を出力すると予想
  - が、それぞれ数字が出力された後にwaitがあるような動作だったので誤りだった
- pはresolve()で即開始され、for文の中でwait(5000)が終わって0が出力したらiが更新されると考えられる

```js
async function i5() {
  // NOTE: このコードは期待通りの挙動をすると考えられるだろうか？(典型的なミス)
  let p = Promise.resolve(null);
  for (let i = 0; i < 5; ++i) {
    p = p.then(wait((5 - i) * 1000).then(() => log(i)));
  }
  return p.then(() => log("COMPLETED"));
}
```

- for()の中のwaitのところが関数になっていないので、5-i秒待ってiを出力する、が別々に実行開始されると予想（4, 3, 2, 1, 0という出力）。COMPLETEDはどうなるかわからなかったが一番最初に出力された
- for()の中のthenがそれぞれ待機しないから、即時COMPLETED出力になった？

```js
async function i6() {
  return Promise.all(
    [0, 1, 2, 3, 4].map((i) => wait((5 - i) * 1000).then(() => log(i))),
  ).then(() => log("COMPLETED"));
}
```

- 開始から5, 4, 3, 2, 1秒後にそれぞれ0, 1, 2, 3, 4を出力後"COMPLETED"を出力すると予想
- 同時にwaitが開始したからだと推測する

```js
async function i7() {
  // NOTE: i8 との比較用
  let v = 0;

  // 1秒待った後に2秒間隔で value の値を更新
  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  // 2秒間隔で value の値を更新
  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      v = next;
      await wait2();
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
```

- 10が出力されると思った
  - p1: , 2, , 4, , 6, , 8, , 10
  - p2: 1, , 3, , 5, , 7, , 9,

```js
async function i8() {
  // NOTE: 複数の非同期処理が1つの変数に対し書き込みを行う場合、読み込みと書き込みの間に await が入るとどうなるだろうか
  let v = 0;

  const p1 = async () => {
    await wait1();
    for (let i = 0; i < 5; i++) {
      // NOTE: value の読み込み (value + 1) と書き込み (value = ...) の間に await が...
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  const p2 = async () => {
    for (let i = 0; i < 5; i++) {
      const next = v + 1;
      await wait2();
      v = next;
    }
  };

  await Promise.all([p1(), p2()]);
  log(v);
}
```

- await wait2()が間に挟まるので5が出力されると予想
- p2の方でnextは1から始まるが、そこから2秒立つ間にvは更新されず、p1の方のnext更新が入るので
