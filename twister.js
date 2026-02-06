const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

// Ordered members (same order in every color section)
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

// Build sectors: 4 colors × 4 identical members
const sectors = [];
colors.forEach(color => {
  members.forEach(member => {
    sectors.push({ color, member });
  });
});

const totalSectors = sectors.length; // 16
const sectorAngle = 360 / totalSectors;

function buildWheel() {
  const gradientParts = sectors.map((s, i) => {
    const start = i * sectorAngle;
    const end = (i + 1) * sectorAngle;
    return `${s.color.value} ${start}deg ${end}deg`;
  });

  wheel.style.background = `conic-gradient(${gradientParts.join(",")})`;
}

let currentRotation = 0;

spinBtn.addEventListener("click", () => {
  resultDiv.classList.add("hidden");

  const spins = Math.floor(Math.random() * 3) + 4; // 4–6 spins
  const selectedIndex = Math.floor(Math.random() * totalSectors);

  const targetAngle =
    360 * spins + selectedIndex * sectorAngle + sectorAngle / 2;

  currentRotation += targetAngle;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const selected = sectors[totalSectors - 1 - selectedIndex];

  setTimeout(() => {
    resultDiv.innerHTML = `
      ${selected.member.icon} ${selected.member.label.toUpperCase()}<br/>
      SUR<br/>
      <span style="color:${selected.color.value}">
        ${selected.color.name.toUpperCase()}
      </span>
    `;
    resultDiv.classList.remove("hidden");
  }, 3000);
});

buildWheel();