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

// Build sectors in a stable order (color × member)
const sectors = [];
COLORS.forEach(color => MEMBERS.forEach(member => sectors.push({ color, member })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.94;

let rotation = 0; // current wheel rotation (radians)
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sectors.forEach((s, i) => {
    // Draw sectors with 12h reference (-PI/2)
    const start = i * sectorAngle + rotation - Math.PI / 2;
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

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add('hidden');

  // 1) Decide result first (single source of truth)
  const selectedIndex = Math.floor(Math.random() * total);

  // 2) Compute target rotation so the CENTER of the selected sector lands at 12h
  const fullTurns = 5 + Math.floor(Math.random() * 2); // 5–6 fast turns
  const targetRotation =
    fullTurns * 2 * Math.PI +
    selectedIndex * sectorAngle +
    sectorAngle / 2;

  const startRotation = rotation;
  const delta = targetRotation - startRotation;
  const duration = 3000; // ms
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);

    rotation = startRotation + delta * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      // 3) Reveal result (no computation from angle)
      const sel = sectors[selectedIndex];
      resultDiv.innerHTML = `${sel.member.icon} ${sel.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${sel.color.value}">${sel.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove('hidden');
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener('click', spin);

drawWheel();