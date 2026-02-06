// Twister – Canvas-driven truth model (visual source of truth)

const canvas = document.getElementById("twisterCanvas");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

const COLORS = [
  { name: "Jaune", value: "#f1c40f" },
  { name: "Rouge", value: "#e74c3c" },
  { name: "Bleu", value: "#3498db" },
  { name: "Vert", value: "#2ecc71" }
];

const MEMBERS = [
  { key: "MD", label: "Main droite", icon: "🖐️" },
  { key: "MG", label: "Main gauche", icon: "🖐️" },
  { key: "PD", label: "Pied droit", icon: "🦶" },
  { key: "PG", label: "Pied gauche", icon: "🦶" }
];

// Build sectors (color × member)
const sectors = [];
COLORS.forEach(c => MEMBERS.forEach(m => sectors.push({ color: c, member: m })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.92;

let rotation = 0; // current rotation (radians)
let spinning = false;

// This will store the REAL angles used for drawing (source of truth)
let visibleSectors = [];

function normalize(angle) {
  return (angle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
}

function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  visibleSectors = [];

  sectors.forEach((s, i) => {
    const start = i * sectorAngle + rotation - Math.PI / 2;
    const end = start + sectorAngle;

    // store real drawn angles
    visibleSectors.push({
      index: i,
      start,
      end
    });

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = s.color.value;
    ctx.fill();

    const mid = (start + end) / 2;
    const x = cx + Math.cos(mid) * iconRadius;
    const y = cy + Math.sin(mid) * iconRadius;

    ctx.font = "18px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(`${s.member.icon} ${s.member.key}`, x, y);
  });
}

function getSectorUnderPointer() {
  const pointerAngle = normalize(-Math.PI / 2);

  for (const s of visibleSectors) {
    const start = normalize(s.start);
    const end = normalize(s.end);

    if (start < end) {
      if (pointerAngle >= start && pointerAngle < end) return s.index;
    } else {
      // sector crosses 0 radians
      if (pointerAngle >= start || pointerAngle < end) return s.index;
    }
  }

  // absolute fallback (should never happen)
  return 0;
}

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add("hidden");

  const fullTurns = 5;
  const startRotation = rotation;
  const targetRotation = rotation + fullTurns * 2 * Math.PI + Math.random() * 2 * Math.PI;
  const delta = targetRotation - startRotation;

  const duration = 1800; // ms
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);

    rotation = startRotation + delta * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      const index = getSectorUnderPointer();
      const res = sectors[index];
      resultDiv.innerHTML = `${res.member.icon} ${res.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${res.color.value}">${res.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove("hidden");
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener("click", spin);

drawWheel();