import Player from '../entities/Player.js';

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

    const w = this.map.width;
    const h = this.map.height;

    // 🛂 Special layout: Sécurité Douane (roomIndex === 5)
    if (this.roomIndex === 5) {
      const layout = [
        "1111111111111",
        "1000000000001",
        "1033300003301",
        "1000000000001",
        "1000033300001",
        "1000000000001",
        "1000033300001",
        "1000000000001",
        "1000000000001",
        "1000000000201",
        "1000000000001",
        "1000000000001",
        "1111111111111"
      ];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          this.map.tiles.push(parseInt(layout[y][x]));
        }
      }

      // spawn player bottom-left safe zone
      this.player.x = 64;
      this.player.y = 64;

      return;
    }

    // Default procedural room (legacy behavior)
    for (let y = 0; y < this.map.height; y++) {
      for (let x = 0; x < this.map.width; x++) {
        if (x === 0 || y === 0 || x === this.map.width - 1 || y === this.map.height - 1) {
          this.map.tiles.push(1);
        } else {
          this.map.tiles.push(0);
        }
      }
    }

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

      const footX = nextX + tileSize / 2;
      const footY = nextY + tileSize - 4;

      const px = Math.floor(footX / tileSize);
      const py = Math.floor(footY / tileSize);

      const tile = this.map.tiles[py * this.map.width + px];

      // Block walls (1) and obstacles (3)
      if(tile !== 1 && tile !== 3){
        this.player.x = nextX;
        this.player.y = nextY;
      }
    }

    this.player.update(this.input);

    const footX = this.player.x + tileSize / 2;
    const footY = this.player.y + tileSize - 4;
    const px = Math.floor(footX / tileSize);
    const py = Math.floor(footY / tileSize);

    const tile = this.map.tiles[py * this.map.width + px];
    if (tile === 2) {
      this.roomIndex++;
      this.player.x = 64;
      this.player.y = 64;
      this.generateRoom();
    }
  }

  attack() {
    if (this.player.attack) {
      this.player.attack();
    }
  }
}
