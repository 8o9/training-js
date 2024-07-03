export class C {
  static method() {
    return 1;
  }
  method() {
    return 2;
  }
  static C = class {
    static method() {return 3;}
    method() {return 4;}
  };
  C = {
    method() {
      return 5;
    }
  };
  // WIP(NG)
  // constructor() {
  //   this.method(){return 6;}
  // }
}
