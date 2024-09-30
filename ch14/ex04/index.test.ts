import { HiraganaUTF16 } from "./index.ts";

describe("HiraganaUTF16", () => {
  test("正しいひらがなでインスタンスが作成?", () => {
    const hiragana = new HiraganaUTF16("あ");
    expect(hiragana.hiraganaChar).toBe("あ");
    expect(hiragana.utf16CodeUnits).toBe("3042");
  });

  test("ひらがな以外の文字を受け取るとエラーがthrow?", () => {
    expect(() => new HiraganaUTF16("a")).toThrow("ひらがな1文字にしてくれ");
    expect(() => new HiraganaUTF16("aん")).toThrow("ひらがな1文字にしてくれ");
    expect(() => new HiraganaUTF16("アこ")).toThrow("ひらがな1文字にしてくれ");
    expect(() => new HiraganaUTF16("")).toThrow("ひらがな1文字にしてくれ");
    expect(() => new HiraganaUTF16("🧑‍🧑‍🧒")).toThrow(
      "ひらがな1文字にしてくれ",
    );
    expect(() => new HiraganaUTF16("薔薇")).toThrow("ひらがな1文字にしてくれ");
  });

  test("数値として変換される?", () => {
    const hiragana = new HiraganaUTF16("あ");
    expect(+hiragana).toBe(3042);
  });

  test("文字列として変換される?", () => {
    const hiragana = new HiraganaUTF16("あ");
    expect(`${hiragana}`).toBe("あ");
  });

  test("ひらがな文字の配列をUTF-16コード単位順にソートできる?", () => {
    const hiraganaList = [
      new HiraganaUTF16("い"),
      new HiraganaUTF16("あ"),
      new HiraganaUTF16("う"),
    ];
    hiraganaList.sort((a, b) => +a - +b);
    expect(hiraganaList.map((h) => h.hiraganaChar)).toEqual(["あ", "い", "う"]);
  });

  test("ひらがな文字を < や > で比較できる?", () => {
    const hiraganaA = new HiraganaUTF16("あ");
    const hiraganaI = new HiraganaUTF16("い");
    expect(hiraganaA < hiraganaI).toBe(true);
    expect(hiraganaI > hiraganaA).toBe(true);
  });
});
