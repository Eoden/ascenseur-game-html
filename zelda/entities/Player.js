export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.size = 32;

    this.image1 = new Image();
    this.image1.src = "assets/sprites/hero_walk_right_sheet.png";

    this.image2 = new Image();
    this.image2.src = "./assets/sprites/hero_walk_right_sheet.png";

    this.image3 = new Image();
    this.image3.src = "zelda/assets/sprites/hero_walk_right_sheet.png";
  }

  update(input) {
    if (input.left) this.x -= this.speed;
    if (input.right) this.x += this.speed;
    if (input.up) this.y -= this.speed;
    if (input.down) this.y += this.speed;
  }

  render(ctx) {
    let drawn = false;

    if (this.image1.complete && this.image1.naturalWidth > 0) {
      ctx.drawImage(this.image1, this.x, this.y, this.size, this.size);
      drawn = true;
    }

    if (this.image2.complete && this.image2.naturalWidth > 0) {
      ctx.drawImage(this.image2, this.x + 40, this.y, this.size, this.size);
      drawn = true;
    }

    if (this.image3.complete && this.image3.naturalWidth > 0) {
      ctx.drawImage(this.image3, this.x + 80, this.y, this.size, this.size);
      drawn = true;
    }

    if (!drawn) {
      ctx.fillStyle = "red";
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }
}
