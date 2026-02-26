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
    const tileSize = this.map.tileSize;

    this.player.update(this.input, this.map, dt);

    const centerX = Math.floor((this.player.x + tileSize/2) / tileSize);
    const centerY = Math.floor((this.player.y + tileSize/2) / tileSize);

    const room = ROOMS[this.currentRoom];

    const triggerExit = (exit) => {
      if (exit.target === "outside" && !this.inventory.key) {
        console.log("🚪 La porte est verrouillée.");
        return true;
      }

      this.loadRoom(exit.target);
      this.player.x = exit.targetSpawn.x;
      this.player.y = exit.targetSpawn.y;
      return true;
    };

    for (const exit of room.exits) {

      // Exact tile match
      if (centerX === exit.x && centerY === exit.y) {
        if (triggerExit(exit)) return;
      }

      // If player is just below a top door
      if (centerX === exit.x && centerY === exit.y + 1) {
        if (triggerExit(exit)) return;
      }

      // If player is just above a bottom door
      if (centerX === exit.x && centerY === exit.y - 1) {
        if (triggerExit(exit)) return;
      }

      // If player is just right of a left door
      if (centerX === exit.x + 1 && centerY === exit.y) {
        if (triggerExit(exit)) return;
      }

      // If player is just left of a right door
      if (centerX === exit.x - 1 && centerY === exit.y) {
        if (triggerExit(exit)) return;
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
