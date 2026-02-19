export class Renderer {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.game = game;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    const { ctx, game } = this;

    if (!game.map || !game.map.tiles) return;

    const tileSize = game.map.tileSize;

    for (let y = 0; y < game.map.height; y++) {
      for (let x = 0; x < game.map.width; x++) {
        const tile = game.map.tiles[y * game.map.width + x];
        if (tile === 1) {
          ctx.fillStyle = "#444";
          ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    if (game.player) {
      game.player.render(ctx);
    }
  }
}