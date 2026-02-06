// Twister V2 – deterministic spin (result decided before animation)

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

    ctx.font = "18px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText(`${s.member.icon} ${s.member.key}`, x, y);
  });
}

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add("hidden");

  // 1. Decide result FIRST
  const selectedIndex = Math.floor(Math.random() * total);

  // 2. Compute target rotation (5 full turns + exact sector center)
  const fullTurns = 5;
  const currentNormalized = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  // IMPORTANT: sector center aligned to 12h pointer (-PI/2)
  const sectorCenterAngle = selectedIndex * sectorAngle + sectorAngle / 2 - Math.PI / 2;

  const targetRotation =
    rotation +
    fullTurns * 2 * Math.PI +
    (2 * Math.PI - currentNormalized) +
    sectorCenterAngle;

  const startRotation = rotation;
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
      // 3. Reveal result (deterministic, no calculation)
      const res = sectors[selectedIndex];
      resultDiv.innerHTML = `${res.member.icon} ${res.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${res.color.value}">${res.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove("hidden");
      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener("click", spin);

drawWheel();