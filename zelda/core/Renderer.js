export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;

    this.assets = {
      idle: new Image(),
      walk: new Image(),
      attack: new Image()
    };

    this.assets.idle.src = './assets/sprites/hero_idle.svg';
    this.assets.walk.src = './assets/sprites/hero_walk.svg';
    this.assets.attack.src = './assets/sprites/hero_attack.svg';
  }

  drawPlayer(player) {
    const img = this.assets[player.state];

    if (!img.complete) return;

    const frameSize = 32;
    const sx = player.frame * frameSize;
    const sy = 0;

    this.ctx.drawImage(
      img,
      sx,
      sy,
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
    this.drawPlayer(game.player);
  }
}
