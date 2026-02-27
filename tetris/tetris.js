import { bindDirectional, bindAction } from '../japow/core/Input.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');

const COLS = 10;
const ROWS = 20;
const BLOCK = 24;

canvas.width = COLS * BLOCK;
canvas.height = ROWS * BLOCK;

// 0 = empty; otherwise store color string
const board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const PIECES = {
  I: {
    color: '#00bcd4',
    cells: [
      [0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]
    ]
  },
  O: {
    color: '#ffeb3b',
    cells: [
      [1,1],
      [1,1]
    ]
  },
  T: {
    color: '#9c27b0',
    cells: [
      [0,1,0],
      [1,1,1],
      [0,0,0]
    ]
  },
  S: {
    color: '#4caf50',
    cells: [
      [0,1,1],
      [1,1,0],
      [0,0,0]
    ]
  },
  Z: {
    color: '#f44336',
    cells: [
      [1,1,0],
      [0,1,1],
      [0,0,0]
    ]
  },
  J: {
    color: '#3f51b5',
    cells: [
      [1,0,0],
      [1,1,1],
      [0,0,0]
    ]
  },
  L: {
    color: '#ff9800',
    cells: [
      [0,0,1],
      [1,1,1],
      [0,0,0]
    ]
  }
};

const BAG_KEYS = Object.keys(PIECES);

function cloneMatrix(m) {
  return m.map(r => r.slice());
}

function rotateCW(matrix) {
  const N = matrix.length;
  const out = Array.from({ length: N }, () => Array(N).fill(0));
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      out[x][N - 1 - y] = matrix[y][x];
    }
  }
  return out;
}

function makeBag() {
  const bag = BAG_KEYS.slice();
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

let bag = makeBag();
let score = 0;
let gameOver = false;

function nextPiece() {
  if (bag.length === 0) bag = makeBag();
  const key = bag.pop();
  const def = PIECES[key];

  // Normalize to NxN for rotation (I is 4x4, others 3x3, O is 2x2)
  let cells = cloneMatrix(def.cells);
  const size = cells.length;
  if (size === 2) {
    // Keep O as 2x2, rotation is no-op
  } else if (size === 3) {
    // ok
  } else if (size === 4) {
    // ok
  }

  const x = Math.floor((COLS - size) / 2);
  const y = -1; // spawn slightly above

  return { key, color: def.color, cells, x, y };
}

let current = nextPiece();

function collides(piece, nx, ny, cells = piece.cells) {
  for (let y = 0; y < cells.length; y++) {
    for (let x = 0; x < cells[y].length; x++) {
      if (!cells[y][x]) continue;
      const bx = nx + x;
      const by = ny + y;
      if (bx < 0 || bx >= COLS || by >= ROWS) return true;
      if (by >= 0 && board[by][bx]) return true;
    }
  }
  return false;
}

function merge(piece) {
  for (let y = 0; y < piece.cells.length; y++) {
    for (let x = 0; x < piece.cells[y].length; x++) {
      if (!piece.cells[y][x]) continue;
      const bx = piece.x + x;
      const by = piece.y + y;
      if (by >= 0 && by < ROWS && bx >= 0 && bx < COLS) {
        board[by][bx] = piece.color;
      }
    }
  }
}

function clearLines() {
  let cleared = 0;
  for (let y = ROWS - 1; y >= 0; y--) {
    if (board[y].every(v => v)) {
      board.splice(y, 1);
      board.unshift(Array(COLS).fill(0));
      cleared++;
      y++;
    }
  }
  if (cleared > 0) {
    const points = [0, 100, 300, 500, 800][cleared] ?? (cleared * 200);
    score += points;
    scoreEl.textContent = `Score: ${score}`;
  }
}

function hardDrop() {
  if (gameOver) return;
  while (!collides(current, current.x, current.y + 1)) {
    current.y++;
  }
  lockPiece();
}

function lockPiece() {
  merge(current);
  clearLines();
  current = nextPiece();
  if (collides(current, current.x, current.y)) {
    gameOver = true;
  }
}

function tryMove(dx, dy) {
  if (gameOver) return false;
  const nx = current.x + dx;
  const ny = current.y + dy;
  if (!collides(current, nx, ny)) {
    current.x = nx;
    current.y = ny;
    return true;
  }
  return false;
}

function tryRotate() {
  if (gameOver) return;
  if (current.key === 'O') return; // no-op

  const rotated = rotateCW(current.cells);

  // Tiny wall-kick: try center, then shift left/right
  const kicks = [0, -1, 1, -2, 2];
  for (const k of kicks) {
    if (!collides(current, current.x + k, current.y, rotated)) {
      current.cells = rotated;
      current.x += k;
      return;
    }
  }
}

// ===== Rendering =====
function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);

  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#fff';
  ctx.fillRect(x * BLOCK + 2, y * BLOCK + 2, BLOCK - 4, BLOCK - 4);
  ctx.globalAlpha = 1;

  ctx.strokeStyle = 'rgba(0,0,0,0.35)';
  ctx.strokeRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // board
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const v = board[y][x];
      if (v) drawCell(x, y, v);
    }
  }

  // current
  for (let y = 0; y < current.cells.length; y++) {
    for (let x = 0; x < current.cells[y].length; x++) {
      if (!current.cells[y][x]) continue;
      const bx = current.x + x;
      const by = current.y + y;
      if (by >= 0) drawCell(bx, by, current.color);
    }
  }

  if (gameOver) {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, canvas.height / 2 - 40, canvas.width, 80);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
    ctx.font = '12px Arial';
    ctx.fillText('Press A to restart', canvas.width / 2, canvas.height / 2 + 22);
    ctx.textAlign = 'left';
  }
}

// ===== Input (mobile + keyboard) =====
const input = { left: false, right: false, down: false };

bindDirectional('left', 'left', input);
bindDirectional('right', 'right', input);
bindDirectional('down', 'down', input);

// Rotate on UP button
bindAction('up', () => {
  if (gameOver) return;
  tryRotate();
});

bindAction('btnA', () => {
  if (gameOver) {
    restart();
    return;
  }
  tryRotate();
});

bindAction('btnB', () => {
  if (gameOver) return;
  hardDrop();
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') input.left = true;
  if (e.key === 'ArrowRight') input.right = true;
  if (e.key === 'ArrowDown') input.down = true;

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    tryRotate();
  }

  if (e.key === ' ' || e.key === 'Enter') {
    hardDrop();
  }

  if ((e.key === 'a' || e.key === 'A') && gameOver) {
    restart();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') input.left = false;
  if (e.key === 'ArrowRight') input.right = false;
  if (e.key === 'ArrowDown') input.down = false;
});

// ===== Game Loop =====
let dropTimer = 0;
let dropInterval = 700;

let moveTimer = 0;
const moveRepeat = 120;

let last = performance.now();

function update(now) {
  const dt = now - last;
  last = now;

  if (!gameOver) {
    // Side movement repeat
    moveTimer += dt;
    if (moveTimer >= moveRepeat) {
      if (input.left) tryMove(-1, 0);
      if (input.right) tryMove(1, 0);
      moveTimer = 0;
    }

    // Gravity (soft drop speeds it up)
    dropTimer += dt;
    const interval = input.down ? 60 : dropInterval;

    if (dropTimer >= interval) {
      dropTimer = 0;
      if (!tryMove(0, 1)) {
        lockPiece();
      }
    }
  }

  render();
  requestAnimationFrame(update);
}

function restart() {
  for (let y = 0; y < ROWS; y++) {
    board[y].fill(0);
  }
  score = 0;
  scoreEl.textContent = 'Score: 0';
  gameOver = false;
  bag = makeBag();
  current = nextPiece();
  dropTimer = 0;
  moveTimer = 0;
}

requestAnimationFrame(update);
