const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

const projectDetails = {
  1: {
    title: "Roguelike Survival Game",
    date: "2024",
    tools: "Unity, C#",
    platform: "PC",
    description: "Dalga dalga gelen düşmanlarla hayatta kalma oyunu.",
    features: [
      "Procedural generation",
      "Zorlu düşman AI",
      "Seviye ilerleme sistemi"
    ],
    technical: [
      "Unity 2023.1",
      "C# .NET 7",
      "Post-processing efektleri"
    ]
  },
  2: {
    title: "Unity Mobil Platformu",
    date: "2023",
    tools: "Unity, C#",
    platform: "Mobil (Android & iOS)",
    description: "Mobil için optimize edilmiş 2D platform oyunu.",
    features: [
      "Dokunmatik kontroller",
      "Optimized graphics",
      "Leaderboard sistemi"
    ],
    technical: [
      "Unity 2022.3",
      "C#",
      "Firebase entegrasyonu"
    ]
  },
  3: {
    title: "C# Desktop Uygulaması",
    date: "2022",
    tools: "C#, WPF",
    platform: "Windows PC",
    description: "Veri yönetimi ve raporlama uygulaması.",
    features: [
      "Veritabanı bağlantısı",
      "Dinamik raporlama",
      "Kullanıcı dostu arayüz"
    ],
    technical: [
      ".NET Framework 4.8",
      "Entity Framework",
      "MVVM pattern"
    ]
  }
};

const technicalDetails = `
  <h3>Teknik Yeteneklerim</h3>
  <ul>
    <li>C# / .NET (Orta İleri Seviye)</li>
    <li>Unity Oyun Geliştirme</li>
    <li>Veritabanı Yönetimi (SQL Server, MySQL)</li>
    <li>Web Teknolojileri (HTML, CSS, JavaScript)</li>
    <li>Git ve Versiyon Kontrol Sistemleri</li>
  </ul>
  <p>Daha fazlası için iletişime geçebilirsiniz.</p>
`;

function openModal(content) {
  modalBody.innerHTML = content;
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  modalBody.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelectorAll('.btn-detail').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.getAttribute('data-project');
    const proj = projectDetails[id];
    if (!proj) return;
    const content = `
      <h3 class="modal-title">${proj.title}</h3>
      <div class="modal-grid" style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <p><strong>📅 Oluşturulma Tarihi:</strong> ${proj.date}</p>
          <p><strong>🛠 Araçlar:</strong> ${proj.tools}</p>
          <p><strong>🖥 Platform:</strong> ${proj.platform}</p>
        </div>
        <div style="flex: 2; min-width: 250px;">
          <p><strong>📘 Açıklama:</strong> ${proj.description}</p>
          <h4>🚀 Özellikler:</h4>
          <ul>${proj.features.map(f => `<li>✔ ${f}</li>`).join('')}</ul>
          <h4>⚙ Teknik Detaylar:</h4>
          <ul>${proj.technical.map(t => `<li>🔧 ${t}</li>`).join('')}</ul>
        </div>
      </div>
    `;
    openModal(content);
  });
});

document.getElementById('btn-tech-detail').addEventListener('click', () => {
  openModal(technicalDetails);
});


const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > width) this.speedX *= -1;
    if (this.y < 0 || this.y > height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#82aaff';
    ctx.shadowColor = '#82aaff';
    ctx.shadowBlur = 8;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

for(let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0e0e0e';
  ctx.fillRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();


// Fare hareketiyle başlıklara glow ve hafif kayma efekti
const interactives = document.querySelectorAll('.interactive');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  interactives.forEach(el => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;

    const dx = (x - elX) / rect.width;  // -1 .. 1 arası
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


const monsterContainer = document.getElementById('monster-container');

const monsters = [];

function createMonster() {
  const m = document.createElement('div');
  m.classList.add('monster');

  // Rastgele boyut (20-50 px)
  const size = 20 + Math.random() * 30;
  m.style.width = size + 'px';
  m.style.height = size + 'px';

  // Başlangıç pozisyonu (header içinde yatay)
  m.style.top = (Math.random() * 60 + 20) + 'px'; // header yüksekliği içinde
  m.style.left = (Math.random() * window.innerWidth) + 'px';

  // Rastgele hız ve yön (pozitif veya negatif)
  m.speed = (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? 1 : -1);

  monsterContainer.appendChild(m);
  monsters.push(m);
}

for(let i = 0; i < 8; i++) { // 8 tane canavar
  createMonster();
}

function animateMonsters() {
  monsters.forEach(m => {
    let left = parseFloat(m.style.left);
    left += m.speed;

    // Ekran dışına çıkınca yön değiştir
    if (left < -50) left = window.innerWidth;
    if (left > window.innerWidth) left = -50;

    m.style.left = left + 'px';
  });
  requestAnimationFrame(animateMonsters);
}

animateMonsters();

window.addEventListener('resize', () => {
  // Canavarların sınırları güncellenir (istersen ekle)
});

