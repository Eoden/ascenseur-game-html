export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.size = 32;

    this.image = new Image();
    this.image.src = "assets/sprites/hero_walk_right_sheet.png";
  }

  update(input) {
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;
    if (input.up) this.y -= this.speed;
    if (input.down) this.y += this.speed;
  }

  attack() {
    // placeholder
  }
}
