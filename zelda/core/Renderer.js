import { TILE, CANVAS_SIZE } from '../constants.js';

const sprites = {};
function loadSprite(key, src) {
  const img = new Image();
  img.src = src;
  sprites[key] = img;
}

loadSprite('player', './assets/sprites/player.png');
loadSprite('enemy', './assets/sprites/enemy_slime.png');

function drawEntity(ctx, e, key) {
  const img = sprites[key];
  const bob = e.state === 'walk' ? Math.sin(e.frame * 0.5) * 2 : 0;
  if (img && img.complete) {
    ctx.drawImage(img, e.x * TILE, e.y * TILE + bob, TILE, TILE);
  } else {
    ctx.fillStyle = key === 'player' ? '#4caf50' : '#b33';
    ctx.fillRect(e.x * TILE + 8, e.y * TILE + 10 + bob, 24, 20);
  }
}

export function draw(ctx, game) {
  const room = game.room;
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = room.theme === 'combat' ? '#5b2c2c' : room.theme === 'puzzle' ? '#2c4b5b' : '#3b6b3b';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = '#222';
  room.walls.forEach(w => ctx.fillRect(w.x * TILE, w.y * TILE, w.w * TILE, w.h * TILE));

  if (room.exitTop) {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(4 * TILE, 0, 2 * TILE, TILE);
  }

  if (room.switch) {
    ctx.fillStyle = room.switch.active ? '#ff0' : '#888';
    ctx.fillRect(room.switch.x * TILE + 10, room.switch.y * TILE + 10, 20, 20);
  }

  if (room.item && !room.item.collected) {
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(room.item.x * TILE + 10, room.item.y * TILE + 10, 20, 20);
  }

  if (room.enemy && room.enemy.alive) {
    drawEntity(ctx, room.enemy, 'enemy');
  }

  drawEntity(ctx, game.player, 'player');

  if (game.player.state === 'attack') {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    const p = game.player;
    const cx = p.x * TILE + TILE / 2;
    const cy = p.y * TILE + TILE / 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, -0.5, 0.5);
    ctx.stroke();
  }

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
