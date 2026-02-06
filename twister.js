const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

const members = [
  { key: "MD", label: "Main droite", icon: "🖐️" },
  { key: "MG", label: "Main gauche", icon: "🖐️" },
  { key: "PD", label: "Pied droit", icon: "🦶" },
  { key: "PG", label: "Pied gauche", icon: "🦶" }
];

const colors = [
  { name: "Rouge", value: "#e74c3c" },
  { name: "Bleu", value: "#3498db" },
  { name: "Vert", value: "#2ecc71" },
  { name: "Jaune", value: "#f1c40f" }
];

const sectors = [];
colors.forEach(color => {
  members.forEach(member => {
    sectors.push({ color, member });
  });
});

const totalSectors = sectors.length;
const sectorAngle = 360 / totalSectors;

function buildWheel() {
  const gradient = sectors.map((s, i) => {
    const start = i * sectorAngle;
    const end = (i + 1) * sectorAngle;
    return `${s.color.value} ${start}deg ${end}deg`;
  }).join(",");

  wheel.style.background = `conic-gradient(${gradient})`;

  sectors.forEach((s, i) => {
    const angle = i * sectorAngle + sectorAngle / 2;
    const label = document.createElement("div");
    label.className = "sector-label";
    label.style.transform = `rotate(${angle}deg) translate(0, -160px) rotate(${-angle}deg)`;
    label.innerHTML = `${s.member.icon} ${s.member.key}`;
    wheel.appendChild(label);
  });
}

let currentRotation = 0;

spinBtn.addEventListener("click", () => {
  resultDiv.classList.add("hidden");

  const spins = Math.floor(Math.random() * 3) + 4;
  const selectedIndex = Math.floor(Math.random() * totalSectors);

  const targetRotation = 360 * spins + selectedIndex * sectorAngle;
  currentRotation += targetRotation;

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const finalAngle = (currentRotation + 180) % 360;
    const index = Math.floor(finalAngle / sectorAngle) % totalSectors;
    const selected = sectors[index];

    resultDiv.innerHTML = `${selected.member.icon} ${selected.member.label.toUpperCase()}<br/>SUR<br/><span style="color:${selected.color.value}">${selected.color.name.toUpperCase()}</span>`;
    resultDiv.classList.remove("hidden");
  }, 3000);
});

buildWheel();