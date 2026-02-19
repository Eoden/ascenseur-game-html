// v010041 - REMATCH SYSTEM + MENU SPACING

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let wins={};
let rematchCount=0;
let current=0;
let multiplier=1;
let dartsThrown=0;
let turnStartScore=0;
let history=[];
let startScoreGlobal=301;

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
const popup=document.getElementById('popup');
const endScreen=document.getElementById('endScreen');

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
  startScoreGlobal=startScore;
  players=[];scores=[];colors=[];history=[];

  for(let i=0;i<playerCount;i++){
    const name=document.getElementById('player'+i).value||('Joueur '+(i+1));
    players.push(name);
    scores.push(startScore);
    colors.push(palette[i%palette.length]);
    if(!wins[name]) wins[name]=0;
  }

  dartsThrown=0;
  turnStartScore=startScore;
  setupDiv.style.display='none';
  gameDiv.style.display='block';
  current=0;

  renderNumbers();
  renderScoreboard();
  renderDarts();
  updateUI();
}

document.getElementById('start301').onclick=()=>startGame(301);
document.getElementById('start501').onclick=()=>startGame(501);

function renderNumbers(){
  numbersDiv.innerHTML='';
  for(let i=1;i<=20;i++){
    const btn=document.createElement('button');
    btn.textContent=i;
    btn.onclick=()=>addScore(i,false);
    numbersDiv.appendChild(btn);
  }
  updateNumberColors();
}

function updateNumberColors(){
  document.querySelectorAll('#numbers button').forEach(btn=>{
    btn.style.background=colors[current];
    btn.style.color='#000';
  });
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
    badge.textContent=p.charAt(0)+' : '+scores[i]+' (🏆'+wins[p]+')';
    scoreboardDiv.appendChild(badge);
  });
}

function addScore(value,isBull){
  if(isBull) multiplier=1;
  const total=value*multiplier;

  if(dartsThrown===0) turnStartScore=scores[current];

  if(scores[current]-total<0){
    scores[current]=turnStartScore;
    setTimeout(nextPlayer,1000);
    return;
  }

  scores[current]-=total;
  dartsThrown++;

  updateUI();
  updateDarts();
  renderScoreboard();

  if(scores[current]===0){
    wins[players[current]]++;
    endGame(players[current]);
    return;
  }

  if(dartsThrown===3){
    setTimeout(nextPlayer,800);
  }
}

function updateUI(){
  currentPlayerEl.textContent=players[current];
  currentPlayerEl.style.color=colors[current];
  scoreEl.textContent=scores[current];
  updateNumberColors();
}

function nextPlayer(){
  current=(current+1)%players.length;
  dartsThrown=0;
  renderDarts();
  updateUI();
}

function endGame(winner){
  gameDiv.style.display='none';
  endScreen.style.display='flex';

  let html='<h2>🏆 '+winner+' gagne !</h2>';
  players.forEach(p=>{
    html+='<div>'+p+' : '+wins[p]+' victoire(s)</div>';
  });

  if(rematchCount<2){
    html+='<button id="rematch">Revanche</button>';
  }

  html+='<button onclick="location.reload()">Menu</button>';

  endScreen.innerHTML=html;

  const rematchBtn=document.getElementById('rematch');
  if(rematchBtn){
    rematchBtn.onclick=function(){
      rematchCount++;
      endScreen.style.display='none';
      startGame(startScoreGlobal);
    };
  }
}

// Bulls

document.getElementById('bull25').onclick=()=>addScore(25,true);
document.getElementById('bull50').onclick=()=>addScore(50,true);

});
