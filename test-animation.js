const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('play');

let state = 'idle';
let timer = 0;

function drawFighter(x, color, aura=false) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, 250, 20, 0, Math.PI * 2);
  ctx.fill();

  if (aura) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, 250, 30 + Math.sin(timer/5)*5, 0, Math.PI*2);
    ctx.stroke();
  }
}

function drawBeam(x1, x2, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(x1, 250);
  ctx.lineTo(x2, 250);
  ctx.stroke();
}

function animate() {
  ctx.clearRect(0,0,400,400);

  if (state === 'idle') {
    drawFighter(80, '#00f');
    drawFighter(320, '#f00');
  }

  if (state === 'charge') {
    drawFighter(80, '#00f', true);
    drawFighter(320, '#f00', true);
    if (timer > 60) state = 'fire';
  }

  if (state === 'fire') {
    drawFighter(80, '#00f', true);
    drawFighter(320, '#f00', true);
    drawBeam(100, 200, '#0ff');
    drawBeam(300, 200, '#f88');
    if (timer > 120) state = 'clash';
  }

  if (state === 'clash') {
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(200,250,30 + Math.sin(timer)*10,0,Math.PI*2);
    ctx.fill();
    if (timer > 180) state = 'reset';
  }

  if (state === 'reset') {
    timer = 0;
    state = 'idle';
    return;
  }

  timer++;
  requestAnimationFrame(animate);
}

playBtn.onclick = () => {
  timer = 0;
  state = 'charge';
  requestAnimationFrame(animate);
};

animate();