import { Game } from './core/Game.js';
import Renderer from './core/Renderer.js';
import { bindDirectional, bindAction } from './core/Input.js';
import SelectionMenu from './core/SelectionMenu.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let state = "menu";
const menu = new SelectionMenu();
let game = null;

const renderer = new Renderer(canvas);

bindDirectional('up','up',{});
bindDirectional('down','down',{});
bindDirectional('left','left',{
  left: false,
  right: false
});
bindDirectional('right','right',{
  left: false,
  right: false
});

window.addEventListener("keydown", (e) => {
  if (state === "menu") {
    if (e.key === "ArrowLeft") menu.move("left");
    if (e.key === "ArrowRight") menu.move("right");
    if (e.key.toLowerCase() === "a" && menu.validate()) {
      game = new Game();
      state = "game";
    }
  }
});

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  if (state === "game" && game) {
    game.tick(dt);
    renderer.clear();
    renderer.render(game);
  } else {
    menu.render(ctx);
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
