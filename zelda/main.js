import { Game } from './core/Game.js';
import { Renderer } from './core/Renderer.js';
import { bind } from './core/Input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = new Game();
const renderer = new Renderer(ctx);

bind('up', () => game.move(0, -1));
bind('down', () => game.move(0, 1));
bind('left', () => game.move(-1, 0));
bind('right', () => game.move(1, 0));
bind('btnA', () => game.attack());
bind('btnB', () => console.log('B pressed'));

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  game.tick(dt);
  renderer.render(game);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
