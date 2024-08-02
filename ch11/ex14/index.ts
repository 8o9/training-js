export function sortJapanese(strings: string[]): string[] {
  const compare = (a: string, b: string) => {
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    // 日本語文字列の大文字小文字濁点半濁点を正規化する、はず
    const normalizedA = a.normalize("NFKC");
    const normalizedB = b.normalize("NFKC");
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    return normalizedA.localeCompare(normalizedB, "ja");
  };
  // コピーしてソートして返す
  return strings.slice().sort(compare);
}

export function toJapaneseDateString(date: Date): string {
  // 令和元年の日付を基準に計算
  // 令和元年5月1日:
  const reiwaStart = new Date(2019, 4, 1);
  // 大体の年数
  const years =
    Math.floor(
      (date.getTime() - reiwaStart.getTime()) / (1000 * 60 * 60 * 24 * 365.3),
    ) + 1;
  const yearString = `令和${years}年`;
  const monthString = `${date.getMonth() + 1}月`;
  const dayString = `${date.getDate()}日`;
  return `${yearString}${monthString}${dayString}`;
}

const japaneseWords = ["東京", "大阪", "北海道", "こっとう", "こつつぼ", "こづつみ"];
const sortedWords = sortJapanese(japaneseWords);
console.log(sortedWords);

const today = new Date();
const warekiToday = toJapaneseDateString(today);
console.log(warekiToday);
