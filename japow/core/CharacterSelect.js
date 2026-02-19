export default class CharacterSelect {
  constructor(input) {
    this.input = input;
    this.index = 0;
    this.characters = [
      { name: "Pierre", src: "assets/sprites/Pierre/Pierre_Selection.png", selectable: true },
      { name: "?", src: "assets/ui/question.png", selectable: false }
    ];

    this.image = new Image();
    this.image.src = this.characters[this.index].src;

    this.transition = 0;
  }

  update() {
    if (this.input.leftPressed) {
      this.index = (this.index - 1 + this.characters.length) % this.characters.length;
      this.switchCharacter();
    }

    if (this.input.rightPressed) {
      this.index = (this.index + 1) % this.characters.length;
      this.switchCharacter();
    }

    if (this.transition > 0) {
      this.transition -= 0.1;
      if (this.transition < 0) this.transition = 0;
    }
  }

  switchCharacter() {
    this.image = new Image();
    this.image.src = this.characters[this.index].src;
    this.transition = 1;
  }

  render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = this.image;
    if (!img.complete) return;

    const scale = 1 + this.transition * 0.1;
    const width = img.width * scale;
    const height = img.height * scale;

    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    ctx.drawImage(img, x, y, width, height);
  }
}