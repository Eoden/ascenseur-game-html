const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

const bodyParts = [
  "Main droite",
  "Pied gauche",
  "Main gauche",
  "Pied droit"
];

const colors = [
  { name: "Rouge", value: "#e74c3c" },
  { name: "Bleu", value: "#3498db" },
  { name: "Vert", value: "#2ecc71" },
  { name: "Jaune", value: "#f1c40f" }
];

const sectors = [];
colors.forEach(c => {
  bodyParts.forEach(b => {
    sectors.push({ body: b, color: c.name, colorValue: c.value });
  });
});

const sectorAngle = 360 / sectors.length;

function buildWheel() {
  const gradient = sectors.map((s, i) => {
    const start = i * sectorAngle;
    const end = (i + 1) * sectorAngle;
    return `${s.colorValue} ${start}deg ${end}deg`;
  }).join(", ");

  wheel.style.background = `conic-gradient(${gradient})`;
}

let currentRotation = 0;

spinBtn.addEventListener("click", () => {
  resultDiv.classList.add("hidden");

  const spins = Math.floor(Math.random() * 4) + 4;
  const randomSector = Math.floor(Math.random() * sectors.length);

  const targetAngle = 360 * spins + randomSector * sectorAngle + sectorAngle / 2;

  currentRotation += targetAngle;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const selected = sectors[sectors.length - 1 - randomSector];

  setTimeout(() => {
    resultDiv.innerHTML = `${selected.body}<br/>SUR<br/><span style="color:${selected.colorValue}">${selected.color.toUpperCase()}</span>`;
    resultDiv.classList.remove("hidden");
  }, 3000);
});

buildWheel();