// Ajout effet graphique spectaculaire
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
    piece.style.transform='rotate('+Math.random()*360+'deg)';
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),1000);
  }
}

// Hook dans addThrow (remplacement partiel logique effet)
const originalAddThrow=addThrow;
addThrow=function(n,isBull=false){
  const val=isBull?n:n*mult;
  const next=scores[current]-val;

  if(next<0){showToast('😅 Bust !');return;}

  scores[current]=next;
  turn.push(val);

  if(!isBull){
    if(mult===3){
      showToast('🔥 BOOM ! Triple !');
      playTripleSound();
      triggerFlash();
      launchConfetti(colors[current]);
    }
    if(mult===2){
      showToast('💪 Bien joué ! Double !');
      triggerFlash();
    }
  }

  if(isBull&&n===50){
    showToast('🎯 Plein centre !!!');
    triggerFlash();
  }

  if(next===0){
    launchConfetti(colors[current]);
    showVictory();
    return;
  }

  updateUI();
};
