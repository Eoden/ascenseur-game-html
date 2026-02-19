export default class Player {
  constructor() {
    this.x = 64;
    this.y = 64;
    this.speed = 1.5;

    this.width = 64;
    this.height = 64;

    this.state = "idle";
    this.dir = "down";

    this.frame = 0;
    this.frameTick = 0;
    this.frameDelay = 4;

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

  update(input, map) {
    let moving = false;

    if (input.left) {
      this.x -= this.speed;
      this.dir = "left";
      moving = true;
    }
    if (input.right) {
      this.x += this.speed;
      this.dir = "right";
      moving = true;
    }
    if (input.up) {
      this.y -= this.speed;
      this.dir = "up";
      moving = true;
    }
    if (input.down) {
      this.y += this.speed;
      this.dir = "down";
      moving = true;
    }

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

    const tileSize = map.tileSize;
    const tileX = Math.floor(this.x / tileSize);
    const tileY = Math.floor(this.y / tileSize);

    if (map.tiles[tileY * map.width + tileX] === 1) {
      if (input.left) this.x += this.speed;
      if (input.right) this.x -= this.speed;
      if (input.up) this.y += this.speed;
      if (input.down) this.y -= this.speed;
    }
  }

  getCurrentSprite() {
    return this.sprites[this.dir][this.frame];
  }
}
