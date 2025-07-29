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
      <h3>${proj.title}</h3>
      <p><strong>Oluşturulma Tarihi:</strong> ${proj.date}</p>
      <p><strong>Kullanılan Araçlar:</strong> ${proj.tools}</p>
      <p><strong>Platform:</strong> ${proj.platform}</p>
      <p><strong>Açıklama:</strong> ${proj.description}</p>
      <h4>Özellikler:</h4>
      <ul>${proj.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <h4>Teknik Detaylar:</h4>
      <ul>${proj.technical.map(t => `<li>${t}</li>`).join('')}</ul>
    `;
    openModal(content);
  });
});

document.getElementById('btn-tech-detail').addEventListener('click', () => {
  openModal(technicalDetails);
});




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
