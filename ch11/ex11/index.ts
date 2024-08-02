// N 回何もしないループの時間を返す
function costOfLoop(N: number) {
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    // do nothing
  }
  const end = performance.now();
  return end - start;
}

// N 回 "Hello".length を実行 + N 回何もしないループの時間を返す
// とあるが、N回何もしないループがないので加えた
function costOfLengthPlusLoop(N: number) {
  const str = "Hello";
  let res = 0;
  const start = performance.now();
  for (let i = 0; i < N; i++) {
    res = str.length;
  }
  for (let i = 0; i < N; i++) {
    // do nothing
  }
  const end = performance.now();

  if (res !== 5) {
    throw new Error("something is wrong");
  }
  return end - start;
}

// "Hello".length 1回あたりの時間を返す
function costOfLength(N: number) {
  const lhs = costOfLengthPlusLoop(N);
  const rhs = costOfLoop(N);
  return (lhs - rhs) / N;
}

// 以下を変更して実験しなさい
console.log(costOfLength(1));
console.log(costOfLength(10000));
console.log(costOfLength(100000000));
console.log(costOfLength(1234567899));
