// VERSION 010038 - REMATCH + REACTION START GAME

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let wins={};
let current=0;
let multiplier=1;
let dartsThrown=0;
let turnStartScore=0;
let history=[];
let startValue=301;

const palette=['#ff6b6b','#4ecdc4','#ffe66d','#a29bfe','#f78fb3','#70a1ff'];

const playersDiv=document.getElementById('players');
const reactionGame=document.getElementById('reactionGame');
const setupDiv=document.getElementById('setup');
const gameDiv=document.getElementById('game');
const scoreboardDiv=document.getElementById('scoreboard');
const popup=document.getElementById('popup');
const endScreen=document.getElementById('endScreen');

function renderPlayers(){
  playersDiv.innerHTML='';
  for(let i=0;i<playerCount;i++){
    const wrap=document.createElement('div');
    wrap.className='player-config';
    const input=document.createElement('input');
    input.placeholder='Joueur '+(i+1);
    input.id='player'+i;
    const color=document.createElement('div');
    color.className='player-color';
    color.style.background=palette[i%palette.length];
    wrap.appendChild(input);
    wrap.appendChild(color);
    playersDiv.appendChild(wrap);
  }
}
renderPlayers();

function startGame(startScore){
  startValue=startScore;
  players=[];scores=[];colors=[];history=[];
  for(let i=0;i<playerCount;i++){
    const name=document.getElementById('player'+i).value||('Joueur '+(i+1));
    players.push(name);
    scores.push(startScore);
    colors.push(palette[i%palette.length]);
    if(!wins[name]) wins[name]=0;
  }
  setupDiv.style.display='none';
  launchReactionGame();
}

function launchReactionGame(){
  reactionGame.style.display='block';
  reactionGame.innerHTML='<h2>🎯 Touchez votre couleur !</h2>';
  players.forEach((p,i)=>{
    const dot=document.createElement('div');
    dot.className='reaction-dot';
    dot.style.background=colors[i];
    dot.style.top=Math.random()*250+'px';
    dot.style.left=Math.random()*80+'%';
    dot.onclick=()=>{
      current=i;
      reactionGame.style.display='none';
      gameDiv.style.display='block';
      initGame();
    };
    reactionGame.appendChild(dot);
  });
}

function initGame(){
  dartsThrown=0;
  turnStartScore=startValue;
  renderScoreboard();
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

function endGame(winner){
  wins[winner]++;
  gameDiv.style.display='none';
  endScreen.style.display='flex';
  let html='<h2>🏆 '+winner+' gagne !</h2>';
  players.forEach(p=>{
    html+='<div>'+p+' - Victoires : '+wins[p]+'</div>';
  });
  html+='<button id="rematch">Revanche</button>';
  html+='<button onclick="location.reload()">Menu</button>';
  endScreen.innerHTML=html;
  document.getElementById('rematch').onclick=()=>{
    endScreen.style.display='none';
    startGame(startValue);
  };
}

});
