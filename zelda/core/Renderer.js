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

    // draw player with 64x82 sprite but 64x64 hitbox
    const p = game.player;
    if (!p) return;

    const currentImage = p.getCurrentSprite ? p.getCurrentSprite() : null;

    if (currentImage && currentImage.complete) {
      const spriteWidth = 64;
      const spriteHeight = 82;
      const offsetY = spriteHeight - tileSize; // align feet with hitbox

      ctx.drawImage(
        currentImage,
        p.x,
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
