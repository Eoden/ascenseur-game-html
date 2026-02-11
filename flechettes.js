// VERSION 010032 - SMART FINISH + BUST + ANIMATIONS

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let current=0;
let multiplier=1;
let dartsThrown=0;
let turnStartScore=0;
let fullHistory=[];

const palette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

const playerCountEl=document.getElementById('playerCount');
const playersDiv=document.getElementById('players');
const setupDiv=document.getElementById('setup');
const gameDiv=document.getElementById('game');
const currentPlayerEl=document.getElementById('currentPlayer');
const scoreEl=document.getElementById('score');
const numbersDiv=document.getElementById('numbers');
const historyDiv=document.getElementById('history');
const suggestionEl=document.getElementById('suggestion');
const dartIndicator=document.getElementById('dartIndicator');
const scoreboardDiv=document.getElementById('scoreboard');
const funMessage=document.getElementById('funMessage');

function renderPlayers(){
  playerCountEl.textContent=playerCount;
  playersDiv.innerHTML='';
  for(let i=0;i<playerCount;i++){
    const input=document.createElement('input');
    input.placeholder='Joueur '+(i+1);
    input.id='player'+i;
    playersDiv.appendChild(input);
  }
}
renderPlayers();

document.getElementById('plus').onclick=()=>{if(playerCount<6){playerCount++;renderPlayers();}};
document.getElementById('minus').onclick=()=>{if(playerCount>1){playerCount--;renderPlayers();}};

function startGame(startScore){
  players=[];scores=[];colors=[];fullHistory=[];
  for(let i=0;i<playerCount;i++){
    players.push(document.getElementById('player'+i).value||('Joueur '+(i+1)));
    scores.push(startScore);
    colors.push(palette[i%palette.length]);
  }
  current=0;dartsThrown=0;turnStartScore=startScore;
  setupDiv.style.display='none';
  gameDiv.style.display='block';
  renderNumbers();renderScoreboard();renderDarts();updateUI();
}

document.getElementById('start301').onclick=()=>startGame(301);
document.getElementById('start501').onclick=()=>startGame(501);

function renderNumbers(){
  numbersDiv.innerHTML='';
  for(let i=1;i<=20;i++){
    const btn=document.createElement('button');
    btn.textContent=i;
    btn.onclick=()=>addScore(i);
    numbersDiv.appendChild(btn);
  }
}

// Multiplier reset to simple after each throw

document.querySelectorAll('.mult-btn').forEach(btn=>{
  btn.onclick=function(){
    document.querySelectorAll('.mult-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    multiplier=parseInt(btn.dataset.m);
  }
});

function resetMultiplier(){
  multiplier=1;
  document.querySelectorAll('.mult-btn').forEach(b=>b.classList.remove('active'));
  document.querySelector('[data-m="1"]').classList.add('active');
}

function renderDarts(){
  dartIndicator.innerHTML='';
  for(let i=0;i<3;i++){
    const d=document.createElement('div');
    d.className='dart';
    dartIndicator.appendChild(d);
  }
}

function updateDarts(){
  const darts=document.querySelectorAll('.dart');
  darts.forEach((d,i)=>{
    d.style.background=i<dartsThrown?colors[current]:'#555';
  });
}

function renderScoreboard(){
  scoreboardDiv.innerHTML='';
  players.forEach((p,i)=>{
    const badge=document.createElement('div');
    badge.className='player-badge';
    badge.style.background=colors[i];
    badge.textContent=p.charAt(0)+' : '+scores[i];
    scoreboardDiv.appendChild(badge);
  });
}

function addScore(value){
  const total=value*multiplier;

  if(dartsThrown===0) turnStartScore=scores[current];

  if(scores[current]-total<0){
    // BUST
    scores[current]=turnStartScore;
    funMessage.textContent='💥 BUST ! Tour annulé';
    setTimeout(nextPlayer,1200);
    return;
  }

  scores[current]-=total;
  fullHistory.push(players[current]+' - '+total+' (reste '+scores[current]+')');
  dartsThrown++;

  renderHistory();updateUI();updateDarts();renderScoreboard();

  if(scores[current]===0){
    funMessage.textContent='🏆 '+players[current]+' gagne !';
    return;
  }

  if(dartsThrown===3){
    funMessage.textContent='✨ Changement de joueur ! ✨';
    setTimeout(nextPlayer,1200);
  }

  resetMultiplier();
}

function renderHistory(){
  historyDiv.innerHTML='';
  fullHistory.forEach(h=>{
    const div=document.createElement('div');
    div.textContent=h;
    historyDiv.appendChild(div);
  });
}

function suggestFinish(){
  const s=scores[current];
  if(s<=40 && s>0){
    let txt='Vise '+s;
    if(s%2===0) txt+=' ou Double '+(s/2);
    suggestionEl.textContent=txt;
  } else suggestionEl.textContent='';
}

function updateUI(){
  currentPlayerEl.textContent='Tour de '+players[current];
  currentPlayerEl.style.color=colors[current];
  scoreEl.textContent=scores[current];
  suggestFinish();

  if(scores[current]<100) scoreEl.classList.add('under100');
  else scoreEl.classList.remove('under100');
}

function nextPlayer(){
  current=(current+1)%players.length;
  dartsThrown=0;
  gameDiv.classList.add('player-change');
  setTimeout(()=>gameDiv.classList.remove('player-change'),500);
  renderDarts();updateUI();updateDarts();funMessage.textContent='';
}

// Undo

document.getElementById('undo').onclick=function(){
  if(fullHistory.length===0)return;
  const last=fullHistory.pop();
  const val=parseInt(last.split(' - ')[1]);
  scores[current]+=val;
  dartsThrown=Math.max(0,dartsThrown-1);
  renderHistory();updateUI();updateDarts();renderScoreboard();
};

// Miss

document.getElementById('miss').onclick=function(){
  if(dartsThrown===0) turnStartScore=scores[current];
  dartsThrown++;
  fullHistory.push(players[current]+' - 0 (reste '+scores[current]+')');
  renderHistory();updateDarts();
  if(dartsThrown===3){
    funMessage.textContent='✨ Tour terminé ! ✨';
    setTimeout(nextPlayer,1200);
  }
};

});
