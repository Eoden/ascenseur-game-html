const suits = ['♠','♥','♦','♣'];
const values = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

let deck = [];
let stock = [];
let waste = [];
let foundations = { '♠':[], '♥':[], '♦':[], '♣':[] };
let tableau = [];
let selected = null;

function createDeck() {
  deck = [];
  for (const s of suits) for (const v of values) deck.push({suit:s,value:v});
}

function shuffle() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function setup() {
  createDeck();
  shuffle();

  tableau = Array.from({length:7},()=>[]);
  for (let i=0;i<7;i++) {
    for (let j=0;j<=i;j++) {
      const card = deck.pop();
      card.faceUp = j===i;
      tableau[i].push(card);
    }
  }
  stock = deck.map(c=>({...c, faceUp:false}));
  render();
}

function render() {
  document.getElementById('tableau').innerHTML='';
  tableau.forEach((col,i)=>{
    const div=document.createElement('div'); div.className='column';
    col.forEach(c=>{
      const cd=document.createElement('div'); cd.className='card';
      if(!c.faceUp){ cd.textContent='🂠'; }
      else{
        cd.textContent=c.value+c.suit;
        if(c.suit==='♥'||c.suit==='♦') cd.classList.add('red');
        cd.onclick=()=>selectCard(c,col);
      }
      div.appendChild(cd);
    });
    document.getElementById('tableau').appendChild(div);
  });
}

function selectCard(card,col){ selected={card,col}; }

document.getElementById('stock').onclick=()=>{
  if(stock.length){
    const c=stock.pop(); c.faceUp=true; waste=[c]; document.getElementById('waste').textContent=c.value+c.suit;
  } else { stock=waste.map(c=>({...c,faceUp:false})); waste=[]; document.getElementById('waste').textContent=''; }
};

setup();