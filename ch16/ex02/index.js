import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く

// シグナルをトラップして子プロセスに通知・終了させ、終了を確認したら自身も終了する
// ここでは以下シグナルをトラップする (SIGINT, Ctrl-Cは動作確認する)
const forwardSignals = () => {
  const signals = ["SIGINT", "SIGHUP", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`Received ${signal} signal`);
      if (child) {
        child.kill(signal);
        child.on("close", () => {
          console.log("Child process closed. so am I ...");
          process.exit(0);
        });
      }
    });
  });
};

// 子プロセスを再起動し続ける関数
async function reincarnateChild() {
  forwardSignals();
  let cond = true; // while (true)だとlintエラーになった
  while (cond) {
    const [code, signal] = await startChild();
    console.log(`child process exited with code ${code} and signal ${signal}`);
    // 異常終了した場合に再起動
    if (code !== 0 || signal !== null) {
      console.log("Restarting child process...");
      // 再起動の前に1秒待つ
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      cond = false;
    }
  }
}

reincarnateChild();
