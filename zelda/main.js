import { Game } from './core/Game.js';
import { draw } from './core/Renderer.js';
import { bind } from './core/Input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const game = new Game();

bind('up', () => game.move(0, -1));
bind('down', () => game.move(0, 1));
bind('left', () => game.move(-1, 0));
bind('right', () => game.move(1, 0));
bind('btnA', () => game.attack());

function loop() {
  draw(ctx, game);
  requestAnimationFrame(loop);
}
loop();