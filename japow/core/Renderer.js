export default class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Floor sprite for AppartPierre
    this.floorPierre = new Image();
    this.floorPierre.src = 'assets/sprites/levels/appart_pierre/floor.png';

    this.appartRooms = new Set([
      'salon',
      'couloir',
      'chambre1',
      'chambre2',
      'chambre3',
      'sdb'
    ]);
  }

  clear() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 420, 420);
  }

  render(game) {
    const { ctx } = this;
    const { map, player, enemies } = game;

    const size = map.tileSize;
    const currentRoom = game.currentRoom;

    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const tile = map.tiles[y * map.width + x];

        // Floor (tile 0) only for AppartPierre rooms
        if (tile === 0 && this.appartRooms.has(currentRoom)) {
          if (this.floorPierre.complete) {
            ctx.drawImage(this.floorPierre, x * size, y * size, size, size);
          }
          continue;
        }

        if (tile === 1) { ctx.fillStyle = '#333'; }
        else if (tile === 2) { ctx.fillStyle = 'gold'; }
        else if (tile === 3) { ctx.fillStyle = '#8d8d8d'; }
        else if (tile === 4) { ctx.fillStyle = '#1e88e5'; }
        else if (tile === 5) { ctx.fillStyle = '#8b5a2b'; }
        else if (tile === 6) { ctx.fillStyle = '#6a0dad'; }
        else if (tile === 7) { ctx.fillStyle = '#ff9800'; }
        else if (tile === 8) { ctx.fillStyle = '#1b5e20'; }
        else if (tile === 9) { ctx.fillStyle = '#d2b48c'; }
        else { continue; }

        ctx.fillRect(x * size, y * size, size, size);
      }
    }

    if (enemies) {
      for (const enemy of enemies) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, size, size);
      }
    }

    const sprite = player.getCurrentSprite();
    if (sprite && sprite.complete) {
      const visualWidth = 48;
      const visualHeight = 62;
      ctx.drawImage(
        sprite,
        player.x + (size - visualWidth) / 2,
        player.y + size - visualHeight,
        visualWidth,
        visualHeight
      );
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(player.x, player.y, size, size);
    }

    if (game.dialog) {
      const canvasW = this.canvas?.width ?? 420;
      const canvasH = this.canvas?.height ?? 420;
      const pad = 16;
      const boxH = 80;
      const x = pad;
      const y = canvasH - boxH - pad;
      const w = canvasW - pad * 2;
      const h = boxH;
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = 'white';
      ctx.font = '16px Arial';
      ctx.textBaseline = 'middle';
      ctx.fillText(game.dialog, x + 16, y + h / 2);
    }
  }
}
