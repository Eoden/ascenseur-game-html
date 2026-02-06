const canvas = document.getElementById('twisterCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

const COLORS = [
  { name: 'Jaune', value: '#f1c40f' },
  { name: 'Rouge', value: '#e74c3c' },
  { name: 'Bleu', value: '#3498db' },
  { name: 'Vert', value: '#2ecc71' }
];

const MEMBERS = [
  { key: 'MD', label: 'Main droite', icon: '🖐️' },
  { key: 'MG', label: 'Main gauche', icon: '🖐️' },
  { key: 'PD', label: 'Pied droit', icon: '🦶' },
  { key: 'PG', label: 'Pied gauche', icon: '🦶' }
];

const sectors = [];
COLORS.forEach(color => MEMBERS.forEach(member => sectors.push({ color, member })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.75;

let rotation = 0;
let spinning = false;

function drawWheel(angleOffset = 0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sectors.forEach((s, i) => {
    const start = i * sectorAngle + angleOffset;
    const end = start + sectorAngle;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = s.color.value;
    ctx.fill();

    const mid = (start + end) / 2;
    const x = cx + Math.cos(mid) * iconRadius;
    const y = cy + Math.sin(mid) * iconRadius;

    ctx.font = '18px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(`${s.member.icon} ${s.member.key}`, x, y);
  });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add('hidden');

  const spins = Math.floor(Math.random() * 3) + 4;
  const targetIndex = Math.floor(Math.random() * total);
  const targetRotation = spins * 2 * Math.PI + targetIndex * sectorAngle;

  const start = rotation;
  const duration = 3000;
  const startTime = performance.now();

  function animate(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);
    rotation = start + (targetRotation - start) * eased;
    drawWheel(-rotation);

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const normalized = (rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const index = Math.floor(normalized / sectorAngle) % total;
      const sel = sectors[index];
      resultDiv.innerHTML = `${sel.member.icon} ${sel.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${sel.color.value}">${sel.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove('hidden');
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener('click', spin);

drawWheel();