document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const links = document.querySelectorAll('.nav-link');

  // Modal elementleri
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalClose = document.getElementById('modalClose');

  // Proje detayları objesi
  const projectsData = {
  "Drone Controller": {
    title: "Drone Controller",
    description: "Unity 6 Realtime Ray Tracing demo"
  },
  "Leaf Hero": {
    title: "Leaf Hero",
    description: "I developed a particle physics system"
  }
};


  function loadPage(page) {
    if (page === 'home') {
      content.innerHTML = `
      <section class="home-intro" data-aos="fade-right">
          <h1>Welcome 👋</h1>
         <p>This is the home page of emirodabas-dev.</p>
        <div class="button-grids" style="display: flex; gap: 16px; flex-wrap: wrap;">
           <a href="https://instagram.com/" target="_blank" class="btn">
           <span class="icon">
           <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg" alt="Instagram" width="20" height="20" />
           </span>
           Instagram
           </a>
           <a href="https://linkedin.com/" target="_blank" class="btn">
          <span class="icon">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg" alt="LinkedIn" width="20" height="20" />
          </span>
          LinkedIn
          </a>
          <a href="https://github.com/" target="_blank" class="btn">
          <span class="icon">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" alt="GitHub" width="20" height="20" />
          </span>
           GitHub
          </a>
          <a href="https://youtube.com/" target="_blank" class="btn">
          <span class="icon">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg" alt="YouTube" width="20" height="20" />
          </span>
          YouTube
          </a>
          <a href="https://x.com/" target="_blank" class="btn">
          <span class="icon">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg" alt="X" width="20" height="20" />
          </span>
          X
          </a>
          <a href="mailto:example@email.com" class="btn">
          <span class="icon">
          <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gmail.svg" alt="Email" width="20" height="20" />
          </span>
          Email
          </a>
       </div>
      </section>`;
    } else if (page === 'about') {
      content.innerHTML = `
      <section class="home-intro" data-aos="fade-right">
          <h1>About Me</h1>
          <p>Hello! I’m Emir, a passionate developer focused on game and web development. 🚀</p>
      </section>`;
    } else if (page === 'projects') {
      content.innerHTML = `
      <section data-aos="fade-right" class="projects-section">
        <h1>Projects</h1>
         <p class="projects-subtitle">Projects I've worked on</p>
        <div class="projects-grid">
        <div class="project-card" data-aos="zoom-in">
          <iframe src="https://www.youtube.com" title="Fire Soldier" frameborder="0" allowfullscreen></iframe>
          <h3>Fire Soldier</h3>
          <p>Unity 6 Realtime Ray Tracing demo</p>
          <div class="tags">
            <span>Unity</span>
            <span>C#</span>
            <span>Physics</span>
          </div>
          <a href="https://youtu.be/" target="_blank" class="btn-watch">Watch Video</a>
        </div>
        <div class="project-card" data-aos="zoom-in" data-aos-delay="100">
          <iframe src="https://www.youtube.com" title="Beast Attack" frameborder="0" allowfullscreen></iframe>
          <h3>Beast Attack</h3>
          <p>I developed a particle physics system</p>
          <div class="tags">
            <span>Unity</span>
            <span>Physics</span>
            <span>Experiments</span>
          </div>
          <a href="https://youtu.be/" target="_blank" class="btn-watch">Watch Video</a>
         </div>
         <!-- Diğer projeler de benzer şekilde eklenir -->
         </div>
      </section>`;
      
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.addEventListener('click', () => {
          const projectName = card.querySelector('h3').textContent;
          const data = projectsData[projectName];
          if (data) {
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.description;
            modal.classList.add('active');
          }
        });
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            card.click();
          }
        });
      });
    }
    else {
    content.innerHTML = `
      <section>
        <h1>404</h1>
        <p>Page not found.</p>
      </section>
    `;
  }
    AOS.refresh();
  }

  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    modalTitle.textContent = '';
    modalDescription.textContent = '';
  }
});

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
    });
  });

  loadPage('home');
});

links.forEach(l => l.classList.remove('active'));
document.querySelector(`.nav-link[data-page="${page}"]`).classList.add('active');

