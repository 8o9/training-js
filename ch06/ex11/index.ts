export const ppp = {
  r: 1.0,
  theta: 0.0,

  get x() {
    return this.r * Math.cos(this.theta);
  },
  set x(newX) {
    if (isNaN(newX)) return;
    const nowY = this.y;
    this.r = Math.hypot(newX, nowY);
    this.theta = Math.atan2(nowY, newX);
  },

  get y() {
    return this.r * Math.sin(this.theta);
  },
  set y(newY) {
    if (isNaN(newY)) return;
    const nowX = this.x;
    this.r = Math.hypot(nowX, newY);
    this.theta = Math.atan2(newY, nowX);
  },
};
