const wheel=document.getElementById('wheel');const spinBtn=document.getElementById('spinBtn');const resultDiv=document.getElementById('result');

const members=[{key:'MD',label:'Main droite',icon:'🖐️'},{key:'MG',label:'Main gauche',icon:'🖐️'},{key:'PD',label:'Pied droit',icon:'🦶'},{key:'PG',label:'Pied gauche',icon:'🦶'}];
const colors=[{name:'Rouge',value:'#e74c3c'},{name:'Bleu',value:'#3498db'},{name:'Vert',value:'#2ecc71'},{name:'Jaune',value:'#f1c40f'}];

const sectors=[];colors.forEach(c=>members.forEach(m=>sectors.push({color:c,member:m})));
const totalSectors=sectors.length;const sectorAngle=360/totalSectors;

function buildWheel(){
  wheel.innerHTML='';
  const gradient=sectors.map((s,i)=>`${s.color.value} ${i*sectorAngle}deg ${(i+1)*sectorAngle}deg`).join(',');
  wheel.style.background=`conic-gradient(${gradient})`;

  const radius=wheel.clientWidth/2-40;
  sectors.forEach((s,i)=>{
    const angle=i*sectorAngle+sectorAngle/2;
    const label=document.createElement('div');
    label.className='sector-label';
    label.style.transform=`rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`;
    label.innerHTML=`${s.member.icon} ${s.member.key}`;
    wheel.appendChild(label);
  });
}

let currentRotation=0;
spinBtn.onclick=()=>{
  resultDiv.classList.add('hidden');
  const spins=Math.floor(Math.random()*3)+4;
  const index=Math.floor(Math.random()*totalSectors);
  const target=360*spins+(index*sectorAngle)+(sectorAngle/2);
  currentRotation+=target;
  wheel.style.transform=`rotate(${currentRotation}deg)`;

  setTimeout(()=>{
    const normalized=(360-(currentRotation%360))%360;
    const selectedIndex=Math.floor(normalized/sectorAngle)%totalSectors;
    const selected=sectors[selectedIndex];
    resultDiv.innerHTML=`${selected.member.icon} ${selected.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${selected.color.value}">${selected.color.name.toUpperCase()}</span>`;
    resultDiv.classList.remove('hidden');
  },3000);
};

buildWheel();