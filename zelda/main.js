import { Game } from './core/Game.js';
import { Renderer } from './core/Renderer.js';
import { bindDirectional, bindAction } from './core/Input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const game = new Game();
const renderer = new Renderer(ctx);

bindDirectional('up','up',game.input);
bindDirectional('down','down',game.input);
bindDirectional('left','left',game.input);
bindDirectional('right','right',game.input);
bindAction('btnA', () => game.attack());
bindAction('btnB', () => console.log('B pressed'));

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  game.tick(dt);
  renderer.render(game);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
