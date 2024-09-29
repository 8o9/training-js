export class HiraganaUTF16 {
  hiraganaChar: string;
  utf16CodeUnits: string;

  constructor(character: string) {
    if (character.length !== 1 || !/^[\u3040-\u309F]$/.test(character)) {
      throw new Error("ひらがな1文字にしてくれ");
    }
    this.hiraganaChar = character;
    this.utf16CodeUnits = character.charCodeAt(0).toString(16);
  }

  [Symbol.toPrimitive](arg: string) {
    if (arg === "number") return this.utf16CodeUnits;
    return this.hiraganaChar;
  }
}
