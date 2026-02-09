const canvas=document.getElementById('scene');const ctx=canvas.getContext('2d');const playBtn=document.getElementById('play');const W=canvas.width,H=canvas.height;
const greenImg=new Image(),violetImg=new Image();greenImg.src='assets/sprites/warrior_blue.svg';violetImg.src='assets/sprites/warrior_red.svg';
let running=false,start=null;let cam={x:0,y:0,zoom:1,shake:0};
const A={x:120,y:300,s:0.72,r:0,vx:0};const B={x:W-120,y:300,s:0.72,r:0,vx:0};
const ease=t=>1-Math.pow(1-t,3);
function camApply(){ctx.setTransform(cam.zoom,0,0,cam.zoom,cam.x,cam.y)}
function drawSprite(img,f){ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.r);ctx.scale(f.s,f.s);ctx.drawImage(img,-64,-64,128,128);ctx.restore()}
function aura(f,c,p){ctx.strokeStyle=c;ctx.lineWidth=4;ctx.beginPath();ctx.arc(f.x,f.y,42+Math.sin(p*6)*6,0,Math.PI*2);ctx.stroke()}
function beam(x1,y1,x2,y2,c,w=12){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke()}
function flash(a){ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fillRect(-cam.x,-cam.y,W,H)}
function reset(){A.x=120;A.r=0;B.x=W-120;B.r=0;cam={x:0,y:0,zoom:1,shake:0}}
function animate(ts){if(!running)return;if(!start)start=ts;const t=(ts-start)/1000;ctx.clearRect(0,0,W,H);
cam.shake=Math.max(0,cam.shake-0.02);cam.x=(Math.random()-0.5)*cam.shake;cam.y=(Math.random()-0.5)*cam.shake;camApply();
// Acte 1: tension
if(t<0.8){cam.zoom=1.05;A.y=300+Math.sin(t*4)*2;B.y=300-Math.sin(t*4)*2;aura(A,'#7dff9e',t);aura(B,'#c39cff',t);drawSprite(greenImg,A);drawSprite(violetImg,B)}
// Acte 2: double dash
if(t>=0.8&&t<1.4){const k=ease((t-0.8)/0.6);A.x=120+220*k;B.x=W-120-220*k;A.r=-0.25*k;B.r=0.25*k;cam.shake=8;drawSprite(greenImg,A);drawSprite(violetImg,B)}
// Acte 3: impact
if(t>=1.4&&t<1.9){cam.shake=18;cam.zoom=0.95;flash(0.25);ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(W/2,300,36+Math.sin(t*30)*10,0,Math.PI*2);ctx.fill();drawSprite(greenImg,A);drawSprite(violetImg,B)}
// Acte 4: domination & combo
if(t>=1.9&&t<3.0){const k=ease((t-1.9)/1.1);B.x=W-120+60*k;B.r=0.6*k;beam(A.x+40,300,B.x-40,300,'#7dff9e',14);cam.shake=6;drawSprite(greenImg,A);drawSprite(violetImg,B)}
// Acte 5: fin ciné
if(t>=3.0&&t<3.8){cam.zoom=1.08;beam(A.x+40,300,B.x-10,300,'#7dff9e',18);aura(A,'#7dff9e',t*2);flash(0.1);drawSprite(greenImg,A);drawSprite(violetImg,B)}
if(t>=3.8){running=false;start=null;reset();ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,W,H);drawSprite(greenImg,A);drawSprite(violetImg,B);return}
requestAnimationFrame(animate)}
playBtn.onclick=()=>{if(running)return;running=true;start=null;reset();requestAnimationFrame(animate)}
Promise.all([new Promise(r=>greenImg.onload=r),new Promise(r=>violetImg.onload=r)]).then(()=>{drawSprite(greenImg,A);drawSprite(violetImg,B)})