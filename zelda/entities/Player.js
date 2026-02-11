export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.state = "idle";
    this.dir = "down";
    this.speed = 3;
    this.attackCooldown = 0;
  }

  move(dx, dy) {
    if (this.state === "attack") return;
    if (dx !== 0 || dy !== 0) {
      if (Math.abs(dx) > Math.abs(dy)) {
        this.dir = dx > 0 ? "right" : "left";
      } else {
        this.dir = dy > 0 ? "down" : "up";
      }
      this.state = "walk";
    } else {
      this.state = "idle";
    }
    this.x += dx;
    this.y += dy;
  }

  update(dt) {
    if (this.attackCooldown > 0) {
      this.attackCooldown -= dt;
      if (this.attackCooldown <= 0) {
        this.state = "idle";
      }
    }
  }

  attack() {
    if (this.attackCooldown > 0) return;
    this.state = "attack";
    this.attackCooldown = 400;
  }
}
