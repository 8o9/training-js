// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("./decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
const probabilityOfTrue = 0.1;
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    // new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
    new Array(COLS).fill(null).map(() => Math.random() < probabilityOfTrue)// 疎にする場合
  );

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let aliveSum = 0;
      for (let kc = -1; kc <= 1; kc++) {
        for (let kr = -1; kr <= 1; kr++) {
          const row_k = Math.min(ROWS - 1, Math.max(0, row + kr));
          const col_k = Math.min(COLS - 1, Math.max(0, col + kc));
          aliveSum += grid[row_k][col_k] ? 1 : 0;
        }
      }
      // dead or alive in next-gen
      let d_a = false;
      switch (aliveSum) {
        case 2:
        case 3:
          d_a = true;
      }
      nextGrid[row][col] = d_a;
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// NOTE: リフレッシュレートの高い画面では速く実行される (これを防ぐ場合は下記の例を参照)
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
let lastTime = 0;
const interval = 500;// msec
function update(timestamp) {
  // timestampは自動的に設定されるらし
  if (timestamp - lastTime >= interval) {
    grid = updateGrid(grid);
    renderGrid(grid);
    lastTime = timestamp;
  }
  animationId = requestAnimationFrame(update);
}
function start() {
  lastTime = performance.now();
  requestAnimationFrame(update);
  return lastTime;
}
startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  start();
  // update();
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(grid);
