// NOTE: base stable v01.0014 – only result calculation corrected

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

const sectors = [];
COLORS.forEach(c => MEMBERS.forEach(m => sectors.push({ color: c, member: m })));

const total = sectors.length;
const sectorAngle = (2 * Math.PI) / total;

const cx = canvas.width / 2;
const cy = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const iconRadius = radius * 0.92;

let rotation = 0;
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

function computeResultFromRotation() {
  // angle under 12h pointer, same reference as drawing
  const angle = (-rotation - Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
  const index = Math.floor(angle / sectorAngle) % total;
  return sectors[index];
}

function spin() {
  if (spinning) return;
  spinning = true;
  resultDiv.classList.add("hidden");

  let speed = 0.6;
  const friction = 0.985;

  function animate() {
    rotation += speed;
    speed *= friction;

    drawWheel();

    if (speed > 0.002) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const res = computeResultFromRotation();
      resultDiv.innerHTML = `${res.member.icon} ${res.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${res.color.value}">${res.color.name.toUpperCase()}</span>`;
      resultDiv.classList.remove("hidden");
    }
  }

  requestAnimationFrame(animate);
}

spinBtn.addEventListener("click", spin);

drawWheel();