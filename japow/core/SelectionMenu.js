export default class SelectionMenu {
  constructor() {
    this.index = 0;
    this.characters = [
      {
        name: "Pierre",
        selectable: true,
        sprite: this.load("assets/sprites/Pierre/Pierre_Select.png")
      },
      {
        name: "???",
        selectable: false,
        sprite: null
      }
    ];
  }

  load(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  move(dir) {
    if (dir === "left") this.index = 0;
    if (dir === "right") this.index = 1;
  }

  validate() {
    return this.characters[this.index].selectable;
  }

  render(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 420, 420);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Select Your Character", 100, 50);

    this.characters.forEach((char, i) => {
      const x = 120 + i * 150;
      const y = 150;

      if (i === this.index) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 10, y - 10, 100, 120);
      }

      if (char.sprite && char.sprite.complete) {
        ctx.drawImage(char.sprite, x, y, 80, 100);
      } else {
        ctx.fillStyle = "gray";
        ctx.fillRect(x, y, 80, 100);
        ctx.fillStyle = "black";
        ctx.fillText("?", x + 30, y + 60);
      }

      ctx.fillStyle = "white";
      ctx.fillText(char.name, x, y + 130);
    });
  }
}
