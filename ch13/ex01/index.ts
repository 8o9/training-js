/* eslint-disable no-constant-condition */
import {} from "../ch13.ts";

setTimeout(() => console.log("Hello, world!"), 1000);

function longRunningFunction() {
  while (true) {
    // NOTE: while (true) {} は極端な例であり、現実で見ることは少ないかもしれません。
    // しかし、時間のかかる同期処理を実行して同様の問題が発生することは実際にあります。
  }
}

longRunningFunction();
