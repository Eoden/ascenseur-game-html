export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.assets = {};
    this.loadHeroAssets();
  }

  loadHeroAssets() {
    const states = ["idle", "walk", "attack"];
    const dirs = ["down", "up", "left", "right"];

    for (const state of states) {
      for (const dir of dirs) {
        const key = `${state}_${dir}`;
        const img = new Image();
        img.src = `./assets/sprites/hero/${key}.svg`;
        this.assets[key] = img;
      }
    }
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

  drawPlayer(player) {
    const key = `${player.state}_${player.dir}`;
    const img = this.assets[key];
    if (!img || !img.complete) return;
    this.ctx.drawImage(img, player.x, player.y, 32, 32);
  }

  render(game) {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawMap(game.map);
    this.drawPlayer(game.player);
  }
}
