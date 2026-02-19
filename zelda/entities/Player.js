export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.state = 'idle';
    this.dir = 'right';

    this.frame = 1;
    this.frameTick = 0;
    this.frameDelay = 4;

    // RIGHT
    this.walkRight = [];
    const right1 = new Image();
    right1.src = 'assets/sprites/Pierre/Pierre_Walk_Right_1.png';
    const right2 = new Image();
    right2.src = 'assets/sprites/Pierre/Pierre_Walk_Right_2.png';
    this.walkRight.push(right1, right2);

    // LEFT
    this.walkLeft = [];
    const left1 = new Image();
    left1.src = 'assets/sprites/Pierre/Pierre_Walk_Left_1.png';
    const left2 = new Image();
    left2.src = 'assets/sprites/Pierre/Pierre_Walk_Left_2.png';
    this.walkLeft.push(left1, left2);
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
      moving = true;
    }
    if (input.down) {
      this.y += this.speed;
      moving = true;
    }

    if (moving) {
      this.frameTick++;
      if (this.frameTick >= this.frameDelay) {
        this.frameTick = 0;
        const frames = this.dir === 'left' ? this.walkLeft : this.walkRight;
        this.frame = (this.frame + 1) % frames.length;
      }
    } else {
      this.frame = 1;
      this.frameTick = 0;
    }
  }

  getCurrentSprite() {
    const frames = this.dir === 'left' ? this.walkLeft : this.walkRight;
    return frames[this.frame];
  }
}
