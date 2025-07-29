// Matrix kod yağmuru arka plan
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
  ctx.fillStyle = 'rgba(18, 18, 18, 0.15)'; // arka plan karartma efekti
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#82aaff'; // neon mavi renk
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

// Fare hareketiyle başlıklara glow ve hafif kayma efekti

const interactives = document.querySelectorAll('.interactive');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  interactives.forEach(el => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;

    const dx = (x - elX) / rect.width;  // -1 .. 1
    const dy = (y - elY) / rect.height;

    const maxTranslate = 10; // px cinsinden hareket mesafesi

    el.style.transform = `translate3d(${dx * maxTranslate}px, ${dy * maxTranslate}px, 0)`;
    
    // Glow efektini fare yaklaştıkça artır
    const distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < 0.8) {
      el.classList.add('glow');
    } else {
      el.classList.remove('glow');
    }
  });
});

function animate() {
  drawMatrix();
  requestAnimationFrame(animate);
}
animate();
