export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.state = 'idle';
    this.dir = 'down';

    this.speed = 2;

    this.frame = 0;
    this.frameTimer = 0;
    this.frameDuration = 150; // ms per frame

    this.attackCooldown = 0;
  }

  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      this.frame = 0;
      this.frameTimer = 0;
    }
  }

  move(dx, dy) {
    if (this.state === 'attack') return;

    if (dx !== 0 || dy !== 0) {
      this.x += dx * this.speed;
      this.y += dy * this.speed;

      if (Math.abs(dx) > Math.abs(dy)) {
        this.dir = dx > 0 ? 'right' : 'left';
      } else if (dy !== 0) {
        this.dir = dy > 0 ? 'down' : 'up';
      }

      this.setState('walk');
    }
  }

  attack() {
    if (this.attackCooldown > 0) return;

    this.setState('attack');
    this.attackCooldown = 400;
  }

  update(dt) {
    if (this.attackCooldown > 0) {
      this.attackCooldown -= dt;
      if (this.attackCooldown <= 0) {
        this.setState('idle');
      }
    }

    if (this.state === 'walk' || this.state === 'idle' || this.state === 'attack') {
      this.frameTimer += dt;
      if (this.frameTimer >= this.frameDuration) {
        this.frameTimer = 0;
        this.frame = (this.frame + 1) % 4;
      }
    }
  }
}
