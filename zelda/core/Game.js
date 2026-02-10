import { rooms } from '../world/rooms.js';
import { Player } from '../entities/Player.js';

export class Game {
  constructor() {
    this.player = new Player();
    this.roomIndex = 0;
    this.inventory = {};
    this.startTime = performance.now();
    this.victory = false;
  }

  get room() {
    return rooms[this.roomIndex];
  }

  move(dx, dy) {
    if (this.victory) return;
    const nx = this.player.x + dx;
    const ny = this.player.y + dy;
    if (nx < 0 || ny < 0 || nx >= 10 || ny >= 10) return;

    this.player.x = nx;
    this.player.y = ny;

    // switch activation
    if (this.room.switch && nx === this.room.switch.x && ny === this.room.switch.y) {
      this.room.switch.active = true;
      this.room.exitTop = true;
    }

    // item pickup
    if (this.room.item && !this.room.item.collected && nx === this.room.item.x && ny === this.room.item.y) {
      this.room.item.collected = true;
      this.inventory[this.room.item.type] = true;
      this.victory = true;
    }

    // room transition
    if (this.room.exitTop && ny === 0) {
      this.roomIndex = Math.min(this.roomIndex + 1, rooms.length - 1);
      this.player.x = 5;
      this.player.y = 8;
    }
  }

  attack() {
    if (this.victory) return;
    const e = this.room.enemy;
    if (!e || !e.alive) return;
    const dist = Math.abs(e.x - this.player.x) + Math.abs(e.y - this.player.y);
    if (dist === 1) {
      e.hp -= 1;
      if (e.hp <= 0) e.alive = false;
    }
  }

  getElapsedTime() {
    return Math.floor((performance.now() - this.startTime) / 1000);
  }
}