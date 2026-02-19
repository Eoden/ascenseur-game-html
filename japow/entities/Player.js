export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 32;
    this.speed = 2;
    this.color = "red";
  }

  update(input, map) {
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;
    if (input.up) this.y -= this.speed;
    if (input.down) this.y += this.speed;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}