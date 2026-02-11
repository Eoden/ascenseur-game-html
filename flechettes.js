const body=document.body;
const scoreBox=document.querySelector('.score');
let fireStreak=0;

function updateBackground(color){
  body.style.background=`linear-gradient(180deg, ${color}, #111)`;
}

function triggerFlash(){
  scoreBox.classList.add('flash');
  setTimeout(()=>scoreBox.classList.remove('flash'),400);
}

function launchConfetti(color){
  for(let i=0;i<25;i++){
    const piece=document.createElement('div');
    piece.className='confetti-piece';
    piece.style.background=color;
    piece.style.left=Math.random()*100+'vw';
    piece.style.top='-10px';
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),1000);
  }
}

function activateSlowMo(){
  body.classList.add('slowmo');
  setTimeout(()=>body.classList.remove('slowmo'),800);
}

function activateFireMode(){
  scoreBox.classList.add('fire-mode');
}

function deactivateFireMode(){
  scoreBox.classList.remove('fire-mode');
}

// Patch dans updateUI
const originalUpdateUI=updateUI;
updateUI=function(){
  originalUpdateUI();
  updateBackground(colors[current]);
};

// Patch dans addThrow
const originalAddThrow2=addThrow;
addThrow=function(n,isBull=false){
  const before=scores[current];
  originalAddThrow2(n,isBull);
  const after=scores[current];

  if(after<before && (mult===3 || mult===2 || isBull)){
    triggerFlash();
  }

  if(mult===3){
    activateSlowMo();
    launchConfetti(colors[current]);
    fireStreak++;
  }else{
    fireStreak=0;
  }

  if(fireStreak>=2){
    activateFireMode();
  }else{
    deactivateFireMode();
  }
};
