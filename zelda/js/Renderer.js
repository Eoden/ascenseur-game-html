// UPDATED FOR 96x96 HERO RENDER (feet anchored)
export default class Renderer {
  constructor(ctx, assets) {
    this.ctx = ctx;
    this.assets = assets;
  }

  drawPlayer(player) {
    const key = `${player.state}_${player.direction}`;
    const img = this.assets.hero[key];
    if (!img) return;

    // 96x96 sprite, feet anchored at player.x / player.y
    this.ctx.drawImage(
      img,
      player.x - 48,
      player.y - 88,
      96,
      96
    );
  }

  render(player, map) {
    map.draw(this.ctx);
    this.drawPlayer(player);
  }
}
