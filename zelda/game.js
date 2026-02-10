const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
const SIZE=420;const TILE=40;
let frame=0;

function drawPlayerSprite(x,y,dir){ctx.save();ctx.translate(x*TILE+4,y*TILE+4);
  ctx.fillStyle='#3aa655';ctx.fillRect(4,8,24,20);
  ctx.fillStyle='#f2d6b3';ctx.fillRect(8,0,16,12);
  ctx.fillStyle='#000';ctx.fillRect(12,4,2,2);ctx.fillRect(18,4,2,2);
  if(frame%20<10){ctx.fillStyle='#ddd';
    if(dir==='right')ctx.fillRect(26,14,6,2);
    if(dir==='left')ctx.fillRect(0,14,6,2);
    if(dir==='up')ctx.fillRect(14,0,2,6);
    if(dir==='down')ctx.fillRect(14,26,2,6);
  }
ctx.restore();}

function drawEnemySprite(x,y){ctx.save();ctx.translate(x*TILE+4,y*TILE+4);
  ctx.fillStyle='#b33';ctx.fillRect(6,10,20,18);
  ctx.fillStyle='#000';ctx.fillRect(10,14,4,4);ctx.fillRect(18,14,4,4);
ctx.restore();}

const player={x:5,y:8,dir:'up'};let roomIndex=0;
const rooms=[
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:{x:4,y:0},enemy:null},
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:{x:4,y:0},enemy:{x:5,y:4,alive:true,dir:1}},
  {walls:[{x:0,y:0,w:10,h:1},{x:0,y:0,w:1,h:10},{x:9,y:0,w:1,h:10},{x:0,y:9,w:10,h:1}],exit:null,enemy:{x:5,y:4,alive:true,dir:-1}}
];

function draw(){ctx.clearRect(0,0,SIZE,SIZE);const room=rooms[roomIndex];
  ctx.fillStyle='#7ec850';ctx.fillRect(0,0,SIZE,SIZE);
  ctx.fillStyle='#3a5';room.walls.forEach(w=>ctx.fillRect(w.x*TILE,w.y*TILE,w.w*TILE,w.h*TILE));
  if(room.exit){ctx.fillStyle='#ccc';ctx.fillRect(room.exit.x*TILE,0,TILE,TILE);} 
  if(room.enemy&&room.enemy.alive)drawEnemySprite(room.enemy.x,room.enemy.y);
  drawPlayerSprite(player.x,player.y,player.dir);
}

function canMove(nx,ny){const room=rooms[roomIndex];if(nx<0||ny<0||nx>=10||ny>=10)return false;
  for(const w of room.walls){if(w.y===0&&room.exit&&nx===room.exit.x&&ny===0)continue;
    if(nx>=w.x&&nx<w.x+w.w&&ny>=w.y&&ny<w.y+w.h)return false;}return true;}

function move(dx,dy,dir){player.dir=dir;const nx=player.x+dx,ny=player.y+dy;if(canMove(nx,ny)){player.x=nx;player.y=ny;}
  const room=rooms[roomIndex];if(room.exit&&player.x===room.exit.x&&player.y===0){roomIndex=Math.min(roomIndex+1,rooms.length-1);player.x=5;player.y=9;}draw();}

function attack(){const room=rooms[roomIndex];if(room.enemy&&room.enemy.alive){const dx=Math.abs(room.enemy.x-player.x);const dy=Math.abs(room.enemy.y-player.y);if(dx+dy===1)room.enemy.alive=false;}draw();}

setInterval(()=>{const room=rooms[roomIndex];if(room.enemy&&room.enemy.alive){const nx=room.enemy.x+room.enemy.dir;if(nx>1&&nx<8)room.enemy.x=nx;else room.enemy.dir*=-1;draw();}},500);

function bindTouch(id,handler){const el=document.getElementById(id);el.addEventListener('touchstart',e=>{e.preventDefault();handler();},{passive:false});}

bindTouch('up',()=>move(0,-1,'up'));bindTouch('down',()=>move(0,1,'down'));bindTouch('left',()=>move(-1,0,'left'));bindTouch('right',()=>move(1,0,'right'));bindTouch('btnA',attack);

function loop(){frame++;draw();requestAnimationFrame(loop);}loop();