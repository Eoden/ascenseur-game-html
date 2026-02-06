const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

const members = [
  { key: 'MD', label: 'Main droite', icon: '🖐️' },
  { key: 'MG', label: 'Main gauche', icon: '🖐️' },
  { key: 'PD', label: 'Pied droit', icon: '🦶' },
  { key: 'PG', label: 'Pied gauche', icon: '🦶' }
];

const colors = [
  { name: 'Jaune', value: '#f1c40f' },
  { name: 'Rouge', value: '#e74c3c' },
  { name: 'Bleu', value: '#3498db' },
  { name: 'Vert', value: '#2ecc71' }
];

// Build sectors starting from top (12h), clockwise
const sectors = [];
colors.forEach(color => members.forEach(member => sectors.push({ color, member })));

const totalSectors = sectors.length;
const sectorAngle = 360 / totalSectors;

function buildWheel() {
  wheel.innerHTML = '';

  const gradient = sectors
    .map((s, i) => `${s.color.value} ${i * sectorAngle}deg ${(i + 1) * sectorAngle}deg`)
    .join(',');

  // Align visual 0deg with pointer (top)
  wheel.style.background = `conic-gradient(from -90deg, ${gradient})`;

  const rect = wheel.getBoundingClientRect();
  const radius = rect.width / 2 - 36; // px, reliable geometry

  sectors.forEach((s, i) => {
    const angle = i * sectorAngle + sectorAngle / 2;
    const label = document.createElement('div');
    label.className = 'sector-label';
    label.style.transform = `rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg)`;
    label.innerHTML = `${s.member.icon} ${s.member.key}`;
    wheel.appendChild(label);
  });
}

let currentRotation = 0;

spinBtn.onclick = () => {
  resultDiv.classList.add('hidden');
  const spins = Math.floor(Math.random() * 3) + 4;
  const index = Math.floor(Math.random() * totalSectors);

  // target angle relative to pointer (0deg = top)
  const target = 360 * spins + index * sectorAngle;
  currentRotation += target;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    const normalized = ((currentRotation % 360) + 360) % 360;
    const visualOffset = 90; // compensate conic-gradient from -90deg
    const corrected = (normalized + visualOffset + sectorAngle / 2) % 360;
    const selectedIndex = Math.floor(corrected / sectorAngle) % totalSectors;
    const selected = sectors[selectedIndex];
    resultDiv.innerHTML = `${selected.member.icon} ${selected.member.label.toUpperCase()}<br/>SUR<br/><span style=\"color:${selected.color.value}\">${selected.color.name.toUpperCase()}</span>`;
    resultDiv.classList.remove('hidden');
  }, 3000);
};

buildWheel();