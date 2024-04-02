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
      return this.defaultValue;
    }
  }
}

class Histogram {
  constructor() {
    this.lettersCounts = new DefaultMap(0);
    this.totalLetters = 0;
  }
  add(text: string) {
    text = text.replace(/\s/g, "").toUpperCase();

    for(let character of text) {
      let count = this.letterCounts.get(character);
      this.letterCounts.set(character, count+1);
      this.totalLetters++;
    }
  }
}