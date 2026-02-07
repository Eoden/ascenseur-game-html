const suits=['♠','♥','♦','♣'];
const values=[2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
let deck=[],player=[],dealer=[],gameOver=false;

function buildDeck(){deck=[];for(const s of suits)for(const v of values)deck.push({s,v});}
function shuffle(){for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}}
function draw(){return deck.pop();}

function score(hand){let total=0,aces=0;
  for(const c of hand){if(c.v==='A'){aces++;total+=11;} else if(typeof c.v==='string'){total+=10;} else total+=c.v;}
  while(total>21&&aces){total-=10;aces--;}
  return total;
}

function render(){
  dealerDiv.innerHTML=''; playerDiv.innerHTML='';
  dealer.forEach((c,i)=>{
    const d=document.createElement('div');d.className='card';
    if(gameOver||i===0){d.textContent=c.v+c.s;if(c.s==='♥'||c.s==='♦')d.classList.add('red');}
    else d.textContent='🂠';
    dealerDiv.appendChild(d);
  });
  player.forEach(c=>{
    const d=document.createElement('div');d.className='card';d.textContent=c.v+c.s;
    if(c.s==='♥'||c.s==='♦')d.classList.add('red');playerDiv.appendChild(d);
  });
}

function end(msg){status.textContent=msg;gameOver=true;render();}

function start(){buildDeck();shuffle();player=[draw(),draw()];dealer=[draw(),draw()];gameOver=false;render();status.textContent='Your turn';
  if(score(player)===21)end('Blackjack! You win');}

hit.onclick=()=>{if(gameOver)return;player.push(draw());render();if(score(player)>21)end('Bust! You lose');};
stand.onclick=()=>{if(gameOver)return;while(score(dealer)<17)dealer.push(draw());
  const ps=score(player),ds=score(dealer);
  if(ds>21||ps>ds)end('You win'); else if(ps<ds)end('You lose'); else end('Push');};

start();