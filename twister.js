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

// Build sectors (color × member)
const sectors = [];
COLORS.forEach(color => MEMBERS.forEach(member => sectors.push({ color, member })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.94;

let rotation = 0; // radians
let spinning = false;

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sectors.forEach((s, i) => {
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

  // Decide result first
  const selectedIndex = Math.floor(Math.random() * total);

  // Target angle: center of selected sector under 12h pointer
  const fullTurns = 6; // fixed for consistent UX
  const targetAngle =
    fullTurns * 2 * Math.PI +
    (-Math.PI / 2) +
    selectedIndex * sectorAngle +
    sectorAngle / 2;

  let speed = 0.6; // initial clockwise speed
  const friction = 0.985;

  function animate() {
    rotation += speed;
    speed *= friction;

    if (rotation >= targetAngle) {
      rotation = targetAngle;
      drawWheel();

      const sel = sectors[selectedIndex];
      resultDiv.innerHTML = `${sel.member.icon} ${sel.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${sel.color.value}">${sel.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove('hidden');
      spinning = false;
      return;
    }

    drawWheel();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener('click', spin);

drawWheel();