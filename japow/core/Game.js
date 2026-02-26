import Player from '../entities/Player.js';
import { ROOMS } from '../world/rooms.js';

export class Game {
  constructor() {
    this.player = new Player();
    this.input = { up:false, down:false, left:false, right:false };
    this.inventory = { key: false, passport: false };
    this.currentRoom = "salon";
    this.transitionCooldown = 0;
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

    this.currentRoom = roomName;
  }

  placePlayerAtDoor(exit, fromRoomName) {
    const tileSize = this.map.tileSize;
    const targetRoom = ROOMS[this.currentRoom];

    const returnExit = targetRoom.exits.find(e => e.target === fromRoomName);
    if (!returnExit) return;

    let spawnX = returnExit.x;
    let spawnY = returnExit.y;

    if (returnExit.y === 0) spawnY += 1;
    else if (returnExit.y === this.map.height - 1) spawnY -= 1;
    else if (returnExit.x === 0) spawnX += 1;
    else if (returnExit.x === this.map.width - 1) spawnX -= 1;

    // Perfect center alignment inside tile
    this.player.x = spawnX * tileSize + tileSize / 2 - this.player.width / 2;
    this.player.y = spawnY * tileSize + tileSize / 2 - this.player.height / 2;
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
    const tileSize = this.map.tileSize;

    if (this.transitionCooldown > 0) {
      this.transitionCooldown -= dt;
    }

    this.player.update(this.input, this.map, dt);

    if (this.transitionCooldown > 0) return;

    const centerX = Math.floor((this.player.x + tileSize/2) / tileSize);
    const centerY = Math.floor((this.player.y + tileSize/2) / tileSize);

    const room = ROOMS[this.currentRoom];

    for (const exit of room.exits) {

      const isNearDoor = (
        (centerX === exit.x && centerY === exit.y) ||
        (centerX === exit.x && centerY === exit.y + 1) ||
        (centerX === exit.x && centerY === exit.y - 1) ||
        (centerX === exit.x + 1 && centerY === exit.y) ||
        (centerX === exit.x - 1 && centerY === exit.y)
      );

      if (!isNearDoor) continue;

      const movingTowardDoor =
        (exit.y === 0 && this.input.up) ||
        (exit.y === this.map.height - 1 && this.input.down) ||
        (exit.x === 0 && this.input.left) ||
        (exit.x === this.map.width - 1 && this.input.right);

      if (!movingTowardDoor) continue;

      if (exit.target === "outside" && !this.inventory.key) {
        console.log("🚪 La porte est verrouillée.");
        return;
      }

      const previousRoom = this.currentRoom;
      this.loadRoom(exit.target);
      this.placePlayerAtDoor(exit, previousRoom);
      this.transitionCooldown = 200;
      return;
    }
  }

  attack() {
    this.interact();
    if (this.player.attack) {
      this.player.attack();
    }
  }
}
