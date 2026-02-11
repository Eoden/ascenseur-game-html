const setupEl=document.getElementById('setup');
const modeEl=document.getElementById('mode');
const gameEl=document.getElementById('game');
const remainingEl=document.getElementById('remaining');
const throwsEl=document.getElementById('throws');
const toast=document.getElementById('toast');
const suggestionEl=document.getElementById('suggestion');
const currentPlayerEl=document.getElementById('currentPlayer');

let players=[];
let scores=[];
let current=0;
let startScore=301;
let mult=1;
let turn=[];
let prevRemaining=301;

// Player count
let playerCount=1;
const playerCountEl=document.getElementById('playerCount');
const namesEl=document.getElementById('playerNames');

document.getElementById('plus').onclick=()=>{if(playerCount<6){playerCount++;updatePlayersUI();}};
document.getElementById('minus').onclick=()=>{if(playerCount>1){playerCount--;updatePlayersUI();}};

function updatePlayersUI(){
  playerCountEl.textContent=playerCount;
  namesEl.innerHTML='';
  for(let i=0;i<playerCount;i++){
    const input=document.createElement('input');
    input.placeholder='Joueur '+(i+1);
    input.id='player'+i;
    namesEl.appendChild(input);
  }
}
updatePlayersUI();

// Mode selection
modeEl.querySelectorAll('button[data-start]').forEach(b=>b.onclick=()=>startGame(+b.dataset.start));

function startGame(v){
  players=[];
  scores=[];
  for(let i=0;i<playerCount;i++){
    const name=document.getElementById('player'+i).value.trim()||('Joueur '+(i+1));
    players.push(name);
    scores.push(v);
  }
  startScore=v;
  current=0;
  turn=[];
  setupEl.classList.add('hidden');
  modeEl.classList.add('hidden');
  gameEl.classList.remove('hidden');
  updateUI();
}

// After setup show mode
document.querySelectorAll('#playerNames input').forEach(i=>i.addEventListener('change',()=>modeEl.classList.remove('hidden')));
modeEl.classList.remove('hidden');

// Multiplier
const multBtns=document.querySelectorAll('.mult button');
multBtns.forEach(b=>b.onclick=()=>{multBtns.forEach(x=>x.classList.remove('active'));b.classList.add('active');mult=+b.dataset.m});

// Build numbers
const nums=document.getElementById('nums');
for(let i=1;i<=20;i++){
  const b=document.createElement('button');
  b.textContent=i;
  b.onclick=()=>addThrow(i);
  nums.appendChild(b);
}

// Bulls
document.querySelectorAll('[data-bull]').forEach(b=>b.onclick=()=>addThrow(+b.dataset.bull,true));

function addThrow(n,isBull=false){
  const val=isBull?n:n*mult;
  prevRemaining=scores[current];
  const next=scores[current]-val;

  if(next<0){showToast('😅 Bust !');return;}

  scores[current]=next;
  turn.push(val);

  if(!isBull){
    if(mult===3)showToast('🔥 BOOM ! Triple !');
    if(mult===2)showToast('💪 Bien joué ! Double !');
  }
  if(isBull&&n===50)showToast('🎯 Plein centre !!!');

  if(next===0){
    showToast('🏆 '+players[current]+' a gagné !!!');
    return;
  }

  updateUI();
}

function updateUI(){
  remainingEl.textContent=scores[current];
  currentPlayerEl.textContent='Au tour de : '+players[current];
  render();
  updateSuggestion();
}

function render(){
  throwsEl.innerHTML='';
  turn.forEach(v=>{
    const li=document.createElement('li');
    li.textContent='🎯 -'+v;
    throwsEl.appendChild(li);
  });
}

function updateSuggestion(){
  const r=scores[current];
  if(r<=60){
    suggestionEl.textContent='🎯 Tu peux finir en faisant '+r;
  }else{
    suggestionEl.textContent='';
  }
}

// Actions
document.getElementById('undo').onclick=()=>{
  if(!turn.length)return;
  const v=turn.pop();
  scores[current]+=v;
  updateUI();
};

document.getElementById('nextTurn').onclick=()=>{
  turn=[];
  current=(current+1)%players.length;
  updateUI();
};

function showToast(msg){
  toast.textContent=msg;
  toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),1200);
}
