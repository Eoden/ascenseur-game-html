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

// Shared input state for on-screen controls
const inputState = {
  up: false,
  down: false,
  left: false,
  right: false
};

// Bind on-screen directional buttons
bindDirectional('up', 'up', inputState);
bindDirectional('down', 'down', inputState);
bindDirectional('left', 'left', inputState);
bindDirectional('right', 'right', inputState);

// Bind A button for BOTH menu and game
bindAction('btnA', () => {
  if (state === "menu" && menu.validate()) {
    game = new Game();
    game.input = inputState;
    state = "game";
    return;
  }

  if (state === "game" && game) {
    game.attack();
  }
});

let lastMoveTime = 0;
const moveCooldown = 200;

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  if (state === "menu") {
    if (now - lastMoveTime > moveCooldown) {
      if (inputState.left) {
        menu.move("left");
        lastMoveTime = now;
      }
      if (inputState.right) {
        menu.move("right");
        lastMoveTime = now;
      }
    }

    menu.render(ctx);

  } else if (state === "game" && game) {

    game.tick(dt);

    renderer.clear();
    renderer.render(game);
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
