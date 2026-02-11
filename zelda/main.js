import { Game } from './core/Game.js';
import { Renderer } from './core/Renderer.js';
import { bind } from './core/Input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = new Game();
const renderer = new Renderer(ctx);

// --- Responsive canvas scaling ---
const LOGICAL_SIZE = 420;

function resizeCanvas() {
  const size = Math.min(window.innerWidth, window.innerHeight * 0.6);
  canvas.style.width = size + 'px';
  canvas.style.height = size + 'px';

  canvas.width = LOGICAL_SIZE;
  canvas.height = LOGICAL_SIZE;

  const scale = size / LOGICAL_SIZE;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

bind('up', () => game.move(0, -1));
bind('down', () => game.move(0, 1));
bind('left', () => game.move(-1, 0));
bind('right', () => game.move(1, 0));
bind('btnA', () => game.attack());

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  game.tick(dt);
  renderer.render(game);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
