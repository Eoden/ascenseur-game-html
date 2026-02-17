export default class Renderer {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
  }

  render() {
    const { ctx, game } = this;
    if (!game || !game.map) return;

    const { tileSize, width, height, tiles } = game.map;

    ctx.clearRect(0, 0, width * tileSize, height * tileSize);

    // Draw map
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];

        if (tile === 1) {
          ctx.fillStyle = "#222";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }

        if (tile === 2) {
          ctx.fillStyle = "#0f0";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    // Draw player
    const player = game.player;
    if (!player) return;

    if (player.sprite && player.sprite.complete) {
      ctx.drawImage(
        player.sprite,
        player.x,
        player.y,
        tileSize,
        tileSize
      );
    } else {
      ctx.fillStyle = "red";
      ctx.fillRect(player.x, player.y, tileSize, tileSize);
    }
  }
}
