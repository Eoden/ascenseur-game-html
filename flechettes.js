const body=document.body;
const setupEl=document.getElementById('setup');
const modeEl=document.getElementById('mode');
const gameEl=document.getElementById('game');
const remainingEl=document.getElementById('remaining');
const throwsEl=document.getElementById('throws');
const toast=document.getElementById('toast');
const suggestionEl=document.getElementById('suggestion');
const currentPlayerEl=document.getElementById('currentPlayer');
const endScreen=document.getElementById('endScreen');
const scoreBox=document.querySelector('.score');

let players=[];
let scores=[];
let colors=[];
let current=0;
let mult=1;
let turn=[];
let fireStreak=0;

// --- Setup joueurs ---
let playerCount=1;
const playerCountEl=document.getElementById('playerCount');
const namesEl=document.getElementById('playerNames');

const defaultPalette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

function updatePlayersUI(){
  playerCountEl.textContent=playerCount;
  namesEl.innerHTML='';
  for(let i=0;i<playerCount;i++){
    const wrapper=document.createElement('div');
    wrapper.className='player-config';

    const nameInput=document.createElement('input');
    nameInput.type='text';
    nameInput.placeholder='Joueur '+(i+1);
    nameInput.id='player'+i;

    const colorInput=document.createElement('input');
    colorInput.type='color';
    colorInput.value=defaultPalette[i%defaultPalette.length];
    colorInput.id='color'+i;

    wrapper.appendChild(nameInput);
    wrapper.appendChild(colorInput);
    namesEl.appendChild(wrapper);
  }
}

document.getElementById('plus').onclick=()=>{if(playerCount<6){playerCount++;updatePlayersUI();}};
document.getElementById('minus').onclick=()=>{if(playerCount>1){playerCount--;updatePlayersUI();}};
updatePlayersUI();
modeEl.classList.remove('hidden');

modeEl.querySelectorAll('button[data-start]').forEach(b=>{
  b.onclick=()=>startGame(+b.dataset.start);
});

function startGame(startScore){
  players=[];
  scores=[];
  colors=[];
  for(let i=0;i<playerCount;i++){
    players.push(document.getElementById('player'+i).value||('Joueur '+(i+1)));
    scores.push(startScore);
    colors.push(document.getElementById('color'+i).value);
  }
  current=0;
  turn=[];
  setupEl.classList.add('hidden');
  modeEl.classList.add('hidden');
  gameEl.classList.remove('hidden');
  updateUI();
}

// --- Jeu ---
const multBtns=document.querySelectorAll('.mult button');
multBtns.forEach(b=>{
  b.onclick=()=>{
    multBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    mult=+b.dataset.m;
  };
});

const nums=document.getElementById('nums');
for(let i=1;i<=20;i++){
  const btn=document.createElement('button');
  btn.textContent=i;
  btn.onclick=()=>addThrow(i);
  nums.appendChild(btn);
}

document.querySelectorAll('[data-bull]').forEach(b=>{
  b.onclick=()=>addThrow(+b.dataset.bull,true);
});

function addThrow(n,isBull=false){
  const value=isBull?n:n*mult;
  const next=scores[current]-value;

  if(next<0){showToast('😅 Bust !');return;}

  scores[current]=next;
  turn.push(value);

  if(mult===3){fireStreak++;flash();}
  else if(mult===2){flash();fireStreak=0;}
  else{fireStreak=0;}

  if(fireStreak>=2){scoreBox.style.boxShadow='0 0 30px orange';}
  else{scoreBox.style.boxShadow='0 0 25px '+colors[current];}

  if(next===0){showVictory();return;}

  updateUI();
}

function updateUI(){
  remainingEl.textContent=scores[current];
  currentPlayerEl.textContent='Au tour de : '+players[current];
  scoreBox.style.color=colors[current];
  scoreBox.style.borderColor=colors[current];
  body.style.background=`linear-gradient(180deg, ${colors[current]}, #111)`;
  renderThrows();
  suggestionEl.textContent=scores[current]<=60?('🎯 Tu peux finir en faisant '+scores[current]):'';
}

function renderThrows(){
  throwsEl.innerHTML='';
  turn.forEach(v=>{
    const li=document.createElement('li');
    li.textContent='🎯 -'+v;
    li.style.color=colors[current];
    throwsEl.appendChild(li);
  });
}

function flash(){
  scoreBox.classList.add('flash');
  setTimeout(()=>scoreBox.classList.remove('flash'),400);
}

document.getElementById('undo').onclick=()=>{
  if(!turn.length)return;
  const v=turn.pop();
  scores[current]+=v;
  updateUI();
};

document.getElementById('nextTurn').onclick=()=>{
  turn=[];
  current=(current+1)%players.length;
  fireStreak=0;
  updateUI();
};

function showToast(msg){
  toast.textContent=msg;
  toast.classList.remove('hidden');
  setTimeout(()=>toast.classList.add('hidden'),1200);
}

function showVictory(){
  const ranking=[...players.keys()].sort((a,b)=>scores[a]-scores[b]);
  let html='<h2>🏆 Classement final</h2><ul>';
  ranking.forEach((i,pos)=>{
    html+='<li style="color:'+colors[i]+'">'+(pos+1)+'. '+players[i]+' ('+scores[i]+')</li>';
  });
  html+='</ul><button onclick="location.reload()">Nouvelle partie</button>';
  endScreen.innerHTML=html;
  endScreen.classList.remove('hidden');
}