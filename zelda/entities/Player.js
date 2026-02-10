export class Player {
  constructor() {
    this.x = 5;
    this.y = 8;
    this.dir = 'up';
    this.state = 'idle'; // idle | walk | attack
    this.frame = 0;
    this.frameTime = 0;
    this.attackCooldown = 0;
  }
}
