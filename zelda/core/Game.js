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

  tick(dt) {
    const p = this.player;
    if (p.attackCooldown > 0) {
      p.attackCooldown -= dt;
      if (p.attackCooldown <= 0) {
        p.state = 'idle';
      }
    }
  }

  move(dx, dy) {
    if (this.victory) return;
    const p = this.player;
    if (p.attackCooldown > 0) return;

    const nx = p.x + dx;
    const ny = p.y + dy;
    if (nx < 0 || ny < 0 || nx >= 10 || ny >= 10) return;

    p.x = nx;
    p.y = ny;
    p.state = 'walk';
    if (dx === 1) p.dir = 'right';
    if (dx === -1) p.dir = 'left';
    if (dy === 1) p.dir = 'down';
    if (dy === -1) p.dir = 'up';

    if (this.room.switch && nx === this.room.switch.x && ny === this.room.switch.y) {
      this.room.switch.active = true;
      this.room.exitTop = true;
    }

    if (this.room.item && !this.room.item.collected && nx === this.room.item.x && ny === this.room.item.y) {
      this.room.item.collected = true;
      this.inventory[this.room.item.type] = true;
      this.victory = true;
    }

    if (this.room.exitTop && ny === 0) {
      this.roomIndex = Math.min(this.roomIndex + 1, rooms.length - 1);
      p.x = 5;
      p.y = 8;
      p.state = 'idle';
    }
  }

  attack() {
    if (this.victory) return;
    const p = this.player;
    if (p.attackCooldown > 0) return;

    p.state = 'attack';
    p.attackCooldown = 250;

    const e = this.room.enemy;
    if (!e || !e.alive) return;
    const dist = Math.abs(e.x - p.x) + Math.abs(e.y - p.y);
    if (dist === 1) {
      e.hp -= 1;
      if (e.hp <= 0) e.alive = false;
    }
  }

  getElapsedTime() {
    return Math.floor((performance.now() - this.startTime) / 1000);
  }
}
