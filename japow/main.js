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

// Bind on-screen directional buttons (used for BOTH menu and game)
bindDirectional('up', 'up', inputState);
bindDirectional('down', 'down', inputState);
bindDirectional('left', 'left', inputState);
bindDirectional('right', 'right', inputState);

// Bind on-screen A button for validation
bindAction('btnA', () => {
  if (state === "menu" && menu.validate()) {
    game = new Game();

    // 🔗 Synchronize game input with shared on-screen input
    game.input = inputState;

    state = "game";
  }
});

let lastMoveTime = 0;
const moveCooldown = 200; // ms to avoid ultra-fast cycling in menu

let last = performance.now();

function loop(now) {
  const dt = now - last;
  last = now;

  if (state === "menu") {
    // Handle menu navigation ONLY via on-screen arrows
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

    // Game now reads directly from shared inputState
    game.tick(dt);

    renderer.clear();
    renderer.render(game);
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
