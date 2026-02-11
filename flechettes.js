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
let startScore=301;
let mult=1;
let turn=[];

const defaultPalette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

function playTripleSound(){
  const ctx=new (window.AudioContext||window.webkitAudioContext)();
  const osc=ctx.createOscillator();
  const gain=ctx.createGain();
  osc.type='sawtooth';
  osc.frequency.value=220;
  gain.gain.value=0.2;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.frequency.exponentialRampToValueAtTime(880,ctx.currentTime+0.3);
  osc.stop(ctx.currentTime+0.3);
}

let playerCount=1;
const playerCountEl=document.getElementById('playerCount');
const namesEl=document.getElementById('playerNames');

document.getElementById('plus').onclick=()=>{if(playerCount<6){playerCount++;updatePlayersUI();}};
document.getElementById('minus').onclick=()=>{if(playerCount>1){playerCount--;updatePlayersUI();}};

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
updatePlayersUI();
modeEl.classList.remove('hidden');

modeEl.querySelectorAll('button[data-start]').forEach(b=>b.onclick=()=>startGame(+b.dataset.start));

function startGame(v){
  players=[];
  scores=[];
  colors=[];
  for(let i=0;i<playerCount;i++){
    const name=document.getElementById('player'+i).value.trim()||('Joueur '+(i+1));
    const color=document.getElementById('color'+i).value;
    players.push(name);
    scores.push(v);
    colors.push(color);
  }
  startScore=v;
  current=0;
  turn=[];
  setupEl.classList.add('hidden');
  modeEl.classList.add('hidden');
  gameEl.classList.remove('hidden');
  updateUI();
}

const multBtns=document.querySelectorAll('.mult button');
multBtns.forEach(b=>b.onclick=()=>{multBtns.forEach(x=>x.classList.remove('active'));b.classList.add('active');mult=+b.dataset.m});

const nums=document.getElementById('nums');
for(let i=1;i<=20;i++){
  const b=document.createElement('button');
  b.textContent=i;
  b.onclick=()=>addThrow(i);
  nums.appendChild(b);
}

document.querySelectorAll('[data-bull]').forEach(b=>b.onclick=()=>addThrow(+b.dataset.bull,true));

function addThrow(n,isBull=false){
  const val=isBull?n:n*mult;
  const next=scores[current]-val;

  if(next<0){showToast('😅 Bust !');return;}

  scores[current]=next;
  turn.push(val);

  if(!isBull){
    if(mult===3){showToast('🔥 BOOM ! Triple !');playTripleSound();}
    if(mult===2)showToast('💪 Bien joué ! Double !');
  }
  if(isBull&&n===50)showToast('🎯 Plein centre !!!');

  if(next===0){showVictory();return;}

  updateUI();
}

function updateUI(){
  remainingEl.textContent=scores[current];
  currentPlayerEl.textContent='Au tour de : '+players[current];
  scoreBox.style.color=colors[current];
  scoreBox.classList.add('player-color');
  render();
  updateSuggestion();
}

function render(){
  throwsEl.innerHTML='';
  turn.forEach(v=>{
    const li=document.createElement('li');
    li.textContent='🎯 -'+v;
    li.style.color=colors[current];
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

document.getElementById('undo').onclick=()=>{
  if(!turn.length)return;
  const v=turn.pop();
  scores[current]+=v;
  updateUI();
};

document.getElementById('nextTurn').onclick=()=>{
  turn=[];
  current=(current+1)%players.length;
  scoreBox.style.transform='scale(1.05)';
  setTimeout(()=>scoreBox.style.transform='scale(1)',200);
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
