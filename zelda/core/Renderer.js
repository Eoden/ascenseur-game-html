export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(game) {
    if (!game || !game.map) return;

    const { ctx } = this;
    const { tileSize, width, height, tiles } = game.map;

    // draw map
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];

        if (tile === 1) {
          ctx.fillStyle = '#222'; // wall
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }

        if (tile === 2) {
          ctx.fillStyle = '#0f0'; // exit
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    // draw player
    const p = game.player;
    if (!p) return;

    if (p.image && p.image.complete) {
      ctx.drawImage(
        p.image,
        p.x,
        p.y,
        tileSize,
        tileSize
      );
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(p.x, p.y, tileSize, tileSize);
    }
  }
}
