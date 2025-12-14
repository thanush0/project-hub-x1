// Enhanced Portfolio Data Store
let store = {
  // Personal Info
  personal: {
    fullName: 'Marcus Chen',
    title: 'Creative Developer & Designer',
    bio: "I'm a passionate creative developer with 8+ years of experience crafting digital experiences that bridge the gap between design and technology. My journey began with a fascination for human-computer interaction, which led me to specialize in creating intuitive, engaging, and accessible web applications. I believe great design is invisible—it solves problems and delights users.",
    location: 'San Francisco, CA',
    email: 'marcus.chen@example.com',
    phone: '+1 (555) 123-4567',
    website: 'marcus.dev',
    experience: '8+ Years',
    status: 'Available',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    dribbble: 'https://dribbble.com',
    profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Ccircle cx="100" cy="100" r="100" fill="%230066ff"/%3E%3Ctext x="100" y="120" font-size="80" text-anchor="middle" fill="white"%3E👨%3C/text%3E%3C/svg%3E'
  },

  // Projects with GitHub links and images
  projects: [
    {
      id: 1,
      title: 'Nexus Platform',
      category: 'Full Stack',
      description: 'Enterprise collaboration platform with real-time features',
      fullDescription: 'A comprehensive enterprise solution featuring real-time collaboration, advanced analytics, and seamless integration with existing workflows. Supports teams of any size.',
      tech: ['React', 'Node.js', 'WebSocket', 'MongoDB', 'Redis', 'AWS'],
      image: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🚀' },
      imageUrl: '',
      demo: 'https://nexus-demo.example.com',
      repo: 'https://github.com/username/nexus-platform',
      featured: true,
      views: 1247,
      deployedDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Artify Studio',
      category: 'Creative',
      description: 'AI-powered design tool for creative professionals',
      fullDescription: 'Revolutionary design platform leveraging AI to assist creative professionals in generating stunning visuals and streamlining their workflow.',
      tech: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL', 'FastAPI'],
      image: { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', emoji: '🎨' },
      imageUrl: '',
      demo: 'https://artify-demo.example.com',
      repo: 'https://github.com/username/artify-studio',
      featured: false,
      views: 892,
      deployedDate: '2023-11-20',
      status: 'Active'
    },
    {
      id: 3,
      title: 'FinTrack Pro',
      category: 'FinTech',
      description: 'Personal finance management with AI insights',
      fullDescription: 'Smart financial management application with AI-driven insights, automated expense categorization, and predictive budgeting features.',
      tech: ['React Native', 'Django', 'Machine Learning', 'Redis', 'Stripe API'],
      image: { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', emoji: '💰' },
      imageUrl: '',
      demo: 'https://fintrack-demo.example.com',
      repo: 'https://github.com/username/fintrack-pro',
      featured: false,
      views: 1056,
      deployedDate: '2023-10-05',
      status: 'Active'
    },
    {
      id: 4,
      title: 'EcoSense IoT',
      category: 'IoT',
      description: 'Environmental monitoring IoT dashboard',
      fullDescription: 'Comprehensive IoT solution for environmental monitoring with real-time data visualization, predictive analytics, and automated alerts.',
      tech: ['Angular', 'Node.js', 'IoT Sensors', 'InfluxDB', 'Grafana'],
      image: { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', emoji: '🌱' },
      imageUrl: '',
      demo: 'https://ecosense-demo.example.com',
      repo: 'https://github.com/username/ecosense-iot',
      featured: false,
      views: 743,
      deployedDate: '2023-09-12',
      status: 'Active'
    },
    {
      id: 5,
      title: 'MetaVerse Hub',
      category: 'Web3',
      description: 'Decentralized social platform for NFT creators',
      fullDescription: 'Web3 social platform enabling NFT creators to showcase, sell, and collaborate in a decentralized ecosystem with integrated marketplace features.',
      tech: ['React', 'Solidity', 'IPFS', 'Web3.js', 'Hardhat', 'OpenZeppelin'],
      image: { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', emoji: '🌐' },
      imageUrl: '',
      demo: 'https://metaverse-demo.example.com',
      repo: 'https://github.com/username/metaverse-hub',
      featured: true,
      views: 2156,
      deployedDate: '2024-02-01',
      status: 'Active'
    },
    {
      id: 6,
      title: 'HealthSync',
      category: 'Healthcare',
      description: 'Patient management and telehealth solution',
      fullDescription: 'HIPAA-compliant healthcare platform featuring patient management, telehealth consultations, and integrated electronic health records.',
      tech: ['React', 'Node.js', 'WebRTC', 'PostgreSQL', 'Socket.io', 'AWS'],
      image: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '⚕️' },
      imageUrl: '',
      demo: 'https://healthsync-demo.example.com',
      repo: 'https://github.com/username/healthsync',
      featured: false,
      views: 634,
      deployedDate: '2023-08-20',
      status: 'Active'
    }
  ],

  // Skills with categories
  skills: {
    'Frontend': ['JavaScript/ES6+', 'React', 'Vue.js', 'Angular', 'TypeScript', 'CSS3', 'HTML5', 'Webpack'],
    'Backend': ['Node.js', 'Python', 'Django', 'FastAPI', 'Express.js', 'PostgreSQL', 'MongoDB', 'Redis'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Git', 'GitHub Actions', 'Linux'],
    'Tools': ['VS Code', 'Figma', 'Postman', 'Jira', 'Jenkins', 'DataDog']
  },

  // Timeline - Experience & Education
  timeline: [
    {
      id: 1,
      date: '2023 - Present',
      title: 'Lead Creative Developer',
      company: 'Innovation Labs',
      type: 'work',
      description: 'Leading a team of 12 developers in creating cutting-edge digital experiences. Managed $2M+ projects.'
    },
    {
      id: 2,
      date: '2020 - 2023',
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      type: 'work',
      description: 'Architected and developed enterprise applications for Fortune 500 clients. Increased system performance by 40%.'
    },
    {
      id: 3,
      date: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'Creative Agency Co.',
      type: 'work',
      description: 'Built award-winning websites and interactive experiences for major brands. Won 3 industry awards.'
    },
    {
      id: 4,
      date: '2018',
      title: 'BSc Computer Science',
      company: 'Stanford University',
      type: 'education',
      description: 'Graduated with honors, GPA 3.9. Specialized in Human-Computer Interaction and Web Technologies.'
    }
  ],

  // Achievements
  achievements: [
    {
      id: 1,
      title: 'Innovation Award 2024',
      organization: 'Tech Excellence Awards',
      description: 'Recognized for outstanding innovation in web technologies',
      date: '2024-03-15',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Developer of the Year',
      organization: 'Creative Developers Association',
      description: 'Selected as top creative developer for 2023',
      date: '2023-12-10',
      icon: '⭐'
    },
    {
      id: 3,
      title: 'Best UI/UX Implementation',
      organization: 'Web Design Summit 2023',
      description: 'Won for Nexus Platform UI/UX design',
      date: '2023-11-05',
      icon: '🎨'
    },
    {
      id: 4,
      title: 'Open Source Contributor',
      organization: 'GitHub Community',
      description: '1000+ contributions to open source projects',
      date: '2023-10-20',
      icon: '💻'
    },
    {
      id: 5,
      title: 'Speaker at Tech Conf 2023',
      organization: 'International Tech Conference',
      description: 'Spoke about modern web development practices',
      date: '2023-09-15',
      icon: '🎤'
    },
    {
      id: 6,
      title: 'Mentor Award',
      organization: 'Code Academy',
      description: 'Recognized for mentoring 50+ junior developers',
      date: '2023-08-20',
      icon: '👨‍🏫'
    }
  ],

  // Certificates
  certificates: [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024-01-20',
      credentialId: 'AWS-SAA-2024-001',
      credentialUrl: 'https://aws.amazon.com/verify',
      icon: '☁️',
      imageUrl: ''
    },
    {
      id: 2,
      title: 'Kubernetes Application Developer',
      issuer: 'Cloud Native Computing Foundation',
      date: '2023-11-15',
      credentialId: 'CKAD-2023-001',
      credentialUrl: 'https://cncf.io/verify',
      icon: '⚙️',
      imageUrl: ''
    },
    {
      id: 3,
      title: 'React Advanced Patterns',
      issuer: 'Frontend Masters',
      date: '2023-10-10',
      credentialId: 'FM-REACT-2023-001',
      credentialUrl: 'https://frontendmasters.com/verify',
      icon: '⚛️',
      imageUrl: ''
    },
    {
      id: 4,
      title: 'Node.js Expert Developer',
      issuer: 'NodeJS Academy',
      date: '2023-09-05',
      credentialId: 'NODE-EXPERT-2023-001',
      credentialUrl: 'https://nodejs.org/verify',
      icon: '🚀',
      imageUrl: ''
    },
    {
      id: 5,
      title: 'Machine Learning Specialization',
      issuer: 'Coursera & Stanford',
      date: '2023-08-20',
      credentialId: 'ML-SPEC-2023-001',
      credentialUrl: 'https://coursera.org/verify',
      icon: '🤖',
      imageUrl: ''
    },
    {
      id: 6,
      title: 'Web Security Expert',
      issuer: 'CompTIA',
      date: '2023-07-15',
      credentialId: 'SECURITY-2023-001',
      credentialUrl: 'https://comptia.org/verify',
      icon: '🔐',
      imageUrl: ''
    }
  ],

  // About Section
  about: {
    heading: 'About Me',
    text: "I'm a passionate creative developer with 8+ years of experience crafting digital experiences that bridge the gap between design and technology. My journey began with a fascination for human-computer interaction, which led me to specialize in creating intuitive, engaging, and accessible web applications. When I'm not coding, you'll find me exploring new design trends, contributing to open-source projects, or mentoring junior developers.",
    location: 'San Francisco, CA',
    email: 'marcus.chen@example.com',
    experience: '8+ Years',
    status: 'Available',
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    twitter: 'https://twitter.com/username'
  },

  // Hero Section
  hero: {
    label: 'Available for projects',
    title: ['Creative', 'Developer', '& Designer'],
    description: 'I craft immersive digital experiences that blend cutting-edge technology with thoughtful design. Specializing in interactive web applications and creative development.',
    cta: { primary: 'View My Work →', secondary: 'Get In Touch' },
    stats: [
      { value: 50, label: 'Projects Completed' },
      { value: 8, label: 'Years Experience' },
      { value: 35, label: 'Happy Clients' }
    ]
  },

  // Contact Section
  contact: {
    title: 'Let\'s Work Together',
    description: 'Have a project in mind? Let\'s create something amazing together.',
    email: 'marcus.chen@example.com',
    phone: '+1 (555) 123-4567',
    cards: [
      { icon: '📧', label: 'Email', value: 'marcus.chen@example.com', link: 'mailto:marcus.chen@example.com' },
      { icon: '📍', label: 'Location', value: 'San Francisco, CA', link: '#' },
      { icon: '📱', label: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
      { icon: '💼', label: 'LinkedIn', value: 'Marcus Chen', link: 'https://linkedin.com/in/username' }
    ]
  },

  // Settings
  settings: {
    showHero: true,
    showProjects: true,
    showAbout: true,
    showAchievements: true,
    showContact: true,
    showFooter: true,
    siteName: 'Marcus Chen Portfolio',
    siteDescription: 'Creative Developer & Designer'
  },

  // Filter & UI State
  activeFilter: 'all',
  isLoggedIn: false
};

// State Management
let currentTheme = localStorage.getItem('theme') || 'dark';
let editingItem = null;
let currentAdminView = 'projects';
let isLoggedIn = false;
let currentFilter = 'All';

// DOM Elements
const themeBtn = document.getElementById('theme-btn');
const modalClose = document.getElementById('modal-close');
const projectModal = document.getElementById('project-modal');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const adminBtn = document.getElementById('admin-btn');
const loginModal = document.getElementById('login-modal');
const loginCancel = document.getElementById('login-cancel');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const adminLogout = document.getElementById('admin-logout');
const adminPanel = document.getElementById('admin-panel');
const adminMain = document.getElementById('admin-main');
const adminFormModal = document.getElementById('admin-form-modal');
const adminFormCancel = document.getElementById('admin-form-cancel');
const adminFormSave = document.getElementById('admin-form-save');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  try {
    document.body.setAttribute('data-theme', currentTheme);
    themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    // Mobile toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', () => {
        document.getElementById('nav').classList.toggle('mobile-open');
      });
    }
    
    // Nav link smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          document.getElementById('nav').classList.remove('mobile-open');
        }
      });
    });
    
    // Profile image upload input
    const profileUpload = document.createElement('input');
    profileUpload.type = 'file';
    profileUpload.id = 'profile-image-input';
    profileUpload.accept = 'image/*';
    profileUpload.style.display = 'none';
    profileUpload.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        uploadProfileImage(e.target.files[0]);
        e.target.value = '';
      }
    });
    document.body.appendChild(profileUpload);

    // Make profile image clickable to upload
    document.addEventListener('click', (e) => {
      if (e.target && (e.target.classList.contains('hero-image') || e.target.classList.contains('profile-img'))) {
        profileUpload.click();
      }
    });

    // Render content
    setTimeout(() => {
      try {
        renderFilters();
        renderProjects();
        renderSkills();
        renderTimeline();
        renderAchievements();
        renderCertificates();
        renderAbout();
        renderHero();
        renderContact();
        updateSectionVisibility();
        initScrollEffects();
        initCountAnimation();
        
        // Hide loader last
        const loader = document.getElementById('loader');
        if (loader) {
          loader.classList.add('hidden');
        }
      } catch (e) {
        console.error('Error rendering content:', e);
        const loader = document.getElementById('loader');
        if (loader) {
          loader.classList.add('hidden');
        }
      }
    }, 800);
  } catch (e) {
    console.error('Initialization error:', e);
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
    }
  }
});

// Scroll Effects
function initScrollEffects() {
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Counter Animation
function initCountAnimation() {
  const counters = document.querySelectorAll('.stat-value');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        let count = 0;
        const increment = target / 40;
        const update = () => {
          count += increment;
          if (count < target) {
            entry.target.textContent = Math.ceil(count) + '+';
            requestAnimationFrame(update);
          } else {
            entry.target.textContent = target + '+';
          }
        };
        update();
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => observer.observe(counter));
}

// Render Filters
function renderFilters() {
  const categories = ['All', ...new Set(store.projects.map(p => p.category))];
  document.getElementById('filters').innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === currentFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.cat;
      renderFilters();
      renderProjects();
    });
  });
}

// Render Projects
function renderProjects() {
  const filtered = currentFilter === 'All' ? store.projects : store.projects.filter(p => p.category === currentFilter);
  document.getElementById('projects-grid').innerHTML = filtered.map(p => `
    <div class="project-card ${p.featured ? 'featured' : ''} fade-in" data-id="${p.id}">
      <div class="project-thumbnail">
        <div class="project-image" style="background: ${p.image.bg}">
          ${p.imageUrl ? `<img src="${p.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : p.image.emoji}
        </div>
        <div class="project-overlay">
          <div class="project-quick-actions">
            <a href="${p.demo}" class="quick-action" target="_blank">Live Demo</a>
            <a href="${p.repo}" class="quick-action" target="_blank">Code</a>
          </div>
        </div>
      </div>
      <div class="project-info">
        <span class="project-category">${p.category}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tech">
          ${p.tech.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
          ${p.tech.length > 3 ? `<span class="tech-tag">+${p.tech.length - 3}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.quick-action')) {
        const project = store.projects.find(p => p.id === parseInt(card.dataset.id));
        openProjectModal(project);
      }
    });
  });

  initScrollEffects();
}

// Open Project Modal
function openProjectModal(project) {
  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-image').style.background = project.image.bg;
  document.getElementById('modal-image').textContent = project.image.emoji;
  document.getElementById('modal-desc').textContent = project.fullDescription;
  document.getElementById('modal-tech').innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
  document.getElementById('modal-demo').href = project.demo;
  document.getElementById('modal-repo').href = project.repo;
  projectModal.classList.add('active');
}

// Render Skills
function renderSkills() {
  const allSkills = Object.values(store.skills).flat();
  document.getElementById('skills-grid').innerHTML = allSkills.map(s => `
    <span class="skill-pill">${s}</span>
  `).join('');
}

// Render Timeline
function renderTimeline() {
  document.getElementById('timeline').innerHTML = store.timeline.map((item, i) => `
    <div class="timeline-item ${item.type}">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-company">${item.company}</div>
        <div class="timeline-desc">${item.description}</div>
      </div>
    </div>
  `).join('');
}

// Render Achievements
function renderAchievements() {
  document.getElementById('achievements-list').innerHTML = `
    <div class="achievements-grid">
      ${store.achievements.map(achievement => `
        <div class="achievement-card">
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-content">
            <h4>${achievement.title}</h4>
            <p class="achievement-org">${achievement.organization}</p>
            <p class="achievement-desc">${achievement.description}</p>
            <p class="achievement-date">${new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Render Certificates
function renderCertificates() {
  document.getElementById('certificates-list').innerHTML = `
    <div class="certificates-grid">
      <h3 style="grid-column: 1/-1; margin-bottom: 20px;">Professional Certifications</h3>
      ${store.certificates.map(cert => `
        <div class="certificate-card">
          ${cert.imageUrl ? `<div style="width: 100%; height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md) var(--radius-md) 0 0; overflow: hidden;"><img src="${cert.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;"></div>` : ''}
          <div class="cert-content">
            <div class="cert-icon">${cert.icon}</div>
            <h4>${cert.title}</h4>
            <p class="cert-issuer">${cert.issuer}</p>
            <p class="cert-id">ID: ${cert.credentialId}</p>
            <p class="cert-date">${new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</p>
            <a href="${cert.credentialUrl}" target="_blank" class="cert-link">View Credential →</a>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Render About
function renderAbout() {
  document.getElementById('about-text').textContent = store.about.text;
  document.getElementById('info-location').textContent = store.about.location;
  document.getElementById('info-email').textContent = store.about.email;
  document.getElementById('info-experience').textContent = store.about.experience;
  document.getElementById('info-status').textContent = store.about.status;
}

// Render Hero
function renderHero() {
  const hero = store.hero;
  document.querySelector('.hero-label').textContent = hero.label;
  document.querySelector('.hero-title').innerHTML = hero.title.map(t => `<span class="line"><span class="word">${t}</span></span>`).join('');
  document.querySelector('.hero-desc').textContent = hero.description;
  document.querySelector('.hero-cta').innerHTML = `
    <a href="#projects" class="btn btn-primary">${hero.cta.primary}</a>
    <a href="#contact" class="btn btn-secondary">${hero.cta.secondary}</a>
  `;
  
  // Update profile image
  const profileImg = document.getElementById('profile-image');
  if (profileImg) {
    if (store.personal.profileImage && store.personal.profileImage !== '') {
      profileImg.innerHTML = `<img src="${store.personal.profileImage}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    } else {
      profileImg.textContent = '👨‍💻';
    }
  }
  
  document.getElementById('download-cv').href = '#'; // Add your CV download link
}

// Render Contact
function renderContact() {
  const contact = store.contact;
  document.querySelector('#contact .section-title').textContent = contact.title;
  document.querySelector('#contact .section-desc').textContent = contact.description;
  
  const contactCardsHtml = contact.cards.map(card => `
    <div class="contact-card">
      <div class="contact-icon">${card.icon}</div>
      <div>
        <div class="contact-label">${card.label}</div>
        <div class="contact-value">${card.value}</div>
      </div>
    </div>
  `).join('');
  
  const existing = document.querySelector('.contact-cards');
  if (existing) existing.innerHTML = contactCardsHtml;
}

// Update Section Visibility
function updateSectionVisibility() {
  const settings = store.settings;
  if (!settings.showHero) document.getElementById('hero').style.display = 'none';
  if (!settings.showProjects) document.getElementById('projects').style.display = 'none';
  if (!settings.showAbout) document.getElementById('about').style.display = 'none';
  if (!settings.showAchievements) document.getElementById('achievements').style.display = 'none';
  if (!settings.showContact) document.getElementById('contact').style.display = 'none';
  if (!settings.showFooter) document.querySelector('footer').style.display = 'none';
}

// ==================== THEME TOGGLE ====================
themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  themeBtn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
});

// ==================== MODALS ====================
modalClose.addEventListener('click', () => projectModal.classList.remove('active'));
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) projectModal.classList.remove('active');
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.classList.add('show');
  contactForm.reset();
  setTimeout(() => formSuccess.classList.remove('show'), 5000);
});

// ==================== ADMIN PANEL ====================
adminBtn.addEventListener('click', () => {
  if (isLoggedIn) {
    adminPanel.classList.add('active');
    renderAdminView();
  } else {
    loginModal.classList.add('active');
  }
});

loginCancel.addEventListener('click', () => loginModal.classList.remove('active'));

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('login-user').value;
  const password = document.getElementById('login-pass').value;
  
  if (username === 'admin' && password === 'admin123') {
    isLoggedIn = true;
    loginModal.classList.remove('active');
    adminPanel.classList.add('active');
    renderAdminView();
  } else {
    loginError.style.display = 'block';
    setTimeout(() => { loginError.style.display = 'none'; }, 3000);
  }
});

adminLogout.addEventListener('click', () => {
  isLoggedIn = false;
  adminPanel.classList.remove('active');
});

// Admin Navigation
document.getElementById('admin-panel').addEventListener('click', (e) => {
  if (e.target.classList.contains('admin-nav-btn') && e.target.dataset.view) {
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentAdminView = e.target.dataset.view;
    renderAdminView();
  }
});

function renderAdminView() {
  const adminTitle = document.querySelector('#admin-title');
  switch (currentAdminView) {
    case 'projects': adminTitle.textContent = 'Manage Projects'; renderAdminProjects(); break;
    case 'skills': adminTitle.textContent = 'Manage Skills'; renderAdminSkills(); break;
    case 'timeline': adminTitle.textContent = 'Manage Timeline'; renderAdminTimeline(); break;
    case 'achievements': adminTitle.textContent = 'Manage Achievements'; renderAdminAchievements(); break;
    case 'certificates': adminTitle.textContent = 'Manage Certificates'; renderAdminCertificates(); break;
    case 'uploads': adminTitle.textContent = 'Upload Media'; renderAdminUploads(); break;
    case 'about': adminTitle.textContent = 'Manage About'; renderAdminAbout(); break;
    case 'hero': adminTitle.textContent = 'Manage Hero'; renderAdminHero(); break;
    case 'contact': adminTitle.textContent = 'Manage Contact'; renderAdminContact(); break;
    case 'settings': adminTitle.textContent = 'Site Settings'; renderAdminSettings(); break;
  }
}

// Admin Projects
function renderAdminProjects() {
  document.getElementById('admin-content').innerHTML = `
    <div style="overflow-x: auto;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Tech</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${store.projects.map(p => `
            <tr>
              <td>${p.title}</td>
              <td><span class="badge">${p.category}</span></td>
              <td>${p.tech.slice(0, 2).join(', ')}</td>
              <td><span class="badge success">${p.status}</span></td>
              <td>
                <button class="table-btn edit" data-id="${p.id}">✏️</button>
                <button class="table-btn delete" data-id="${p.id}">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  attachAdminProjectListeners();
}

// Admin Skills
function renderAdminSkills() {
  const allSkills = Object.entries(store.skills);
  document.getElementById('admin-content').innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
      ${allSkills.map(([category, skills]) => `
        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-lg); border: 1px solid var(--border);">
          <h4 style="margin-bottom: 15px;">${category}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 15px;">
            ${skills.map(skill => `<span class="skill-pill" style="cursor: default;">${skill}</span>`).join('')}
          </div>
          <input type="text" class="form-input" placeholder="Add new skill" id="skill-${category}">
          <button class="btn btn-primary" style="margin-top: 10px; width: 100%;" onclick="addSkill('${category}')">Add</button>
        </div>
      `).join('')}
    </div>
  `;
}

function addSkill(category) {
  const input = document.getElementById(`skill-${category}`);
  if (input.value.trim()) {
    if (!store.skills[category]) store.skills[category] = [];
    store.skills[category].push(input.value.trim());
    renderAdminSkills();
    renderSkills();
  }
}

// Admin Timeline
function renderAdminTimeline() {
  document.getElementById('admin-content').innerHTML = `
    <div style="overflow-x: auto;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Company</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${store.timeline.map(t => `
            <tr>
              <td>${t.date}</td>
              <td>${t.title}</td>
              <td>${t.company}</td>
              <td><span class="badge">${t.type}</span></td>
              <td>
                <button class="table-btn edit" data-id="${t.id}">✏️</button>
                <button class="table-btn delete" data-id="${t.id}">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  attachAdminTimelineListeners();
}

// Admin Achievements
function renderAdminAchievements() {
  document.getElementById('admin-content').innerHTML = `
    <div style="display: grid; gap: 20px;">
      ${store.achievements.map(a => `
        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-lg); border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4>${a.title}</h4>
            <p style="color: var(--text-secondary); margin: 5px 0;">${a.organization}</p>
            <p style="color: var(--text-muted); font-size: 12px;">${a.date}</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="table-btn edit" data-id="${a.id}">✏️</button>
            <button class="table-btn delete" data-id="${a.id}">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  attachAdminAchievementListeners();
}

// Admin Certificates
function renderAdminCertificates() {
  document.getElementById('admin-content').innerHTML = `
    <div style="display: grid; gap: 20px;">
      ${store.certificates.map(c => `
        <div style="background: var(--bg-card); padding: 20px; border-radius: var(--radius-lg); border: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4>${c.title}</h4>
            <p style="color: var(--text-secondary); margin: 5px 0;">${c.issuer}</p>
            <p style="color: var(--text-muted); font-size: 12px;">ID: ${c.credentialId}</p>
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="table-btn edit" data-id="${c.id}">✏️</button>
            <button class="table-btn delete" data-id="${c.id}">🗑️</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  attachAdminCertificateListeners();
}

// Admin About
function renderAdminAbout() {
  document.getElementById('admin-content').innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
      <form id="about-form">
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Bio Text</label>
          <textarea class="form-textarea" id="af-text" style="min-height: 200px;">${store.about.text}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div class="form-group">
            <label class="form-label">Location</label>
            <input type="text" class="form-input" id="af-location" value="${store.about.location}">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" id="af-email" value="${store.about.email}">
          </div>
          <div class="form-group">
            <label class="form-label">Experience</label>
            <input type="text" class="form-input" id="af-exp" value="${store.about.experience}">
          </div>
          <div class="form-group">
            <label class="form-label">Status</label>
            <input type="text" class="form-input" id="af-status" value="${store.about.status}">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  `;

  document.getElementById('about-form').addEventListener('submit', (e) => {
    e.preventDefault();
    store.about.text = document.getElementById('af-text').value;
    store.about.location = document.getElementById('af-location').value;
    store.about.email = document.getElementById('af-email').value;
    store.about.experience = document.getElementById('af-exp').value;
    store.about.status = document.getElementById('af-status').value;
    renderAbout();
    alert('About info updated!');
  });
}

// Admin Hero
function renderAdminHero() {
  const hero = store.hero;
  document.getElementById('admin-content').innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
      <form id="hero-form">
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Label</label>
          <input type="text" class="form-input" id="hf-label" value="${hero.label}">
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Title Lines (one per line)</label>
          <textarea class="form-textarea" id="hf-title" style="min-height: 100px;">${hero.title.join('\n')}</textarea>
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Description</label>
          <textarea class="form-textarea" id="hf-desc" style="min-height: 120px;">${hero.description}</textarea>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
          <div class="form-group">
            <label class="form-label">Primary CTA</label>
            <input type="text" class="form-input" id="hf-cta-primary" value="${hero.cta.primary}">
          </div>
          <div class="form-group">
            <label class="form-label">Secondary CTA</label>
            <input type="text" class="form-input" id="hf-cta-secondary" value="${hero.cta.secondary}">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  `;

  document.getElementById('hero-form').addEventListener('submit', (e) => {
    e.preventDefault();
    store.hero.label = document.getElementById('hf-label').value;
    store.hero.title = document.getElementById('hf-title').value.split('\n').filter(l => l.trim());
    store.hero.description = document.getElementById('hf-desc').value;
    store.hero.cta.primary = document.getElementById('hf-cta-primary').value;
    store.hero.cta.secondary = document.getElementById('hf-cta-secondary').value;
    renderHero();
    alert('Hero section updated!');
  });
}

// Admin Contact
function renderAdminContact() {
  document.getElementById('admin-content').innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
      <form id="contact-admin-form">
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="cf-email" value="${store.contact.email}">
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" id="cf-phone" value="${store.contact.cards.find(c => c.label === 'Phone')?.value || ''}">
        </div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  `;

  document.getElementById('contact-admin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    store.contact.email = document.getElementById('cf-email').value;
    const phoneCard = store.contact.cards.find(c => c.label === 'Phone');
    if (phoneCard) phoneCard.value = document.getElementById('cf-phone').value;
    renderContact();
    alert('Contact info updated!');
  });
}

// Admin Settings
function renderAdminSettings() {
  const settings = store.settings;
  document.getElementById('admin-content').innerHTML = `
    <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
      <form id="settings-form">
        <div style="margin-bottom: 20px;">
          <label class="form-label" style="display: block; margin-bottom: 16px;">Visible Sections</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-hero" ${settings.showHero ? 'checked' : ''}>
              <span>Hero Section</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-projects" ${settings.showProjects ? 'checked' : ''}>
              <span>Projects Section</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-about" ${settings.showAbout ? 'checked' : ''}>
              <span>About Section</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-achievements" ${settings.showAchievements ? 'checked' : ''}>
              <span>Achievements Section</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-contact" ${settings.showContact ? 'checked' : ''}>
              <span>Contact Section</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="show-footer" ${settings.showFooter ? 'checked' : ''}>
              <span>Footer</span>
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save Settings</button>
      </form>
    </div>
  `;

  document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    store.settings.showHero = document.getElementById('show-hero').checked;
    store.settings.showProjects = document.getElementById('show-projects').checked;
    store.settings.showAbout = document.getElementById('show-about').checked;
    store.settings.showAchievements = document.getElementById('show-achievements').checked;
    store.settings.showContact = document.getElementById('show-contact').checked;
    store.settings.showFooter = document.getElementById('show-footer').checked;
    updateSectionVisibility();
    alert('Settings updated!');
  });
}

// Admin Uploads - Image Management
function renderAdminUploads() {
  const profileRemoveBtn = store.personal.profileImage ? `<button class="btn btn-secondary" onclick="store.personal.profileImage = ''; renderAdminUploads(); renderHero();" style="margin-left: 8px;">Remove</button>` : '';
  const projectsHTML = store.projects.map(p => {
    const removeBtn = p.imageUrl ? `<button class="btn btn-secondary btn-sm" onclick="store.projects.find(x=>x.id===${p.id}).imageUrl=''; renderAdminUploads(); renderProjects();" style="width: 100%; padding: 8px; margin-top: 8px;">Remove</button>` : '';
    return `
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
        <div style="width: 100%; height: 150px; background: linear-gradient(135deg, ${p.image.bg}); display: flex; align-items: center; justify-content: center; font-size: 50px;">
          ${p.imageUrl ? `<img src="${p.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : p.image.emoji}
        </div>
        <div style="padding: 16px;">
          <p style="font-weight: 500; margin-bottom: 12px;">${p.title}</p>
          <input type="file" id="project-img-${p.id}" accept="image/*" style="display: none;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('project-img-${p.id}').click();" style="width: 100%; padding: 8px;">Upload</button>
          ${removeBtn}
        </div>
      </div>
    `;
  }).join('');
  
  const certificatesHTML = store.certificates.map(c => {
    const removeBtn = c.imageUrl ? `<button class="btn btn-secondary btn-sm" onclick="store.certificates.find(x=>x.id===${c.id}).imageUrl=''; renderAdminUploads(); renderCertificates();" style="width: 100%; padding: 8px; margin-top: 8px;">Remove</button>` : '';
    return `
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
        <div style="width: 100%; height: 150px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 50px;">
          ${c.imageUrl ? `<img src="${c.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : c.icon}
        </div>
        <div style="padding: 16px;">
          <p style="font-weight: 500; margin-bottom: 12px;">${c.title}</p>
          <input type="file" id="cert-img-${c.id}" accept="image/*" style="display: none;">
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('cert-img-${c.id}').click();" style="width: 100%; padding: 8px;">Upload</button>
          ${removeBtn}
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('admin-content').innerHTML = `
    <div style="display: grid; gap: 30px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="margin-bottom: 16px;">Profile Image</h3>
        <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px; align-items: start;">
          <div style="width: 200px; height: 200px; background: var(--bg-tertiary); border-radius: var(--radius-lg); overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 80px;">
            ${store.personal.profileImage ? `<img src="${store.personal.profileImage}" style="width: 100%; height: 100%; object-fit: cover;">` : '👨‍💻'}
          </div>
          <div>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">Upload a profile picture to display in the hero section.</p>
            <input type="file" id="profile-img-upload" accept="image/*" style="display: none;">
            <button class="btn btn-primary" onclick="document.getElementById('profile-img-upload').click();">Upload Profile Image</button>
            ${profileRemoveBtn}
          </div>
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="margin-bottom: 16px;">Project Images</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
          ${projectsHTML}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
        <h3 style="margin-bottom: 16px;">Certificate Images</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
          ${certificatesHTML}
        </div>
      </div>
    </div>
  `;
  
  // Attach upload listeners
  document.getElementById('profile-img-upload').addEventListener('change', (e) => {
    if (e.target.files[0]) {
      uploadProfileImage(e.target.files[0]);
      setTimeout(() => renderAdminUploads(), 500);
    }
  });

  store.projects.forEach(p => {
    const input = document.getElementById(`project-img-${p.id}`);
    if (input) {
      input.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          uploadProjectImage(p.id, e.target.files[0]);
          setTimeout(() => { renderAdminUploads(); renderProjects(); }, 500);
        }
      });
    }
  });

  store.certificates.forEach(c => {
    const input = document.getElementById(`cert-img-${c.id}`);
    if (input) {
      input.addEventListener('change', (e) => {
        if (e.target.files[0]) {
          uploadCertificateImage(c.id, e.target.files[0]);
          setTimeout(() => { renderAdminUploads(); renderCertificates(); }, 500);
        }
      });
    }
  });
}

// Admin Event Listeners
function attachAdminProjectListeners() {
  document.getElementById('admin-content').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('Delete this project?')) {
        store.projects = store.projects.filter(p => p.id !== id);
        renderAdminProjects();
        renderProjects();
      }
    } else if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const project = store.projects.find(p => p.id === id);
      if (project) {
        document.getElementById('admin-content').innerHTML = `
          <form id="project-edit-form" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="margin-bottom: 20px;">Edit Project: ${project.title}</h3>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="pe-title" value="${project.title}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" id="pe-desc">${project.description}</textarea>
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Category</label>
              <input type="text" class="form-input" id="pe-category" value="${project.category}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Status</label>
              <input type="text" class="form-input" id="pe-status" value="${project.status}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Demo URL</label>
              <input type="text" class="form-input" id="pe-demo" value="${project.demo}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Repository URL</label>
              <input type="text" class="form-input" id="pe-repo" value="${project.repo}">
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" onclick="attachAdminProjectListeners(); renderAdminProjects();">Cancel</button>
            </div>
          </form>
        `;
        document.getElementById('project-edit-form').addEventListener('submit', (e) => {
          e.preventDefault();
          project.title = document.getElementById('pe-title').value;
          project.description = document.getElementById('pe-desc').value;
          project.category = document.getElementById('pe-category').value;
          project.status = document.getElementById('pe-status').value;
          project.demo = document.getElementById('pe-demo').value;
          project.repo = document.getElementById('pe-repo').value;
          renderAdminProjects();
          renderProjects();
          alert('Project updated!');
        });
      }
    }
  });
}

function attachAdminTimelineListeners() {
  document.getElementById('admin-content').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('Delete this entry?')) {
        store.timeline = store.timeline.filter(t => t.id !== id);
        renderAdminTimeline();
        renderTimeline();
      }
    } else if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const item = store.timeline.find(t => t.id === id);
      if (item) {
        document.getElementById('admin-content').innerHTML = `
          <form id="timeline-edit-form" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="margin-bottom: 20px;">Edit: ${item.title}</h3>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="te-title" value="${item.title}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Company/School</label>
              <input type="text" class="form-input" id="te-company" value="${item.company}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Date</label>
              <input type="text" class="form-input" id="te-date" value="${item.date}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Type</label>
              <select class="form-input" id="te-type">
                <option value="work" ${item.type === 'work' ? 'selected' : ''}>Work</option>
                <option value="education" ${item.type === 'education' ? 'selected' : ''}>Education</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" id="te-desc">${item.description || ''}</textarea>
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" onclick="attachAdminTimelineListeners(); renderAdminTimeline();">Cancel</button>
            </div>
          </form>
        `;
        document.getElementById('timeline-edit-form').addEventListener('submit', (e) => {
          e.preventDefault();
          item.title = document.getElementById('te-title').value;
          item.company = document.getElementById('te-company').value;
          item.date = document.getElementById('te-date').value;
          item.type = document.getElementById('te-type').value;
          item.description = document.getElementById('te-desc').value;
          renderAdminTimeline();
          renderTimeline();
          alert('Timeline entry updated!');
        });
      }
    }
  });
}

function attachAdminAchievementListeners() {
  document.getElementById('admin-content').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('Delete this achievement?')) {
        store.achievements = store.achievements.filter(a => a.id !== id);
        renderAdminAchievements();
        renderAchievements();
      }
    } else if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const achievement = store.achievements.find(a => a.id === id);
      if (achievement) {
        document.getElementById('admin-content').innerHTML = `
          <form id="achievement-edit-form" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="margin-bottom: 20px;">Edit: ${achievement.title}</h3>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="ae-title" value="${achievement.title}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Organization</label>
              <input type="text" class="form-input" id="ae-org" value="${achievement.organization}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Date</label>
              <input type="text" class="form-input" id="ae-date" value="${achievement.date}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Description</label>
              <textarea class="form-textarea" id="ae-desc">${achievement.description || ''}</textarea>
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" onclick="attachAdminAchievementListeners(); renderAdminAchievements();">Cancel</button>
            </div>
          </form>
        `;
        document.getElementById('achievement-edit-form').addEventListener('submit', (e) => {
          e.preventDefault();
          achievement.title = document.getElementById('ae-title').value;
          achievement.organization = document.getElementById('ae-org').value;
          achievement.date = document.getElementById('ae-date').value;
          achievement.description = document.getElementById('ae-desc').value;
          renderAdminAchievements();
          renderAchievements();
          alert('Achievement updated!');
        });
      }
    }
  });
}

function attachAdminCertificateListeners() {
  document.getElementById('admin-content').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      const id = parseInt(e.target.dataset.id);
      if (confirm('Delete this certificate?')) {
        store.certificates = store.certificates.filter(c => c.id !== id);
        renderAdminCertificates();
        renderCertificates();
      }
    } else if (e.target.classList.contains('edit')) {
      const id = parseInt(e.target.dataset.id);
      const cert = store.certificates.find(c => c.id === id);
      if (cert) {
        document.getElementById('admin-content').innerHTML = `
          <form id="cert-edit-form" style="background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 24px;">
            <h3 style="margin-bottom: 20px;">Edit: ${cert.title}</h3>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Title</label>
              <input type="text" class="form-input" id="ce-title" value="${cert.title}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Issuer</label>
              <input type="text" class="form-input" id="ce-issuer" value="${cert.issuer}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Credential ID</label>
              <input type="text" class="form-input" id="ce-id" value="${cert.credentialId}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Date Issued</label>
              <input type="text" class="form-input" id="ce-date" value="${cert.dateIssued}">
            </div>
            <div class="form-group" style="margin-bottom: 20px;">
              <label class="form-label">Credential URL</label>
              <input type="text" class="form-input" id="ce-url" value="${cert.credentialUrl}">
            </div>
            <div style="display: flex; gap: 10px;">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" onclick="attachAdminCertificateListeners(); renderAdminCertificates();">Cancel</button>
            </div>
          </form>
        `;
        document.getElementById('cert-edit-form').addEventListener('submit', (e) => {
          e.preventDefault();
          cert.title = document.getElementById('ce-title').value;
          cert.issuer = document.getElementById('ce-issuer').value;
          cert.credentialId = document.getElementById('ce-id').value;
          cert.dateIssued = document.getElementById('ce-date').value;
          cert.credentialUrl = document.getElementById('ce-url').value;
          renderAdminCertificates();
          renderCertificates();
          alert('Certificate updated!');
        });
      }
    }
  });
}

// ===================== IMAGE UPLOAD FUNCTIONS =====================

function uploadProfileImage(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    store.personal.profileImage = e.target.result;
    renderHero();
    alert('Profile image updated!');
  };
  reader.readAsDataURL(file);
}

function uploadProjectImage(projectId, file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const project = store.projects.find(p => p.id === projectId);
    if (project) {
      project.imageUrl = e.target.result;
      renderProjects();
      alert('Project image updated!');
    }
  };
  reader.readAsDataURL(file);
}

function uploadCertificateImage(certId, file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const cert = store.certificates.find(c => c.id === certId);
    if (cert) {
      cert.imageUrl = e.target.result;
      renderCertificates();
      alert('Certificate image updated!');
    }
  };
  reader.readAsDataURL(file);
}

// Create hidden file inputs for image uploads
// (Integrated into main DOMContentLoaded event above)
