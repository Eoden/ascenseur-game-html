const canvas=document.getElementById('game');const ctx=canvas.getContext('2d');const SIZE=420;const TILE=40;
const player={x:5,y:8,dir:'up'};let roomIndex=0;
const rooms=[
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:{x:4,y:0},enemy:null},
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:{x:4,y:0},enemy:{x:5,y:4,alive:true}},
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:null,enemy:{x:5,y:4,alive:true}}
];
function draw(){ctx.clearRect(0,0,SIZE,SIZE);const room=rooms[roomIndex];ctx.fillStyle='#3a5';room.walls.forEach(w=>ctx.fillRect(w.x*TILE,w.y*TILE,w.w*TILE,w.h*TILE));if(room.exit){ctx.fillStyle='#ccc';ctx.fillRect(room.exit.x*TILE,0,TILE,TILE);}if(room.enemy&&room.enemy.alive){ctx.fillStyle='#c33';ctx.fillRect(room.enemy.x*TILE,room.enemy.y*TILE,TILE,TILE);}ctx.fillStyle='#33c';ctx.fillRect(player.x*TILE,player.y*TILE,TILE,TILE);}
function canMove(nx,ny){const room=rooms[roomIndex];if(nx<0||ny<0||nx>=10||ny>=10)return false;for(const w of room.walls){if(nx>=w.x&&nx<w.x+w.w&&ny>=w.y&&ny<w.y+w.h)return false;}return true;}
function move(dx,dy){const nx=player.x+dx,ny=player.y+dy;if(canMove(nx,ny)){player.x=nx;player.y=ny;}const room=rooms[roomIndex];if(room.exit&&player.x===room.exit.x&&player.y===0){roomIndex=Math.min(roomIndex+1,rooms.length-1);player.x=5;player.y=9;}draw();}
function attack(){const room=rooms[roomIndex];if(room.enemy&&room.enemy.alive){const dx=Math.abs(room.enemy.x-player.x);const dy=Math.abs(room.enemy.y-player.y);if(dx+dy===1)room.enemy.alive=false;}draw();}
document.getElementById('up').ontouchstart=()=>move(0,-1);document.getElementById('down').ontouchstart=()=>move(0,1);document.getElementById('left').ontouchstart=()=>move(-1,0);document.getElementById('right').ontouchstart=()=>move(1,0);document.getElementById('btnA').ontouchstart=attack;draw();