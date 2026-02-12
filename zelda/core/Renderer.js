export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.assets = {};
    this.loadSpriteSheet();
  }

  loadSpriteSheet() {
    const img = new Image();
    img.src = "./assets/sprites/space_marine_sheet.png";
    this.assets.sheet = img;
  }

  drawMap(map) {
    const { tileSize, width, height, tiles } = map;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = tiles[y * width + x];
        if (tile === 1) this.ctx.fillStyle = "#555";
        else if (tile === 2) this.ctx.fillStyle = "#0a0";
        else this.ctx.fillStyle = "#222";
        this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  getRow(player) {
    const dirIndex = { down: 0, up: 1, left: 2, right: 3 };
    const base = dirIndex[player.dir] || 0;

    if (player.state === "walk") return base + 4;
    return base; // idle rows 0-3, walk rows 4-7
  }

  drawPlayer(player) {
    const sheet = this.assets.sheet;
    if (!sheet || !sheet.complete) return;

    const frameSize = 32;
    const row = this.getRow(player);
    const col = player.frame;

    this.ctx.drawImage(
      sheet,
      col * frameSize,
      row * frameSize,
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
