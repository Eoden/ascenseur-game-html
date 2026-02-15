export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.assets = {};
    this.loadPlayerSprite();
  }

  loadPlayerSprite() {
    const img = new Image();

    img.onload = () => {
      console.log("Player sprite HD loaded OK");
    };

    img.onerror = (e) => {
      console.error("Failed to load player sprite HD", e);
    };

    // Use HD sprite version
    img.src = "assets/sprites/hero_walk_right_sheet_hd.png";

    this.assets.player = img;
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
    const sprite = this.assets.player;

    if (!sprite || !sprite.complete || sprite.naturalWidth === 0) return;

    const spriteWidth = 64;
    const spriteHeight = 80;

    // Player position represents feet position
    const drawX = Math.floor(player.x - spriteWidth / 2);
    const drawY = Math.floor(player.y - spriteHeight + 64);

    this.ctx.imageSmoothingEnabled = false;

    this.ctx.drawImage(
      sprite,
      0,
      0,
      spriteWidth,
      spriteHeight,
      drawX,
      drawY,
      spriteWidth,
      spriteHeight
    );
  }

  render(game) {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawMap(game.map);
    this.drawPlayer(game.player);
  }
}
