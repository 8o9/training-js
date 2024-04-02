
export class Point {
  private _coords: number[];

  constructor(dimensions: number = 2) {
    this._coords = new Array(dimensions).fill(0.0);
  }

  getCoords() {
    return this._coords;
  }

  setCoords(newcoords: number[]) {
    if(newcoords.length !== this._coords.length) {
      throw new Error('Dimensions do not match');
    }
    this._coords = newcoords;
  }

  add(newPoint: Point) {
    const newCoords = newPoint.getCoords();
    if(newCoords.length !== this._coords.length) {
      throw new Error('Dimensions do not match');
    }
    this._coords = this._coords.map((value, index) => value + newCoords[index]);
  }
}