// VERSION 010028 - ULTRA STABLE

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let current=0;
let startScore=301;

const playerCountEl=document.getElementById('playerCount');
const playersDiv=document.getElementById('players');
const setupDiv=document.getElementById('setup');
const gameDiv=document.getElementById('game');
const currentPlayerEl=document.getElementById('currentPlayer');
const scoreEl=document.getElementById('score');
const numbersDiv=document.getElementById('numbers');

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

document.getElementById('plus').onclick=function(){
  if(playerCount<6){playerCount++;renderPlayers();}
};

document.getElementById('minus').onclick=function(){
  if(playerCount>1){playerCount--;renderPlayers();}
};

function startGame(scoreStart){
  players=[];
  scores=[];
  startScore=scoreStart;
  for(let i=0;i<playerCount;i++){
    const name=document.getElementById('player'+i).value||('Joueur '+(i+1));
    players.push(name);
    scores.push(startScore);
  }
  current=0;
  setupDiv.style.display='none';
  gameDiv.style.display='block';
  renderNumbers();
  updateUI();
}

function renderNumbers(){
  numbersDiv.innerHTML='';
  for(let i=1;i<=20;i++){
    const btn=document.createElement('button');
    btn.textContent=i;
    btn.onclick=function(){addScore(i)};
    numbersDiv.appendChild(btn);
  }
}

function addScore(value){
  if(scores[current]-value<0) return;
  scores[current]-=value;
  if(scores[current]===0){
    alert(players[current]+' gagne !');
    location.reload();
    return;
  }
  updateUI();
}

function updateUI(){
  currentPlayerEl.textContent='Tour de '+players[current];
  scoreEl.textContent=scores[current];
}


document.getElementById('start301').onclick=function(){startGame(301)};
document.getElementById('start501').onclick=function(){startGame(501)};

document.getElementById('next').onclick=function(){
  current=(current+1)%players.length;
  updateUI();
};

});
