import { TILE, CANVAS_SIZE } from '../constants.js';

export function draw(ctx, game) {
  const room = game.room;
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // background
  ctx.fillStyle = room.theme === 'combat' ? '#5b2c2c' : room.theme === 'puzzle' ? '#2c4b5b' : '#3b6b3b';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // walls
  ctx.fillStyle = '#222';
  room.walls.forEach(w => ctx.fillRect(w.x * TILE, w.y * TILE, w.w * TILE, w.h * TILE));

  // exit
  if (room.exitTop) {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(4 * TILE, 0, 2 * TILE, TILE);
  }

  // switch
  if (room.switch) {
    ctx.fillStyle = room.switch.active ? '#ff0' : '#888';
    ctx.fillRect(room.switch.x * TILE + 10, room.switch.y * TILE + 10, 20, 20);
  }

  // item
  if (room.item && !room.item.collected) {
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(room.item.x * TILE + 10, room.item.y * TILE + 10, 20, 20);
  }

  // enemy
  if (room.enemy && room.enemy.alive) {
    ctx.fillStyle = '#b33';
    ctx.fillRect(room.enemy.x * TILE + 6, room.enemy.y * TILE + 10, 28, 20);
  }

  // player
  ctx.fillStyle = '#4caf50';
  ctx.fillRect(game.player.x * TILE + 8, game.player.y * TILE + 12, 24, 20);

  // HUD
  ctx.fillStyle = '#fff';
  ctx.font = '14px monospace';
  ctx.fillText(`Time: ${game.getElapsedTime()}s`, 10, 20);

  if (game.victory) {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = '#fff';
    ctx.font = '24px monospace';
    ctx.fillText('VICTORY!', 140, 200);
    ctx.font = '16px monospace';
    ctx.fillText(`Time: ${game.getElapsedTime()}s`, 150, 230);
  }
}