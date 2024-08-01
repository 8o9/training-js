export function sayHi(name: string): string {
  return `Hi, ${name}!`;
}

export class Hey {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hey, ${this.name}!`;
  }
}
