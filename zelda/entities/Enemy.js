export class Enemy {
  constructor(data) {
    Object.assign(this, data);
    this.dir = 'down';
    this.state = 'idle';
    this.frame = 0;
    this.frameTime = 0;
  }
}
