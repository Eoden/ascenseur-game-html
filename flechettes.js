// VERSION 010029 - RESTORED FEATURES STABLE

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let current=0;
let startScore=301;
let multiplier=1;
let throwsThisTurn=[];

const palette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

const playerCountEl=document.getElementById('playerCount');
const playersDiv=document.getElementById('players');
const setupDiv=document.getElementById('setup');
const gameDiv=document.getElementById('game');
const currentPlayerEl=document.getElementById('currentPlayer');
const scoreEl=document.getElementById('score');
const numbersDiv=document.getElementById('numbers');
const throwsDiv=document.getElementById('throws');
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

// Multiplier selection

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

  const div=document.createElement('div');
  div.textContent=(multiplier===2?'Double ':'')+(multiplier===3?'Triple ':'')+value+' = '+total;
  div.style.color=colors[current];
  throwsDiv.appendChild(div);

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

function updateUI(){
  currentPlayerEl.textContent='Tour de '+players[current];
  currentPlayerEl.style.color=colors[current];
  scoreEl.textContent=scores[current];
  suggestFinish();
}

function suggestFinish(){
  const s=scores[current];
  if(s<=40){
    let suggestion='';
    suggestion+='Finir avec '+s;
    if(s%2===0) suggestion+=' ou Double '+(s/2);
    suggestionEl.textContent=suggestion;
  }else{
    suggestionEl.textContent='';
  }
}

document.getElementById('next').onclick=function(){
  current=(current+1)%players.length;
  throwsThisTurn=[];
  throwsDiv.innerHTML='';
  updateUI();
};

});
