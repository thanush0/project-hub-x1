════════════════════════════════════════════════════════════════════════════════
PORTFOLIO CODE EXAMPLES & CUSTOMIZATION GUIDE
════════════════════════════════════════════════════════════════════════════════

This file provides ready-to-use code snippets for common customization tasks.

════════════════════════════════════════════════════════════════════════════════
1. PERSONALIZING YOUR PORTFOLIO
════════════════════════════════════════════════════════════════════════════════

STEP 1: Update Personal Information

In script.js, find and edit the store.personal object:

BEFORE:
```javascript
store.personal = {
  fullName: 'Marcus Chen',
  title: 'Creative Developer & Designer',
  bio: "I'm a passionate creative developer with 8+ years...",
  location: 'San Francisco, CA',
  email: 'marcus.chen@example.com',
  phone: '+1 (555) 123-4567',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  dribbble: 'https://dribbble.com'
};
```

AFTER (Your Information):
```javascript
store.personal = {
  fullName: 'Your Name',
  title: 'Your Title',
  bio: "Your biographical text here...",
  location: 'Your City, Country',
  email: 'your.email@example.com',
  phone: '+1 (555) 000-0000',
  github: 'https://github.com/yourname',
  linkedin: 'https://linkedin.com/in/yourname',
  twitter: 'https://twitter.com/yourname',
  dribbble: 'https://dribbble.com/yourname'
};
```

════════════════════════════════════════════════════════════════════════════════
2. ADDING NEW PROJECTS
════════════════════════════════════════════════════════════════════════════════

ADD A SINGLE PROJECT

```javascript
// In script.js, find store.projects array and add this:

store.projects.push({
  id: 7,
  title: 'My Awesome Project',
  category: 'Full Stack',
  description: 'Brief description of the project',
  fullDescription: 'Detailed description with more information about what the project does, technologies used, and key features.',
  tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
  image: {
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    emoji: '🎨'
  },
  demo: 'https://my-project-demo.com',
  repo: 'https://github.com/yourname/my-project',
  featured: true,
  views: 150,
  deployedDate: '2024-03-15',
  status: 'Active'
});
```

GRADIENT COLOR OPTIONS:
- Blue Purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
- Pink Red: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
- Cyan Blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
- Green Teal: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
- Pink Orange: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
- Orange Yellow: 'linear-gradient(135deg, #ffd89b 0%, #ff7e5f 100%)'
- Purple Pink: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'

EMOJI OPTIONS:
Frontend: 💻 🖥️ ⚛️ 🎨 🎭
Backend: 🚀 🔧 🗄️ ⚙️ 🔌
Mobile: 📱 📲 🎮 🕹️ 
Design: 🎨 🖌️ 🎭 ✨ 💎
Data: 📊 📈 📉 🗂️ 🔍
Cloud: ☁️ 🌐 🚀 🛰️ 🔐

ADD MULTIPLE PROJECTS:

```javascript
// Add an array of projects at once
const newProjects = [
  {
    id: 7,
    title: 'Project One',
    // ... project data
  },
  {
    id: 8,
    title: 'Project Two',
    // ... project data
  },
  {
    id: 9,
    title: 'Project Three',
    // ... project data
  }
];

// Add all to store
store.projects.push(...newProjects);
```

════════════════════════════════════════════════════════════════════════════════
3. ADDING ACHIEVEMENTS
════════════════════════════════════════════════════════════════════════════════

ADD A SINGLE ACHIEVEMENT:

```javascript
store.achievements.push({
  id: 7,
  title: 'Your Award Name',
  organization: 'Organization Name',
  description: 'Description of the award and what it recognizes',
  date: '2024-03-20',
  icon: '🏆'
});
```

ICON SUGGESTIONS:
Awards: 🏆 🥇 🥈 🥉 👑 ⭐ 🌟 ✨
Recognition: 👏 👍 💪 🎯 🎊 🎉 🎈
Achievement: 🚀 🔥 💯 ✅ 🎓 📚
Skills: 💡 🧠 🎯 ⚡ 🔑

ADD BATCH OF ACHIEVEMENTS:

```javascript
const myAchievements = [
  {
    id: 7,
    title: 'Innovation Excellence Award',
    organization: 'Tech Summit 2024',
    description: 'Recognized for innovative approach to problem-solving',
    date: '2024-03-15',
    icon: '🚀'
  },
  {
    id: 8,
    title: 'Best Developer',
    organization: 'Annual Company Awards',
    description: 'Selected as the best performing developer of the year',
    date: '2024-02-20',
    icon: '⭐'
  },
  {
    id: 9,
    title: 'Community Contributor',
    organization: 'Open Source Foundation',
    description: 'Top contributor to open source projects',
    date: '2024-01-10',
    icon: '💪'
  }
];

store.achievements.push(...myAchievements);
```

════════════════════════════════════════════════════════════════════════════════
4. ADDING CERTIFICATES
════════════════════════════════════════════════════════════════════════════════

ADD A SINGLE CERTIFICATE:

```javascript
store.certificates.push({
  id: 7,
  title: 'Your Certification Name',
  issuer: 'Certifying Organization',
  date: '2024-03-25',
  credentialId: 'CERT-2024-001',
  credentialUrl: 'https://verify.certorg.com/CERT-2024-001',
  icon: '📜'
});
```

CERTIFICATE ICON SUGGESTIONS:
Cloud: ☁️ AWS 🔐 Azure
Programming: ⚛️ React 🟢 Node.js 🐍 Python
Databases: 🗄️ PostgreSQL 🍃 MongoDB
DevOps: 🐳 Docker 🤖 Kubernetes
Platforms: 📜 CompTIA 🎓 Coursera 🎯 Udemy

REAL EXAMPLES:

AWS Certificate:
```javascript
{
  id: 7,
  title: 'AWS Certified Solutions Architect - Associate',
  issuer: 'Amazon Web Services',
  date: '2024-03-15',
  credentialId: 'SAA-2024-ABC123',
  credentialUrl: 'https://aws.amazon.com/verification',
  icon: '☁️'
}
```

Google Cloud Certificate:
```javascript
{
  id: 8,
  title: 'Google Cloud Associate Cloud Engineer',
  issuer: 'Google Cloud',
  date: '2024-02-20',
  credentialId: 'GCP-ACE-2024-XYZ789',
  credentialUrl: 'https://cloud.google.com/verify',
  icon: '☁️'
}
```

Microsoft Azure Certificate:
```javascript
{
  id: 9,
  title: 'Microsoft Certified: Azure Administrator',
  issuer: 'Microsoft',
  date: '2024-01-15',
  credentialId: 'AZ-104-2024-DEF456',
  credentialUrl: 'https://microsoft.com/verify',
  icon: '🔷'
}
```

ADD MULTIPLE CERTIFICATES:

```javascript
const myCertificates = [
  {
    id: 7,
    title: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024-03-15',
    credentialId: 'AWS-SAA-2024-001',
    credentialUrl: 'https://aws.amazon.com/verify',
    icon: '☁️'
  },
  {
    id: 8,
    title: 'Kubernetes Administrator',
    issuer: 'Linux Foundation',
    date: '2024-02-20',
    credentialId: 'CKA-2024-001',
    credentialUrl: 'https://cncf.io/verify',
    icon: '🐳'
  }
];

store.certificates.push(...myCertificates);
```

════════════════════════════════════════════════════════════════════════════════
5. ADDING SKILLS
════════════════════════════════════════════════════════════════════════════════

ADD SKILL TO EXISTING CATEGORY:

```javascript
// Add single skill
store.skills.Frontend.push('Next.js');
store.skills.Backend.push('GraphQL');
store.skills.DevOps.push('Terraform');

// Or use admin panel: Admin → Skills → Type skill → Add
```

ADD NEW SKILL CATEGORY:

```javascript
// Create new category
store.skills['Mobile'] = ['React Native', 'Flutter', 'Swift'];
store.skills['AI/ML'] = ['TensorFlow', 'PyTorch', 'Scikit-learn'];
store.skills['Databases'] = ['PostgreSQL', 'MongoDB', 'Redis'];
```

REPLACE ALL SKILLS:

```javascript
store.skills = {
  'Frontend': ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
  'Backend': ['Node.js', 'Express.js', 'Python', 'FastAPI'],
  'Databases': ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
  'DevOps': ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions'],
  'Mobile': ['React Native', 'Flutter'],
  'Other': ['GraphQL', 'REST API', 'WebSockets', 'Git']
};
```

════════════════════════════════════════════════════════════════════════════════
6. CHANGING COLORS & STYLING
════════════════════════════════════════════════════════════════════════════════

CHANGE ACCENT COLOR (Affects buttons, links, highlights):

In style.css, find:
```css
:root {
  --accent: #0066ff;  /* This is the default blue */
}
```

Change to your color:
```css
:root {
  --accent: #ff6b6b;  /* Coral red */
}
```

POPULAR COLOR CODES:
- Red: #ff6b6b or #e74c3c
- Orange: #ff9500 or #f39c12
- Green: #51cf66 or #27ae60
- Blue: #0066ff or #3498db
- Purple: #9775fa or #8e44ad
- Pink: #ff6b9d or #e84393
- Teal: #20c997 or #1abc9c
- Yellow: #ffd93d or #f1c40f

CHANGE MULTIPLE COLORS:

In style.css, update root variables:
```css
:root {
  /* Backgrounds */
  --bg-primary: #000000;      /* Main background */
  --bg-secondary: #111111;    /* Secondary background */
  --text-primary: #ffffff;    /* Main text */
  --accent: #00ff00;          /* Accent color */
  --border: rgba(255,255,255,0.1);  /* Border color */
}
```

CHANGE LIGHT THEME COLORS:

In style.css, find [data-theme="light"] and update:
```css
[data-theme="light"] {
  --bg-primary: #f5f5f5;      /* Light background */
  --bg-secondary: #ffffff;    /* White background */
  --text-primary: #222222;    /* Dark text */
  --border: rgba(0,0,0,0.1);  /* Dark border */
}
```

════════════════════════════════════════════════════════════════════════════════
7. UPDATING HERO SECTION
════════════════════════════════════════════════════════════════════════════════

CHANGE HERO TEXT:

In script.js, find store.hero:

```javascript
store.hero = {
  label: 'Your Status Badge',
  title: ['First Line', 'Second Line', 'Third Line'],
  description: 'Your hero description here...',
  cta: {
    primary: 'Primary Button Text →',
    secondary: 'Secondary Button Text'
  },
  stats: [
    { value: 100, label: 'Projects' },
    { value: 5, label: 'Years' },
    { value: 50, label: 'Clients' }
  ]
};
```

EXAMPLES:

Developer Hero:
```javascript
store.hero = {
  label: 'Full-Stack Developer',
  title: ['Building', 'Amazing', 'Products'],
  description: 'I create innovative web solutions with modern technologies',
  cta: {
    primary: 'View My Work →',
    secondary: 'Contact Me'
  },
  stats: [
    { value: 75, label: 'Projects Completed' },
    { value: 8, label: 'Years Experience' },
    { value: 50, label: 'Happy Clients' }
  ]
};
```

Designer Hero:
```javascript
store.hero = {
  label: 'Creative Designer',
  title: ['Designing', 'User', 'Experiences'],
  description: 'I craft beautiful and intuitive digital experiences',
  cta: {
    primary: 'See My Portfolio →',
    secondary: 'Get In Touch'
  },
  stats: [
    { value: 200, label: 'Designs Created' },
    { value: 6, label: 'Years Experience' },
    { value: 40, label: 'Brands Worked With' }
  ]
};
```

Product Manager Hero:
```javascript
store.hero = {
  label: 'Product-Focused PM',
  title: ['Building', 'Products', 'People Love'],
  description: 'I bridge design, engineering, and business to create great products',
  cta: {
    primary: 'View Case Studies →',
    secondary: 'Connect'
  },
  stats: [
    { value: 15, label: 'Products Launched' },
    { value: 10, label: 'Years Experience' },
    { value: 5, label: 'Million+ Users' }
  ]
};
```

════════════════════════════════════════════════════════════════════════════════
8. UPDATING CONTACT INFORMATION
════════════════════════════════════════════════════════════════════════════════

CHANGE CONTACT DETAILS:

In script.js, find store.contact:

```javascript
store.contact = {
  title: 'Let\'s Work Together',
  description: 'Have a project in mind? Let\'s create something amazing together.',
  email: 'your.email@example.com',
  phone: '+1 (555) 000-0000',
  cards: [
    { icon: '📧', label: 'Email', value: 'your.email@example.com', link: 'mailto:your.email@example.com' },
    { icon: '📍', label: 'Location', value: 'Your City, Country', link: '#' },
    { icon: '📱', label: 'Phone', value: '+1 (555) 000-0000', link: 'tel:+15550000000' },
    { icon: '💼', label: 'LinkedIn', value: 'Your Name', link: 'https://linkedin.com/in/yourname' }
  ]
};
```

ICON SUGGESTIONS FOR CONTACT:
- Email: 📧 ✉️ 💬
- Phone: 📱 ☎️ 📞
- Location: 📍 🗺️ 🌍
- LinkedIn: 💼 🔗 👔
- GitHub: 🔗 💻 🐙
- Twitter: 🐦 📱 💬
- Website: 🌐 🖥️ ⚙️

════════════════════════════════════════════════════════════════════════════════
9. ADMIN PANEL OPERATIONS (Code Reference)
════════════════════════════════════════════════════════════════════════════════

ADD PROJECT PROGRAMMATICALLY:

```javascript
// Execute in browser console while admin panel is open
store.projects.push({
  id: Date.now(),
  title: 'New Project',
  category: 'Full Stack',
  description: 'Description',
  fullDescription: 'Full description',
  tech: ['React', 'Node.js'],
  image: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', emoji: '🚀' },
  demo: 'https://demo.com',
  repo: 'https://github.com',
  featured: false,
  views: 0,
  deployedDate: new Date().toISOString().split('T')[0],
  status: 'Active'
});
renderProjects();
```

DELETE PROJECT:

```javascript
store.projects = store.projects.filter(p => p.id !== 1);
renderProjects();
renderAdminProjects();
```

GET ALL DATA:

```javascript
// Display all store data in console
console.log(JSON.stringify(store, null, 2));
```

EXPORT DATA:

```javascript
// Export as JSON file
const dataStr = JSON.stringify(store, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});
const url = URL.createObjectURL(dataBlob);
const link = document.createElement('a');
link.href = url;
link.download = 'portfolio-data.json';
link.click();
```

════════════════════════════════════════════════════════════════════════════════
10. ADVANCED CUSTOMIZATION
════════════════════════════════════════════════════════════════════════════════

ADD CUSTOM CSS:

At the end of style.css, add your custom styles:

```css
/* Custom brand colors */
:root {
  --brand-primary: #ff6b6b;
  --brand-secondary: #4ecdc4;
}

/* Custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

/* Custom animations */
@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}

.my-element {
  animation: myAnimation 0.5s ease;
}
```

ADD CUSTOM JAVASCRIPT:

At the end of script.js, add custom functionality:

```javascript
// Custom function to filter projects by technology
function getProjectsByTech(tech) {
  return store.projects.filter(p => p.tech.includes(tech));
}

// Custom function to calculate total experience
function getTotalExperience() {
  const workEntries = store.timeline.filter(t => t.type === 'work');
  return workEntries.length;
}

// Custom function to get featured projects
function getFeaturedProjects() {
  return store.projects.filter(p => p.featured);
}
```

════════════════════════════════════════════════════════════════════════════════
11. TROUBLESHOOTING
════════════════════════════════════════════════════════════════════════════════

CHANGES NOT SHOWING?

1. Clear browser cache: Ctrl+Shift+Delete
2. Hard refresh: Ctrl+F5
3. Check browser console: F12 → Console
4. Check for JavaScript errors
5. Verify store data: console.log(store)

DATA LOST AFTER REFRESH?

This is expected! Data is stored in browser memory only.

To keep changes:
1. Use localStorage:
   ```javascript
   localStorage.setItem('portfolioData', JSON.stringify(store));
   // On page load:
   if (localStorage.getItem('portfolioData')) {
     store = JSON.parse(localStorage.getItem('portfolioData'));
   }
   ```

2. Or use a backend API
3. Or use Firebase/Supabase

ADMIN LOGIN NOT WORKING?

Check username and password match exactly:
- Username: admin (lowercase)
- Password: admin123 (exact match)

Change in script.js, line ~338:
```javascript
if (username === 'admin' && password === 'admin123') {
```

STYLES NOT UPDATING?

Make sure:
1. CSS file is linked in HTML: <link rel="stylesheet" href="style.css">
2. CSS file path is correct
3. CSS syntax is valid
4. Clear browser cache

MOBILE MENU NOT WORKING?

Check:
1. Mobile toggle button exists in HTML
2. Mobile toggle ID is "mobile-toggle"
3. CSS has display: flex for .mobile-toggle
4. JavaScript includes mobile toggle listener

════════════════════════════════════════════════════════════════════════════════

Version: 2.0
Last Updated: December 2024
For detailed help, see DOCUMENTATION.md

════════════════════════════════════════════════════════════════════════════════
