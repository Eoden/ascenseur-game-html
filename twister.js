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

// Build sectors: color x member (stable order)
const sectors = [];
COLORS.forEach(color => MEMBERS.forEach(member => sectors.push({ color, member })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.94; // closer to edge for readability

let rotation = 0; // radians, wheel rotation
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

    // Icon position at sector center
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

function getSelectedSectorIndex() {
  // Pointer is fixed at 12h => angle = -PI/2 in canvas coordinates
  // We project wheel rotation under the pointer without snapping
  const angleAtPointer = ((3 * Math.PI / 2) - rotation + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(angleAtPointer / sectorAngle) % total;
}

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add('hidden');

  let speed = 0.6; // fast start
  const friction = 0.985; // smooth deceleration

  function animate() {
    rotation += speed; // always clockwise
    speed *= friction;
    drawWheel();

    if (speed > 0.003) {
      requestAnimationFrame(animate);
    } else {
      // Stop without modifying rotation (wheel decides)
      const index = getSelectedSectorIndex();
      const sel = sectors[index];

      resultDiv.innerHTML = `${sel.member.icon} ${sel.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${sel.color.value}">${sel.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove('hidden');
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener('click', spin);

drawWheel();