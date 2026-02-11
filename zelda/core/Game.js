import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.player = new Player(64, 64);
    this.input = { up:false, down:false, left:false, right:false };
    this.roomIndex = 0;
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

    const w = this.map.width;
    const h = this.map.height;

    const midX = Math.floor(w / 2);
    const midY = Math.floor(h / 2);

    const side = this.roomIndex % 4;

    if (side === 0) this.map.tiles[0 * w + midX] = 2;
    else if (side === 1) this.map.tiles[midY * w + (w - 1)] = 2;
    else if (side === 2) this.map.tiles[(h - 1) * w + midX] = 2;
    else this.map.tiles[midY * w + 0] = 2;
  }

  tick(dt) {
    const speedMultiplier = dt / 16;
    const tileSize = this.map.tileSize;

    let dx = 0;
    let dy = 0;

    if(this.input.up) dy -= 1;
    if(this.input.down) dy += 1;
    if(this.input.left) dx -= 1;
    if(this.input.right) dx += 1;

    if(dx !== 0 || dy !== 0){
      const nextX = this.player.x + dx * this.player.speed * speedMultiplier;
      const nextY = this.player.y + dy * this.player.speed * speedMultiplier;

      const cx = nextX + 16;
      const cy = nextY + 16;

      const px = Math.floor(cx / tileSize);
      const py = Math.floor(cy / tileSize);

      const tile = this.map.tiles[py * this.map.width + px];

      if(tile !== 1){
        this.player.x = nextX;
        this.player.y = nextY;
      }
    }

    this.player.update(dt);

    const cx = this.player.x + 16;
    const cy = this.player.y + 16;
    const px = Math.floor(cx / tileSize);
    const py = Math.floor(cy / tileSize);

    const tile = this.map.tiles[py * this.map.width + px];
    if (tile === 2) {
      this.roomIndex++;
      this.player.x = 64;
      this.player.y = 64;
      this.generateRoom();
    }
  }

  attack() {
    this.player.attack();
  }
}
