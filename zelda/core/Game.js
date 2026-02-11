import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.player = new Player(64, 64);

    this.map = {
      tileSize: 32,
      width: 13,
      height: 13,
      tiles: []
    };

    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        if (x === 0 || y === 0 || x === this.map.width - 1 || y === this.map.height - 1) {
          this.map.tiles.push(1);
        } else {
          this.map.tiles.push(0);
        }
      }
    }
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
