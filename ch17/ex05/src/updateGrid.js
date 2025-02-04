import { ROWS, COLS } from './index.js';

// Life Game のルールに従ってセルを更新する
export function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      let aliveSum = 0;
      for (let kc = -1; kc <= 1; kc++) {
        for (let kr = -1; kr <= 1; kr++) {
          // 近傍を確認するので自身は無視
          if (kc === 0 && kr === 0) continue;
          const row_k = Math.min(ROWS - 1, Math.max(0, row + kr));
          const col_k = Math.min(COLS - 1, Math.max(0, col + kc));
          aliveSum += grid[row_k][col_k] ? 1 : 0;
        }
      }
      // dead or alive in next-gen
      let d_a = false;
      if (grid[row][col] === false && aliveSum === 3) d_a = true;
      if (grid[row][col] === true && (aliveSum === 2 || aliveSum === 3))
        d_a = true;
      nextGrid[row][col] = d_a;
    }
  }
  return nextGrid;
}
