import { TILE, CANVAS_SIZE } from '../constants.js';
export function draw(ctx, room, player){
  ctx.clearRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  ctx.fillStyle='#7ec850';ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  ctx.fillStyle='#3a5';room.walls.forEach(w=>ctx.fillRect(w.x*TILE,w.y*TILE,w.w*TILE,w.h*TILE));
  if(room.exit){ctx.fillStyle='#ccc';ctx.fillRect(room.exit.x*TILE,0,TILE,TILE);} 
  if(room.enemy && room.enemy.alive){ctx.fillStyle='#b33';ctx.fillRect(room.enemy.x*TILE+6,room.enemy.y*TILE+10,20,18);} 
  ctx.fillStyle='#3aa655';ctx.fillRect(player.x*TILE+8,player.y*TILE+12,24,20);
}