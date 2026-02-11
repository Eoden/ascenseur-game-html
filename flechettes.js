// VERSION 010027 - CLEAN STABLE FIX

const playerCountEl=document.getElementById('playerCount');
const namesEl=document.getElementById('playerNames');
const gameEl=document.getElementById('game');
const remainingEl=document.getElementById('remaining');
const currentPlayerEl=document.getElementById('currentPlayer');
const suggestionEl=document.getElementById('suggestion');
const throwsEl=document.getElementById('throws');
const numbersEl=document.getElementById('numbers');

let playerCount=1;
let players=[];
let scores=[];
let current=0;

// Setup UI
function renderPlayers(){
  playerCountEl.textContent=playerCount;
  namesEl.innerHTML='';
  for(let i=0;i<playerCount;i++){
    const input=document.createElement('input');
    input.placeholder='Joueur '+(i+1);
    input.id='player'+i;
    namesEl.appendChild(input);
  }
}

renderPlayers();

document.getElementById('plus').onclick=()=>{if(playerCount<6){playerCount++;renderPlayers();}};
document.getElementById('minus').onclick=()=>{if(playerCount>1){playerCount--;renderPlayers();}};

// Start game

document.querySelectorAll('[data-start]').forEach(btn=>{
  btn.onclick=()=>{
    players=[];
    scores=[];
    const start=parseInt(btn.dataset.start);
    for(let i=0;i<playerCount;i++){
      players.push(document.getElementById('player'+i).value||('Joueur '+(i+1)));
      scores.push(start);
    }
    current=0;
    document.getElementById('setup').style.display='none';
    document.getElementById('mode').style.display='none';
    gameEl.style.display='block';
    updateUI();
  };
});

// Numbers
for(let i=1;i<=20;i++){
  const btn=document.createElement('button');
  btn.textContent=i;
  btn.onclick=()=>addScore(i);
  numbersEl.appendChild(btn);
}

function addScore(value){
  if(scores[current]-value<0)return;
  scores[current]-=value;
  const div=document.createElement('div');
  div.textContent='🎯 -'+value;
  throwsEl.appendChild(div);

  if(scores[current]===0){
    alert(players[current]+' a gagné !');
    location.reload();
    return;
  }

  updateUI();
}

function updateUI(){
  remainingEl.textContent=scores[current];
  currentPlayerEl.textContent='Au tour de : '+players[current];
  suggestionEl.textContent=scores[current]<=60?'🎯 Tu peux finir en faisant '+scores[current]:'';
}

document.getElementById('nextTurn').onclick=()=>{
  current=(current+1)%players.length;
  throwsEl.innerHTML='';
  updateUI();
};
