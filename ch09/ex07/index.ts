// どうでも良いが、鳴く(音を出す)魚はいるらしい
export class Animal {
  eat() {
    // ...
  }
  makeSound() {}
}

// FishがmakeSound()を継承しないようにした
// Animalがたくさんメソッドを持っていたら委譲も大変
export class Fish {
  private animal: Animal;
  constructor(animal?: Animal) {
    this.animal = animal || new Animal();
  }
  eat() {
    return this.animal.eat();
  }
  swim() {}
}
