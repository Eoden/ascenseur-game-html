export default class Renderer {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 420, 420);
  }

  render(game) {
    const { ctx } = this;
    const { map, player } = game;

    const size = map.tileSize;

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tiles[y * map.width + x];

        if (tile === 1) {
          ctx.fillStyle = '#333';
          ctx.fillRect(x * size, y * size, size, size);
        }

        if (tile === 2) {
          ctx.fillStyle = 'gold';
          ctx.fillRect(x * size, y * size, size, size);
        }
      }
    }

    const sprite = player.getCurrentSprite();

    if (sprite && sprite.complete) {
      const visualWidth = 48;
      const visualHeight = 62;

      ctx.drawImage(
        sprite,
        player.x + (size - visualWidth) / 2,
        player.y + size - visualHeight,
        visualWidth,
        visualHeight
      );
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(player.x, player.y, size, size);
    }
  }
}
