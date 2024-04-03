// ref: "JavaScript: The Definitive Guide", v7, Japanese

// Mapを拡張し、キーがマップ荷存在しない時、get()がnullの代わりにデフォルト値を返すようにする
class DefaultMap extends Map {
  private defaultValue;
  constructor(defaultValue: number) {
    super();
    this.defaultValue = defaultValue;
  }
  get(key: string) {
    if (this.has(key)) {
      return super.get(key);
    } else {
      // Mapにキーがなければ独自のデフォルト値を返す
      return this.defaultValue;
    }
  }
}

// 文字とそのカウント数をもち、ASCIIアートでヒストグラムを表示するためのクラス
class Histogram {
  private letterCounts;
  private totalLetters;
  constructor() {
    this.letterCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }

  // textの中の文字でヒストグラムを更新
  add(text: string) {
    // 空白を取り除き全て大文字に変換
    text = text.replace(/\s/g, "").toUpperCase();
    // 1文字ずつ、文字数をカウントしMapに追加/更新、全文字数もカウント
    for (const character of text) {
      const count = this.letterCounts.get(character);
      this.letterCounts.set(character, count + 1);
      this.totalLetters++;
    }
  }

  // ヒストグラムを文字列に変換し ASCIIグラフィックとして表示する
  toString() {
    // マップを [キー、文字数]に変換
    let entries = [...this.letterCounts];
    // 文字数順にソート。文字数が同じ場合はアルファベット順でソート
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1; // アルファベット順(昇順)
      } else {
        return b[1] - a[1]; // 文字数の降順
      }
    });
    // 文字数をパーセント(頻出度)に変換
    for (const entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100.0;
    }
    // 文字の頻出度1%以上を表示させる
    entries = entries.filter((entry) => entry[1] >= 1.0);
    // 表示用の1行のテキストに変換
    const lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`,
    );
    // 各行を改行文字で区切って結合、結合した文字列を返す
    return lines.join("\n");
  }
}

// 標準入力から取得したテキストを非同期に読み出し、ヒストグラムに追加し返す
async function histogramFromStdin() {
  process.stdin.setEncoding("utf-8");
  const histogram = new Histogram();
  for await (const chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

// 標準入力から得られたHistogramオブジェクトを使って、ヒストグラムを表示する
histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
