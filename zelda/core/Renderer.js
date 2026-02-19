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
          ctx.fillStyle = '#222';
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }

        if (tile === 2) {
          ctx.fillStyle = '#0f0';
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    // draw player smaller (scaled) but aligned to feet
    const p = game.player;
    if (!p) return;

    const currentImage = p.getCurrentSprite ? p.getCurrentSprite() : null;

    if (currentImage && currentImage.complete) {
      const spriteWidth = 48;   // scaled down from 64
      const spriteHeight = 62;  // scaled proportionally from 82
      const offsetY = spriteHeight - tileSize;

      ctx.drawImage(
        currentImage,
        p.x + (tileSize - spriteWidth) / 2,
        p.y - offsetY,
        spriteWidth,
        spriteHeight
      );
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(p.x, p.y, tileSize, tileSize);
    }
  }
}
