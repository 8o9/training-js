export class IgnoreAccentPattern {
  private pattern;

  constructor(pattern: string | RegExp) {
    const isRegExp = pattern instanceof RegExp;
    const normalizedPattern = IgnoreAccentPattern.removeCDM(
      isRegExp ? pattern.source : pattern,
    );
    const flags = isRegExp ? pattern.flags : undefined;
    this.pattern = new RegExp(normalizedPattern, flags);
  }

  // 合成可能なダイアクリティカルマークをUnicode正規化して分解・除去
  // Caféをeと´に分解したあとは正規化された状態ではないので、再正規化しないと失敗するケースもあるらしい
  static removeCDM = (input: string) => {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC");
  };

  toString() {
    return this.pattern.toString();
  }

  [Symbol.search](s: string) {
    return IgnoreAccentPattern.removeCDM(s).search(this.pattern);
  }
  [Symbol.match](s: string) {
    return IgnoreAccentPattern.removeCDM(s).match(this.pattern);
  }
}
