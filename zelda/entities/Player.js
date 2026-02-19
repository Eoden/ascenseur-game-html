export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.state = 'idle';
    this.dir = 'right';

    this.frame = 0;
    this.frameTick = 0;
    this.frameDelay = 10;

    this.images = [];

    const img1 = new Image();
    img1.src = 'assets/sprites/Pierre/Pierre_Walk_Right_1.png';

    const img2 = new Image();
    img2.src = 'assets/sprites/Pierre/Pierre_Walk_Right_2.png';

    this.images.push(img1, img2);
  }

  update(input) {
    let moving = false;

    if (input.right) {
      this.x += this.speed;
      this.dir = 'right';
      moving = true;
    }
    if (input.left) {
      this.x -= this.speed;
      this.dir = 'left';
      moving = true;
    }
    if (input.up) {
      this.y -= this.speed;
      this.dir = 'up';
      moving = true;
    }
    if (input.down) {
      this.y += this.speed;
      this.dir = 'down';
      moving = true;
    }

    if (moving) {
      this.frameTick++;
      if (this.frameTick >= this.frameDelay) {
        this.frameTick = 0;
        this.frame = (this.frame + 1) % this.images.length;
      }
    } else {
      this.frame = 0;
    }
  }
}
