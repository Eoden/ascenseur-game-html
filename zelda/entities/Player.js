export default class Player {
  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 3;

    this.frame = 0;
    this.frameTick = 0;
    this.frameDelay = 10;

    // Load walking cycle images
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

    if (input.left) {
      this.x -= this.speed;
      moving = true;
    }
    if (input.right) {
      this.x += this.speed;
      moving = true;
    }
    if (input.up) {
      this.y -= this.speed;
      moving = true;
    }
    if (input.down) {
      this.y += this.speed;
      moving = true;
    }

    if (moving) {
      this.frameTick++;
      if (this.frameTick >= this.frameDelay) {
        this.frame = (this.frame + 1) % this.images.length;
        this.frameTick = 0;
      }
    } else {
      this.frame = 0;
      this.frameTick = 0;
    }
  }
}
