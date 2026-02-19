export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.size = 32;

    this.frame = 0;
    this.frameTick = 0;
    this.frameDelay = 10;

    this.images = [];

    const img1 = new Image();
    img1.src = "assets/sprites/IMG_8354.png";

    const img2 = new Image();
    img2.src = "assets/sprites/IMG_8355.png";

    this.images.push(img1);
    this.images.push(img2);
  }

  update(input) {
    let moving = false;

    if (input.left) { this.x -= this.speed; moving = true; }
    if (input.right) { this.x += this.speed; moving = true; }
    if (input.up) { this.y -= this.speed; moving = true; }
    if (input.down) { this.y += this.speed; moving = true; }

    if (moving) {
      this.frameTick++;
      if (this.frameTick >= this.frameDelay) {
        this.frame = (this.frame + 1) % this.images.length;
        this.frameTick = 0;
      }
    } else {
      this.frame = 0;
    }
  }
}
