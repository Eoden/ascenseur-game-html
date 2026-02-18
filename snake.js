const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const size = 20;
const tile = canvas.width / size;

let snake = [{x:10,y:10}];
let dir = {x:0,y:0};
let apple = spawnApple();
let score = 0;

function spawnApple(){
  return {
    x: Math.floor(Math.random()*size),
    y: Math.floor(Math.random()*size)
  };
}

function setDir(d){
  if(d==='up' && dir.y!==1) dir={x:0,y:-1};
  if(d==='down' && dir.y!==-1) dir={x:0,y:1};
  if(d==='left' && dir.x!==1) dir={x:-1,y:0};
  if(d==='right' && dir.x!==-1) dir={x:1,y:0};
}

document.addEventListener('keydown', e=>{
  if(e.key==='ArrowUp') setDir('up');
  if(e.key==='ArrowDown') setDir('down');
  if(e.key==='ArrowLeft') setDir('left');
  if(e.key==='ArrowRight') setDir('right');
});

function update(){
  if(dir.x===0 && dir.y===0) return;

  const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

  if(head.x<0 || head.y<0 || head.x>=size || head.y>=size || snake.some(s=>s.x===head.x && s.y===head.y)){
    alert('Game Over! Score: '+score);
    snake=[{x:10,y:10}];
    dir={x:0,y:0};
    score=0;
    apple=spawnApple();
    return;
  }

  snake.unshift(head);

  if(head.x===apple.x && head.y===apple.y){
    score++;
    apple=spawnApple();
  } else {
    snake.pop();
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle='red';
  ctx.fillRect(apple.x*tile, apple.y*tile, tile, tile);

  ctx.fillStyle='lime';
  snake.forEach(s=>{
    ctx.fillRect(s.x*tile, s.y*tile, tile-1, tile-1);
  });
}

function loop(){
  update();
  draw();
}

setInterval(loop, 120);