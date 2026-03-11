const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let player = {
x:200,
y:400,
vx:0,
vy:-12,
w:30,
h:30
};

let platforms=[];
let score=0;
let running=false;

function createPlatforms(){
platforms=[];

// more platforms at the start to avoid instant fall
for(let i=0;i<16;i++){
platforms.push({
x:Math.random()*360,
y:i*40
});
}
}

function startGame(){
score=0;
player.x=200;
player.y=400;
player.vy=-12;
createPlatforms();
running=true;
loop();
}

function pauseGame(){
running=false;
}

function moveLeft(){
player.vx=-5;
}

function moveRight(){
player.vx=5;
}

document.addEventListener("keyup",()=>player.vx=0);

document.addEventListener("keydown",(e)=>{
if(e.key==="ArrowLeft") player.vx=-5;
if(e.key==="ArrowRight") player.vx=5;
if(e.key==="a") startGame();
if(e.key==="b") pauseGame();
});

function update(){

player.x+=player.vx;
player.y+=player.vy;

player.vy+=0.5;

if(player.x<0) player.x=400;
if(player.x>400) player.x=0;

platforms.forEach(p=>{

// more forgiving hitbox
if(
player.vy>0 &&
player.x+player.w>p.x-10 &&
player.x<p.x+70 &&
player.y+player.h>p.y &&
player.y+player.h<p.y+20
){
player.vy=-12;
}

});

if(player.y<250){
let diff=250-player.y;
player.y=250;
score+=diff;

platforms.forEach(p=>{
p.y+=diff;
if(p.y>600){
p.y=0;
p.x=Math.random()*360;
}
});
}

if(player.y>600){
running=false;
alert("Game Over\nScore: "+Math.floor(score));
}
}

function draw(){

ctx.clearRect(0,0,400,600);

ctx.fillStyle="lime";
ctx.fillRect(player.x,player.y,player.w,player.h);

ctx.fillStyle="white";
platforms.forEach(p=>{
ctx.fillRect(p.x,p.y,60,10);
});

ctx.fillStyle="white";
ctx.font="16px Arial";
ctx.fillText("Score: "+Math.floor(score),10,20);
}

function loop(){

if(!running) return;

update();
draw();

requestAnimationFrame(loop);
}