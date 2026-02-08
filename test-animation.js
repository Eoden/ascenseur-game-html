const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('play');
const W = canvas.width;
const H = canvas.height;

const blueImg = new Image();
const redImg = new Image();
blueImg.src = 'assets/sprites/warrior_blue.svg';
redImg.src = 'assets/sprites/warrior_red.svg';

let startTime = null;
let running = false;

const blue = { x: 120, y: 300, scale: 0.7, rot: 0 };
const red = { x: W - 120, y: 300, scale: 0.7, rot: 0 };

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function drawSprite(img, f) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rot);
  ctx.scale(f.scale, f.scale);
  ctx.drawImage(img, -64, -64, 128, 128);
  ctx.restore();
}

function drawAura(f, color, intensity) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(f.x, f.y, 40 + Math.sin(intensity) * 6, 0, Math.PI * 2);
  ctx.stroke();
}

function drawBeam(x1, x2, y, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
}

function resetFighters() {
  blue.x = 120; blue.rot = 0;
  red.x = W - 120; red.rot = 0;
}

function animate(timestamp) {
  if (!running) return;
  if (!startTime) startTime = timestamp;
  const t = (timestamp - startTime) / 1000;

  ctx.clearRect(0, 0, W, H);

  // Phase 1: idle
  if (t < 0.6) {
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
  }

  // Phase 2: charge
  if (t >= 0.6 && t < 1.4) {
    drawAura(blue, '#66a3ff', t * 10);
    drawAura(red, '#ff6a5e', t * 10);
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
  }

  // Phase 3: blue dash
  if (t >= 1.4 && t < 1.8) {
    const k = easeOut((t - 1.4) / 0.4);
    blue.x = 120 + k * 160;
    blue.rot = -0.2 * k;
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
  }

  // Phase 4: impact
  if (t >= 1.8 && t < 2.2) {
    red.x = W - 120 + Math.sin(t * 50) * 6;
    red.rot = 0.3;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(W / 2, blue.y, 30 + Math.sin(t * 40) * 8, 0, Math.PI * 2);
    ctx.fill();
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
  }

  // Phase 5: red counter beam
  if (t >= 2.2 && t < 2.8) {
    drawBeam(red.x - 40, blue.x + 40, blue.y, '#ffb3a7');
    blue.x += Math.sin(t * 40) * 4;
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
  }

  // Phase 6: reset
  if (t >= 2.8) {
    running = false;
    startTime = null;
    resetFighters();
    ctx.clearRect(0, 0, W, H);
    drawSprite(blueImg, blue);
    drawSprite(redImg, red);
    return;
  }

  requestAnimationFrame(animate);
}

playBtn.onclick = () => {
  if (running) return;
  running = true;
  startTime = null;
  resetFighters();
  requestAnimationFrame(animate);
};

// initial draw
blueImg.onload = () => {
  drawSprite(blueImg, blue);
  drawSprite(redImg, red);
};