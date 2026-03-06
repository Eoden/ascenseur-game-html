import Player from '../entities/Player.js';
import { ROOMS } from '../world/rooms.js';
import { TILEMAP } from '../world/tilemap.js';

export class Game {
  constructor() {
    this.player = new Player();
    this.input = { up:false, down:false, left:false, right:false };
    this.inventory = { key: false, passport: false };
    this.currentRoom = "salon";
    this.transitionCooldown = 0;
    this.dialog = null;
    this.canInteract = false;
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
        const symbol = room.layout[y][x];

        if (TILEMAP[symbol] !== undefined) {
          this.map.tiles.push(TILEMAP[symbol]);
        } else {
          this.map.tiles.push(parseInt(symbol));
        }
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

    if (returnExit.dir === "left") spawnX += 1;
    else if (returnExit.dir === "right") spawnX -= 1;
    else if (returnExit.dir === "up") spawnY += 1;
    else if (returnExit.dir === "down") spawnY -= 1;

    if (this.currentRoom === "salon" && fromRoomName === "chambre3") {
      spawnY += 1;
    }

    let px = spawnX * tileSize + tileSize / 2 - this.player.width / 2;
    let py = spawnY * tileSize + tileSize / 2 - this.player.height / 2;

    const visualOffsetX = (48 - tileSize) / 2;
    px -= visualOffsetX;

    this.player.x = px;
    this.player.y = py;
  }

  getPlayerTile(){
    const tileSize = this.map.tileSize;
    const px = Math.floor((this.player.x + tileSize/2) / tileSize);
    const py = Math.floor((this.player.y + tileSize/2) / tileSize);
    return { px, py };
  }

  getFacingTile() {
    const tileSize = this.map.tileSize;

    const px = Math.floor((this.player.x + tileSize/2) / tileSize);
    const py = Math.floor((this.player.y + tileSize/2) / tileSize);

    let tx = px;
    let ty = py;

    if (this.player.dir === "up") ty -= 1;
    if (this.player.dir === "down") ty += 1;
    if (this.player.dir === "left") tx -= 1;
    if (this.player.dir === "right") tx += 1;

    return { tx, ty };
  }

  findInteractive(tx, ty) {
    const room = ROOMS[this.currentRoom];
    if (!room.interactives) return null;

    return room.interactives.find(obj => {
      const dx = Math.abs(obj.x - tx);
      const dy = Math.abs(obj.y - ty);
      return dx <= 1 && dy <= 1;
    });
  }

  findNearbyInteractive(px, py){
    const room = ROOMS[this.currentRoom];
    if (!room.interactives) return null;

    return room.interactives.find(obj => {
      const dx = Math.abs(obj.x - px);
      const dy = Math.abs(obj.y - py);
      return dx <= 1 && dy <= 1;
    });
  }

  interact() {
    const { tx, ty } = this.getFacingTile();

    const interactive = this.findInteractive(tx, ty);
    if (!interactive) return;

    if (interactive.contains === "passport") {
      if (!this.inventory.passport) {
        this.inventory.passport = true;
        this.dialog = "Passeport trouvé. Direction le Japon !";
      } else {
        this.dialog = "On a déjà le passeport.";
      }
      return;
    }

    if (interactive.contains === "key") {
      if (!this.inventory.key) {
        this.inventory.key = true;
        this.dialog = "On a trouvé les clés de l'appartement.";
      } else {
        this.dialog = "On a déjà les clés de l'appartement.";
      }
      return;
    }

    this.dialog = "Rien à part des chaussettes sales.";
  }

  tick(dt) {
    const tileSize = this.map.tileSize;

    if (this.transitionCooldown > 0) {
      this.transitionCooldown -= dt;
    }

    if (!this.dialog) {
      this.player.update(this.input, this.map, dt);
    }

    const { px, py } = this.getPlayerTile();

    // A button appears if player is near an interactive object (even behind)
    this.canInteract = !!this.findNearbyInteractive(px, py);

    if (this.dialog) return;

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

      let movingTowardDoor = false;

      if (exit.dir === "up") movingTowardDoor = this.input.up;
      else if (exit.dir === "down") movingTowardDoor = this.input.down;
      else if (exit.dir === "left") movingTowardDoor = this.input.left;
      else if (exit.dir === "right") movingTowardDoor = this.input.right;

      if (!movingTowardDoor) continue;

      if (exit.target === "outside" && !this.inventory.key) {
        this.dialog = "La porte est verrouillée.";
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
    if (this.dialog) {
      this.dialog = null;
      return;
    }

    this.interact();

    if (this.player.attack) {
      this.player.attack();
    }
  }
}
