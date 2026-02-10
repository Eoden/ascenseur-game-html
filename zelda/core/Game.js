import { rooms } from '../world/rooms.js'; import { Player } from '../entities/Player.js';
export class Game{ constructor(){ this.player=new Player(); this.roomIndex=0; }
  get room(){ return rooms[this.roomIndex]; }
  move(dx,dy){ const nx=this.player.x+dx, ny=this.player.y+dy; if(nx<0||ny<0||nx>=10||ny>=10)return; this.player.x=nx; this.player.y=ny; if(this.room.exit && nx===this.room.exit.x && ny===0){ this.roomIndex=Math.min(this.roomIndex+1,rooms.length-1); this.player.x=5; this.player.y=9; } }
  attack(){ const e=this.room.enemy; if(e && e.alive && Math.abs(e.x-this.player.x)+Math.abs(e.y-this.player.y)===1){ e.alive=false; } }
}