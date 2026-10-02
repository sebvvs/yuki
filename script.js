const intro = document.getElementById("intro");
const letterScreen = document.getElementById("letterScreen");
const openButton = document.getElementById("openButton");
const buttonZone = document.getElementById("buttonZone");
const hint = document.getElementById("hint");
const paper = document.getElementById("paper");
const againButton = document.getElementById("againButton");
const particles = document.getElementById("particles");

let attempts = 0;
const dodgeAttempts = 3;

const messages = [
  "¿Segura? 👀",
  "Mmm... casi.",
  "Ya po, otra vez.",
  "Bueno, ahora sí ♡"
];

function moveButton() {
  const zone = buttonZone.getBoundingClientRect();
  const button = openButton.getBoundingClientRect();

  const maxX = Math.max(20, zone.width - button.width - 20);
  const maxY = Math.max(20, zone.height - button.height - 20);

  const x = 10 + Math.random() * maxX;
  const y = 8 + Math.random() * maxY;

  openButton.style.left = `${x}px`;
  openButton.style.top = `${y}px`;
  openButton.style.translate = "0 0";
}

function resetButtonPosition() {
  openButton.style.left = "50%";
  openButton.style.top = "50%";
  openButton.style.translate = "-50% -50%";
}

function burst() {
  const icons = ["♡", "🌸", "🐾", "✦", "♡", "🌷"];

  for (let i = 0; i < 22; i++) {
    const span = document.createElement("span");
    span.className = "particle";
    span.textContent = icons[Math.floor(Math.random() * icons.length)];
    span.style.left = `${Math.random() * 100}%`;
    span.style.fontSize = `${14 + Math.random() * 16}px`;
    span.style.animationDelay = `${Math.random() * .35}s`;
    particles.appendChild(span);
    setTimeout(() => span.remove(), 2300);
  }
}

openButton.addEventListener("click", () => {
  attempts += 1;

  if (attempts <= dodgeAttempts) {
    hint.textContent = messages[attempts - 1];
    moveButton();
    return;
  }

  hint.textContent = messages[3];
  resetButtonPosition();
  openButton.textContent = "Ahora sí";

  setTimeout(() => {
    intro.classList.remove("active");
    letterScreen.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => {
      paper.classList.add("reveal");
      burst();
    });
  }, 420);
});

againButton.addEventListener("click", () => {
  attempts = 0;
  hint.textContent = "Pero no sé si estas lista para abrirla";
  openButton.textContent = "Abrir";
  resetButtonPosition();
  paper.classList.remove("reveal");
  letterScreen.classList.remove("active");
  intro.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
});
