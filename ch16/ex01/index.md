## マルチスレッドとは
- UNIX系OSの領域でイメージされるのは、[Oracleのページ](https://docs.oracle.com/cd/E19683-01/816-3976/6ma7iosht/index.html)にあるような「1プロセスの中で複数のスレッドが動作すること」

## mFib.jsの結果
- 45, 1 thread
- MacOSのアクティビティモニタではnodeプロセスは最大で12スレッド、と表示された。CPU使用率は最大で100%程度
```shell
❯ node mFib.js 45 1
Worker 0 execution time: 22.627s
Total execution time: 22.650s
Fibonacci number: 1836311902
```

- 45, 2 threads
- MacOSのアクティビティモニタではnodeプロセスは最大で12スレッド、と表示された。CPU使用率は最大で190%程度
```shell
❯ node mFib.js 45 2
 
Worker 0 execution time: 8.626s
Worker 1 execution time: 14.034s
Total execution time: 14.045s
Fibonacci number: 1836311902
```

- 45, 3 threads
- MacOSのアクティビティモニタではnodeプロセスは最大で14スレッド、と表示された。CPU使用率は最大で250%程度
- (この辺りでアクティビティモニタに現れるより早くWorkerが終了することがありそうに見えてくる)
```shell
❯ node mFib.js 45 3
Worker 2 execution time: 4.479s
Worker 1 execution time: 7.125s
Worker 0 execution time: 11.415s
Total execution time: 11.426s
Fibonacci number: 1836311902
```

- 45, 4 threads
- MacOSのアクティビティモニタではnodeプロセスは最大で15スレッド、と表示された。CPU使用率は最大で290%程度
```shell
❯ node mFib.js 45 4
Worker 1 execution time: 2.777s
Worker 0 execution time: 4.228s
Worker 2 execution time: 6.613s
Worker 3 execution time: 10.468s
Total execution time: 10.480s
Fibonacci number: 1836311902
```

- 45, 8 threads
- MacOSのアクティビティモニタではnodeプロセスは最大で19スレッド、と表示された。CPU使用率は最大で290%程度
```shell
❯ node mFib.js 45 8
Worker 7 execution time: 859.382ms
Worker 5 execution time: 1.244s
Worker 0 execution time: 1.770s
Worker 1 execution time: 2.448s
Worker 2 execution time: 3.563s
Worker 3 execution time: 4.753s
Worker 4 execution time: 6.877s
Worker 6 execution time: 10.291s
Total execution time: 10.305s
Fibonacci number: 1836311902
```

- 45m 16 threads
- MacOSのアクティビティモニタではnodeプロセスは最大で27スレッド、と表示された。CPU使用率は最大で360%程度
```shell
❯ node mFib.js 45 16
Worker 9 execution time: 219.468ms
Worker 14 execution time: 241.964ms
Worker 10 execution time: 255.51ms
Worker 1 execution time: 291.242ms
Worker 5 execution time: 356.083ms
Worker 7 execution time: 472.229ms
Worker 15 execution time: 590.504ms
Worker 3 execution time: 834.097ms
Worker 4 execution time: 1.066s
Worker 6 execution time: 1.463s
Worker 8 execution time: 1.930s
Worker 2 execution time: 2.616s
Worker 0 execution time: 3.593s
Worker 11 execution time: 4.856s
Worker 12 execution time: 7.022s
Worker 13 execution time: 10.339s
Total execution time: 10.356s
Fibonacci number: 1836311902
```

## 利用コンピュータのCPUについてと上記結果の考察
- 1.4 GHz クアッドコアIntel Core i5 と言うCPUであった(2019年のMacBook Pro)
- また論理的なコア数は以下より8と推測される(ハイパースレッディング、物理コアで複数のスレッドを動かせる)
- 上記結果では、 Worker以外にもスレッドが10以上あるが、
  - 指定したスレッド数ぶんちゃんとモニタで見えるスレッド数も増えていること、
  - 計算内容にもよるが8スレッド程度で結果が飽和していること
がわかる
```
❯ sysctl -n hw.logicalcpu
8
```