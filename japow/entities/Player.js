export default class Player {
  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 1.5;

    this.width = 32;
    this.height = 32;

    this.state = "idle";
    this.dir = "down";

    this.frame = 0;
    this.frameTick = 0;
    this.frameDelay = 10;

    this.sprites = {
      right: [
        this.load("assets/sprites/Pierre/Pierre_Walk_Right_1.png"),
        this.load("assets/sprites/Pierre/Pierre_Walk_Right_2.png")
      ],
      left: [
        this.load("assets/sprites/Pierre/Pierre_Walk_Left_1.png"),
        this.load("assets/sprites/Pierre/Pierre_Walk_Left_2.png")
      ],
      up: [
        this.load("assets/sprites/Pierre/Pierre_Walk_Up_1.png"),
        this.load("assets/sprites/Pierre/Pierre_Walk_Up_2.png")
      ],
      down: [
        this.load("assets/sprites/Pierre/Pierre_Walk_Down_1.png"),
        this.load("assets/sprites/Pierre/Pierre_Walk_Down_2.png")
      ]
    };
  }

  load(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  update(input, map, dt) {
    const speedMultiplier = dt / 16;
    const moveSpeed = this.speed * 2 * speedMultiplier;

    let nextX = this.x;
    let nextY = this.y;

    if (input.left) {
      nextX -= moveSpeed;
      this.dir = "left";
    }
    if (input.right) {
      nextX += moveSpeed;
      this.dir = "right";
    }
    if (input.up) {
      nextY -= moveSpeed;
      this.dir = "up";
    }
    if (input.down) {
      nextY += moveSpeed;
      this.dir = "down";
    }

    if (!this.isBlocked(nextX, this.y, map)) {
      this.x = nextX;
    }

    if (!this.isBlocked(this.x, nextY, map)) {
      this.y = nextY;
    }

    const moving = (
      input.left || input.right || input.up || input.down
    );

    this.state = moving ? "walk" : "idle";

    if (this.state === "walk") {
      this.frameTick++;
      if (this.frameTick >= this.frameDelay) {
        this.frameTick = 0;
        this.frame = (this.frame + 1) % 2;
      }
    } else {
      this.frame = 1;
    }
  }

  isBlocked(nextX, nextY, map) {
    const size = map.tileSize;
    const padding = 4;

    const points = [
      { x: nextX + padding, y: nextY + padding },
      { x: nextX + size - padding, y: nextY + padding },
      { x: nextX + padding, y: nextY + size - padding },
      { x: nextX + size - padding, y: nextY + size - padding }
    ];

    return points.some(p => {
      const tileX = Math.floor(p.x / size);
      const tileY = Math.floor(p.y / size);

      if (
        tileX < 0 ||
        tileY < 0 ||
        tileX >= map.width ||
        tileY >= map.height
      ) {
        return true;
      }

      const tile = map.tiles[tileY * map.width + tileX];

      // 0 = floor, 2 = door (walkable)
      // 1 = wall, 3..9 = furniture (blocked)
      return tile === 1 || (tile >= 3 && tile <= 9);
    });
  }

  getCurrentSprite() {
    return this.sprites[this.dir][this.frame];
  }
}
