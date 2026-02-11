// VERSION 010030 - FULL HISTORY + UNDO + MISS

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let current=0;
let startScore=301;
let multiplier=1;
let throwsThisTurn=[];
let fullHistory=[];

const palette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

const playerCountEl=document.getElementById('playerCount');
const playersDiv=document.getElementById('players');
const setupDiv=document.getElementById('setup');
const gameDiv=document.getElementById('game');
const currentPlayerEl=document.getElementById('currentPlayer');
const scoreEl=document.getElementById('score');
const numbersDiv=document.getElementById('numbers');
const throwsDiv=document.getElementById('throws');
const historyDiv=document.getElementById('history');
const suggestionEl=document.getElementById('suggestion');

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

function startGame(scoreStart){
  players=[];
  scores=[];
  colors=[];
  fullHistory=[];
  startScore=scoreStart;

  for(let i=0;i<playerCount;i++){
    players.push(document.getElementById('player'+i).value||('Joueur '+(i+1)));
    scores.push(startScore);
    colors.push(palette[i%palette.length]);
  }

  current=0;
  throwsThisTurn=[];
  setupDiv.style.display='none';
  gameDiv.style.display='block';
  renderNumbers();
  updateUI();
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

// Multiplier

document.querySelectorAll('.multiplier button').forEach(btn=>{
  btn.onclick=function(){
    document.querySelectorAll('.multiplier button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    multiplier=parseInt(btn.dataset.m);
  }
});

function addScore(value){
  const total=value*multiplier;
  if(scores[current]-total<0)return;

  scores[current]-=total;
  throwsThisTurn.push(total);
  fullHistory.push({player:players[current],value:total,remaining:scores[current]});

  renderTurn();
  renderHistory();

  if(scores[current]===0){
    alert(players[current]+' gagne !');
    location.reload();
    return;
  }

  if(throwsThisTurn.length===3){
    alert('3 lancers effectués. Passer au joueur suivant.');
  }

  updateUI();
}

function renderTurn(){
  throwsDiv.innerHTML='';
  throwsThisTurn.forEach(v=>{
    const div=document.createElement('div');
    div.textContent='🎯 '+v;
    div.style.color=colors[current];
    throwsDiv.appendChild(div);
  });
}

function renderHistory(){
  historyDiv.innerHTML='';
  fullHistory.forEach(entry=>{
    const div=document.createElement('div');
    div.textContent=entry.player+' - '+entry.value+' (reste '+entry.remaining+')';
    historyDiv.appendChild(div);
  });
}

function updateUI(){
  currentPlayerEl.textContent='Tour de '+players[current];
  currentPlayerEl.style.color=colors[current];
  scoreEl.textContent=scores[current];
  suggestFinish();
}

function suggestFinish(){
  const s=scores[current];
  if(s<=40){
    let suggestion='Finir avec '+s;
    if(s%2===0) suggestion+=' ou Double '+(s/2);
    suggestionEl.textContent=suggestion;
  }else suggestionEl.textContent='';
}

// Miss

document.getElementById('miss').onclick=function(){
  throwsThisTurn.push(0);
  renderTurn();
  if(throwsThisTurn.length===3){
    alert('3 lancers effectués. Passer au joueur suivant.');
  }
};

// Undo

document.getElementById('undo').onclick=function(){
  if(throwsThisTurn.length===0)return;
  const last=throwsThisTurn.pop();
  scores[current]+=last;
  fullHistory.pop();
  renderTurn();
  renderHistory();
  updateUI();
};

// Next player

document.getElementById('next').onclick=function(){
  current=(current+1)%players.length;
  throwsThisTurn=[];
  renderTurn();
  updateUI();
};

});
