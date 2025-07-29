const spotlight = document.querySelector('.spotlight');
const navMenu = document.querySelector('.nav-menu');
const navButtons = Array.from(navMenu.querySelectorAll('.nav-btn'));

function updateSpotlight(element) {
  const rect = element.getBoundingClientRect();
  const containerRect = navMenu.getBoundingClientRect();
  const offset = rect.left - containerRect.left;
  spotlight.style.width = `${rect.width}px`;
  spotlight.style.transform = `translateX(${offset}px)`;
}

navButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    if (btn.tagName === 'A') return; // Linkse tıklamada kaydırma yapma

    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const targetId = btn.dataset.target;
    if (targetId) {
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    }
    updateSpotlight(btn);
  });
});

// Sayfa scroll ile aktif menüyü güncelle
window.addEventListener('scroll', () => {
  const about = document.getElementById('about');
  const projects = document.getElementById('projects');
  const scrollPos = window.scrollY + 120; // header yüksekliği göz önünde

  if (scrollPos >= projects.offsetTop) {
    setActiveButton('projects');
  } else if (scrollPos >= about.offsetTop) {
    setActiveButton('about');
  }
});

function setActiveButton(sectionId) {
  navButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sectionId);
  });
  const activeBtn = navMenu.querySelector('.nav-btn.active');
  if (activeBtn) updateSpotlight(activeBtn);
}

// İlk spotlight ayarı
const initialActive = navMenu.querySelector('.nav-btn.active') || navButtons[0];
updateSpotlight(initialActive);

// Matrix arka plan animasyonu (önceki kod)
const canvas = document.createElement('canvas');
canvas.id = 'matrix-canvas';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const letters = '0123456789ABCDEF'.split('');
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = new Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(18, 18, 18, 0.15)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#82aaff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}
animate();
