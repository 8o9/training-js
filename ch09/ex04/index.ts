export class Warr {
  #atk: number;
  #atkratio: number;
  constructor(atk: number = 10, atkratio: number = 2.0) {
    if (atk < 0 || atkratio < 0) {
      [atk, atkratio] = [1, 1.0];
    }
    [this.#atk, this.#atkratio] = [atk, atkratio];
  }
  get atk() {
    return this.#atk;
  }
  get atkratio() {
    return this.#atkratio;
  }
  get attack() {
    return this.#atk * this.#atkratio;
  }
  set atk(atk: number) {
    this.#atk = atk;
  }
  set atkratio(atkratio: number) {
    this.#atkratio = atkratio;
  }
}

//! プロトタイプベースの書き方では上手くいかなかった(@TODO部分)。
//! classで書くことにする
// MagicWarr.prototype = Object.create(Warr.prototype);
// MagicWarr.constructor = MagicWarr;
// export function MagicWarr(atk: number=10, atkratio: number=2.0, mgc:number=2.4) {
//   if(atk < 0 || atkratio < 0 || mgc < 0) {
//     [atk, atkratio, mgc] = [1, 1.0, 1.0];
//   }
//   Warr.call(this, atk, atkratio); //@TODO ここがエラーになる... 断念
//   this.mgc = mgc; //@TODO ここも。mgcをプライベートにしたかった
// }

export class MagicWarr extends Warr {
  #mgc: number;
  constructor(atk: number = 10, atkratio: number = 2.0, mgc: number = 2.4) {
    super(atk, atkratio);
    if (mgc < 0) {
      mgc = 1.0;
    }
    this.#mgc = mgc;
  }
  get attack(): number {
    return this.atk * this.atkratio * this.#mgc;
  }
  get mgc(): number {
    return this.#mgc;
  }
  set mgc(mgc: number) {
    this.#mgc = mgc;
  }
}
