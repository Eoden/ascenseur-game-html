import Player from '../entities/Player.js';
import { ROOMS } from '../world/rooms.js';

export class Game {
  constructor() {
    this.player = new Player();
    this.input = { up:false, down:false, left:false, right:false };
    this.inventory = { key: false, passport: false };
    this.currentRoom = "salon";
    this.loadRoom(this.currentRoom);
  }

  loadRoom(roomName) {
    const room = ROOMS[roomName];
    this.map = {
      tileSize: 32,
      width: 13,
      height: 13,
      tiles: []
    };

    for (let y = 0; y < 13; y++) {
      for (let x = 0; x < 13; x++) {
        this.map.tiles.push(parseInt(room.layout[y][x]));
      }
    }

    this.player.x = room.spawn.x;
    this.player.y = room.spawn.y;
    this.currentRoom = roomName;
  }

  interact() {
    const tileSize = this.map.tileSize;
    const px = Math.floor((this.player.x + tileSize/2) / tileSize);
    const py = Math.floor((this.player.y + tileSize/2) / tileSize);

    let tx = px;
    let ty = py;

    if (this.player.dir === "up") ty -= 1;
    if (this.player.dir === "down") ty += 1;
    if (this.player.dir === "left") tx -= 1;
    if (this.player.dir === "right") tx += 1;

    const room = ROOMS[this.currentRoom];
    const interactive = room.interactives?.find(obj => obj.x === tx && obj.y === ty);

    if (interactive) {
      if (!interactive.opened) {
        interactive.opened = true;
        if (interactive.contains === "key") {
          this.inventory.key = true;
          console.log("🔑 Clé trouvée !");
        } else if (interactive.contains === "passport") {
          this.inventory.passport = true;
          console.log("🛂 Passeport trouvé !");
        } else {
          console.log("Rien d'intéressant...");
        }
      } else {
        console.log("Déjà fouillé.");
      }
    }
  }

  tick(dt) {
    const speedMultiplier = dt / 16;
    const tileSize = this.map.tileSize;

    let dx = 0;
    let dy = 0;

    if(this.input.up) dy -= 1;
    if(this.input.down) dy += 1;
    if(this.input.left) dx -= 1;
    if(this.input.right) dx += 1;

    if(dx !== 0 || dy !== 0){
      const nextX = this.player.x + dx * this.player.speed * speedMultiplier;
      const nextY = this.player.y + dy * this.player.speed * speedMultiplier;

      const footX = nextX + tileSize / 2;
      const footY = nextY + tileSize - 4;

      const px = Math.floor(footX / tileSize);
      const py = Math.floor(footY / tileSize);

      const tile = this.map.tiles[py * this.map.width + px];

      if(tile !== 1){
        this.player.x = nextX;
        this.player.y = nextY;
      }
    }

    this.player.update(this.input);

    const footX = this.player.x + tileSize / 2;
    const footY = this.player.y + tileSize - 4;
    const px = Math.floor(footX / tileSize);
    const py = Math.floor(footY / tileSize);

    const room = ROOMS[this.currentRoom];
    for (const exit of room.exits) {
      if (px === exit.x && py === exit.y) {
        this.loadRoom(exit.target);
        this.player.x = exit.targetSpawn.x;
        this.player.y = exit.targetSpawn.y;
        return;
      }
    }
  }

  attack() {
    this.interact();
    if (this.player.attack) {
      this.player.attack();
    }
  }
}
