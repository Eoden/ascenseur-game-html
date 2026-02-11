export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;

    this.assets = {
      idle: new Image(),
      walk: new Image(),
      attack: new Image()
    };

    this.assets.idle.src = './assets/sprites/hero_idle.svg';
    this.assets.walk.src = './assets/sprites/hero_walk.svg';
    this.assets.attack.src = './assets/sprites/hero_attack.svg';
  }

  drawMap(map) {
    const { tileSize, width, height, tiles } = map;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];

        if (tile === 1) this.ctx.fillStyle = '#555';
        else if (tile === 2) this.ctx.fillStyle = '#0a0';
        else this.ctx.fillStyle = '#222';

        this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  drawPlayer(player) {
    const img = this.assets[player.state];
    if (!img.complete) return;

    const frameSize = 32;
    const sx = player.frame * frameSize;

    this.ctx.drawImage(
      img,
      sx,
      0,
      frameSize,
      frameSize,
      player.x,
      player.y,
      frameSize,
      frameSize
    );
  }

  render(game) {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawMap(game.map);
    this.drawPlayer(game.player);
  }
}
