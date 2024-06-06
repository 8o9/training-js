export const ppp = {
  r: 1.0,
  theta: 0.0,

  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(newX) {
    const nowY = this.y;
    this.r = Math.sqrt(newX * newX + nowY * nowY);
    this.theta = Math.atan2(nowY, newX);
  },

  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(newY) {
    const nowX = this.x;
    this.r = Math.sqrt(nowX * nowX + newY * newY);
    this.theta = Math.atan2(newY, nowX);
  },
};
