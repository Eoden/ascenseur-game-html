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

    // UP
    this.walkUp = [];
    const up1 = new Image();
    up1.src = 'assets/sprites/Pierre/Pierre_Walk_Up_1.png';
    const up2 = new Image();
    up2.src = 'assets/sprites/Pierre/Pierre_Walk_Up_2.png';
    this.walkUp.push(up1, up2);

    // DOWN
    this.walkDown = [];
    const down1 = new Image();
    down1.src = 'assets/sprites/Pierre/Pierre_Walk_Down_1.png';
    const down2 = new Image();
    down2.src = 'assets/sprites/Pierre/Pierre_Walk_Down_2.png';
    this.walkDown.push(down1, down2);
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
        const frames = this.getFramesForDirection();
        this.frame = (this.frame + 1) % frames.length;
      }
    } else {
      this.frame = 1;
      this.frameTick = 0;
    }
  }

  getFramesForDirection() {
    if (this.dir === 'left') return this.walkLeft;
    if (this.dir === 'up') return this.walkUp;
    if (this.dir === 'down') return this.walkDown;
    return this.walkRight;
  }

  getCurrentSprite() {
    const frames = this.getFramesForDirection();
    return frames[this.frame];
  }
}
