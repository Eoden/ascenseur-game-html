const modeEl=document.getElementById('mode');const gameEl=document.getElementById('game');const remainingEl=document.getElementById('remaining');const throwsEl=document.getElementById('throws');const toast=document.getElementById('toast');let startScore=301;let remaining=301;let mult=1;let turn=[];let prevRemaining=301;

// build numbers
const nums=document.getElementById('nums');for(let i=1;i<=20;i++){const b=document.createElement('button');b.textContent=i;b.onclick=()=>addThrow(i);nums.appendChild(b)}

// mode selection
modeEl.querySelectorAll('button[data-start]').forEach(b=>b.onclick=()=>startGame(+b.dataset.start));
function startGame(v){startScore=v;remaining=v;prevRemaining=v;remainingEl.textContent=remaining;modeEl.classList.add('hidden');gameEl.classList.remove('hidden');}

// multiplier
const multBtns=document.querySelectorAll('.mult button');multBtns.forEach(b=>b.onclick=()=>{multBtns.forEach(x=>x.classList.remove('active'));b.classList.add('active');mult=+b.dataset.m});

// bulls
document.querySelectorAll('[data-bull]').forEach(b=>b.onclick=()=>addThrow(+b.dataset.bull,true));

function addThrow(n,isBull=false){const val=isBull?n:n*mult;prevRemaining=remaining;const next=remaining-val;if(next<0){showBust();return;}remaining=next;remainingEl.textContent=remaining;turn.push(val);render();}

function render(){throwsEl.innerHTML='';turn.forEach(v=>{const li=document.createElement('li');li.textContent=`🎯 -${v}`;throwsEl.appendChild(li)});}

// actions
document.getElementById('undo').onclick=()=>{if(!turn.length)return;const v=turn.pop();remaining+=v;remainingEl.textContent=remaining;render();};
document.getElementById('nextTurn').onclick=()=>{turn=[];render();};

function showBust(){remaining=prevRemaining;remainingEl.textContent=remaining;turn=[];render();toast.classList.remove('hidden');setTimeout(()=>toast.classList.add('hidden'),1200);}