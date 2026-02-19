export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.player = null;
    this.input = { up: false, down: false, left: false, right: false };
    this.roomIndex = 0;
    this.map = {
      tileSize: 32,
      width: 13,
      height: 13,
      tiles: []
    };
  }

  setPlayer(player) {
    this.player = player;
  }

  update() {
    if (!this.player) return;
    this.player.update(this.input, this.map);
  }
}