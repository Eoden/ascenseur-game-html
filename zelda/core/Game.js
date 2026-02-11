import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.player = new Player(64, 64);
    this.generateRoom();
  }

  generateRoom() {
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

    // sortie au centre du mur du haut
    const exitX = Math.floor(this.map.width / 2);
    this.map.tiles[0 * this.map.width + exitX] = 2;
  }

  tick(dt) {
    this.player.update(dt);

    // collision sortie
    const tileSize = this.map.tileSize;
    const px = Math.floor(this.player.x / tileSize);
    const py = Math.floor(this.player.y / tileSize);

    const tile = this.map.tiles[py * this.map.width + px];
    if (tile === 2) {
      this.player.x = 64;
      this.player.y = 64;
      this.generateRoom();
    }
  }

  move(dx, dy) {
    this.player.move(dx, dy);
  }

  attack() {
    this.player.attack();
  }
}
