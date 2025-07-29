// Matrix arka plan kodu (önceki versiyondan)
// Aynı şekilde arka planda kod yağmuru devam eder

const canvas = document.getElementById('matrix-canvas');
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

// Spotlight hareketi

const subMenu = document.querySelector('.sub-menu');
const spotlight = document.querySelector('.spotlight');
const buttons = Array.from(subMenu.querySelectorAll('.sub-btn'));

function updateSpotlight(el) {
  const rect = el.getBoundingClientRect();
  const containerRect = subMenu.getBoundingClientRect();
  const offsetLeft = rect.left - containerRect.left;
  spotlight.style.width = rect.width + 'px';
  spotlight.style.transform = `translateX(${offsetLeft}px)`;
}

// Başlangıçta aktif buton spotlighta yerleştir
const activeBtn = subMenu.querySelector('.sub-btn.active');
if (activeBtn) updateSpotlight(activeBtn);

buttons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Eğer link ise scroll yapma, sadece active değiştir
    if (btn.tagName === 'A') return;

    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateSpotlight(btn);

    // İlgili bölüme scroll
    const sectionId = btn.dataset.section;
    if (sectionId) {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Scroll event ile dinamik üst menü değişimi

window.addEventListener('scroll', () => {
  const aboutSection = document.getElementById('about');
  const rect = aboutSection.getBoundingClientRect();

  if (rect.top <= 100 && rect.bottom > 100) {
    // About görünürken, About butonunu spotlight ile vurgula
    buttons.forEach(b => b.classList.remove('active'));
    const aboutBtn = subMenu.querySelector('.sub-btn[data-section="about"]');
    aboutBtn.classList.add('active');
    updateSpotlight(aboutBtn);
  }
});

// Animasyon devam etsin

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}
animate();
