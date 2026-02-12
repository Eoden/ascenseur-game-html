// RESTORED STABLE VERSION v010037

document.addEventListener('DOMContentLoaded',function(){

let playerCount=1;
let players=[];
let scores=[];
let colors=[];
let current=0;
let multiplier=1;
let dartsThrown=0;
let turnStartScore=0;
let history=[];

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

document.getElementById('plus').onclick=()=>{
  if(playerCount<6){playerCount++;renderPlayers();}
};

document.getElementById('minus').onclick=()=>{
  if(playerCount>1){playerCount--;renderPlayers();}
};

function chooseRandomStarter(){
  current=Math.floor(Math.random()*players.length);
  showPopup('🎲 '+players[current]+' commence !');
}

function startGame(startScore){
  players=[];scores=[];colors=[];history=[];
  for(let i=0;i<playerCount;i++){
    players.push(document.getElementById('player'+i).value||('Joueur '+(i+1)));
    scores.push(startScore);
    colors.push(palette[i%palette.length]);
  }
  dartsThrown=0;
  turnStartScore=startScore;
  setupDiv.style.display='none';
  gameDiv.style.display='block';
  chooseRandomStarter();
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

// Multiplier

document.querySelectorAll('.mult-btn').forEach(btn=>{
  btn.onclick=function(){
    document.querySelectorAll('.mult-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    multiplier=parseInt(btn.dataset.m);
  };
});

function resetMultiplier(){
  multiplier=1;
  document.querySelectorAll('.mult-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('btnSimple').classList.add('active');
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

function showPopup(text){
  popup.textContent=text;
  popup.style.borderColor=colors[current]||'#fff';
  popup.style.display='block';
  setTimeout(()=>popup.style.display='none',1500);
}

function addScore(value,isBull){
  if(isBull) multiplier=1;
  const total=value*multiplier;

  if(dartsThrown===0) turnStartScore=scores[current];

  if(scores[current]-total<0){
    scores[current]=turnStartScore;
    showPopup('💥 BUST !');
    setTimeout(nextPlayer,1200);
    return;
  }

  scores[current]-=total;
  history.push(players[current]+' - '+total+' (reste '+scores[current]+')');
  dartsThrown++;

  renderHistory();
  updateUI();
  updateDarts();
  renderScoreboard();

  if(scores[current]===0){
    endGame();
    return;
  }

  if(dartsThrown===3){
    showPopup('🎯 Changement de joueur');
    setTimeout(nextPlayer,1200);
  }

  resetMultiplier();
}

function renderHistory(){
  historyDiv.innerHTML='';
  history.forEach(h=>{
    const div=document.createElement('div');
    div.textContent=h;
    historyDiv.appendChild(div);
  });
}

function suggestFinish(){
  const s=scores[current];
  if(s<=60 && s>0){
    let possibilities=[];
    for(let i=1;i<=20;i++){
      if(i===s) possibilities.push(i);
      if(i*2===s) possibilities.push('D'+i);
      if(i*3===s) possibilities.push('T'+i);
    }
    if(25===s) possibilities.push('25');
    if(50===s) possibilities.push('50');
    suggestionEl.textContent=possibilities.length?'Vise : '+possibilities.join(' ou '):'';
  } else {
    suggestionEl.textContent='';
  }
}

function updateUI(){
  currentPlayerEl.textContent='Tour de '+players[current];
  currentPlayerEl.style.color=colors[current];
  scoreEl.textContent=scores[current];
  suggestFinish();
  updateNumberColors();
}

function nextPlayer(){
  current=(current+1)%players.length;
  dartsThrown=0;
  renderDarts();
  updateUI();
  updateDarts();
}

function endGame(){
  gameDiv.style.display='none';
  endScreen.style.display='flex';
  let html='<h2>🏆 '+players[current]+' gagne !</h2>';
  players.forEach((p,i)=>{
    html+='<div style="color:'+colors[i]+'">'+p+' : '+scores[i]+'</div>';
  });
  html+='<button onclick="location.reload()">Retour au menu</button>';
  endScreen.innerHTML=html;
}

// Bulls

document.getElementById('bull25').onclick=()=>addScore(25,true);
document.getElementById('bull50').onclick=()=>addScore(50,true);

// Undo

document.getElementById('undo').onclick=function(){
  if(history.length===0)return;
  const last=history.pop();
  const val=parseInt(last.split(' - ')[1]);
  scores[current]+=val;
  dartsThrown=Math.max(0,dartsThrown-1);
  renderHistory();
  updateUI();
  updateDarts();
  renderScoreboard();
};

// Miss

document.getElementById('miss').onclick=function(){
  if(dartsThrown===0) turnStartScore=scores[current];
  dartsThrown++;
  history.push(players[current]+' - 0 (reste '+scores[current]+')');
  renderHistory();
  updateDarts();
  if(dartsThrown===3){
    showPopup('🎯 Changement de joueur');
    setTimeout(nextPlayer,1200);
  }
};

});
