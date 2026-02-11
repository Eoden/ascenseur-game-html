import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.player = new Player(100, 100);
  }

  tick(dt) {
    this.player.update(dt);
  }

  move(dx, dy) {
    this.player.move(dx, dy);
  }

  attack() {
    this.player.attack();
  }
}
