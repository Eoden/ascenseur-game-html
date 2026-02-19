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
    if (dir === "left") {
      this.index = (this.index - 1 + this.characters.length) % this.characters.length;
    }
    if (dir === "right") {
      this.index = (this.index + 1) % this.characters.length;
    }
  }

  validate() {
    return this.characters[this.index].selectable;
  }

  render(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 420, 420);

    const current = this.characters[this.index];

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Select Your Character", 210, 50);

    const centerX = 210;
    const centerY = 220;

    if (current.sprite && current.sprite.complete) {
      const img = current.sprite;

      // Use native resolution but clamp to canvas width
      const maxWidth = 360;
      const scale = Math.min(1, maxWidth / img.width);

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      ctx.drawImage(
        img,
        centerX - drawWidth / 2,
        centerY - drawHeight / 2,
        drawWidth,
        drawHeight
      );
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(centerX - 120, centerY - 120, 240, 240);

      ctx.fillStyle = "black";
      ctx.font = "80px Arial";
      ctx.fillText("?", centerX, centerY + 30);
    }

    ctx.fillStyle = current.selectable ? "white" : "red";
    ctx.font = "22px Arial";
    ctx.fillText(current.name, 210, 390);

    ctx.textAlign = "start";
  }
}
