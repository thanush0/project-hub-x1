# Project Hub X - Git-Based CMS Edition

A complete project management application with **Git-based CMS** for content management, automatic synchronization, and zero-cost deployment.

[![Content Sync](https://img.shields.io/badge/Content-Auto--Sync-brightgreen)](.github/workflows/content-sync.yml)
[![CMS](https://img.shields.io/badge/CMS-Decap-blue)](cms-admin/)
[![Frontend](https://img.shields.io/badge/Frontend-Astro-orange)](project-hub-x/)

---

## 🌟 Features

### Content Management
- ✅ **Web-based CMS** - Edit content via beautiful UI
- ✅ **Git-backed** - All content in version control
- ✅ **Zero database** - No backend server needed
- ✅ **Automatic sync** - Content updates flow to frontend automatically

### Frontend
- ✅ **Modern Stack** - Astro + React + TypeScript
- ✅ **Responsive Design** - Tailwind CSS + Radix UI
- ✅ **No code changes** - Content edits don't touch frontend code
- ✅ **Type-safe** - Full TypeScript support

### Deployment
- ✅ **Free hosting** - Netlify + Render free tiers
- ✅ **Auto-deploy** - Push to deploy
- ✅ **CI/CD pipeline** - GitHub Actions automation
- ✅ **Production-ready** - Battle-tested architecture

---

## 🚀 Quick Start

### Option 1: Deploy First (Recommended)
**Get live in 15 minutes**

```bash
# 1. Push this repository to GitHub
# 2. Follow QUICK_DEPLOY.md
# 3. Done! CMS and Frontend live
```

📖 **[Read QUICK_DEPLOY.md →](QUICK_DEPLOY.md)**

### Option 2: Local Development

```bash
# Install dependencies
npm install
cd project-hub-x && npm install && cd ..

# Generate mockData from content
node tools/generate-mockdata-from-content.mjs

# Start frontend
cd project-hub-x
npm run dev
```

Access at: `http://localhost:3000`

---

## 📚 Documentation

| Document | Purpose | Audience |
|----------|---------|----------|
| **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** | 15-minute deployment guide | Everyone |
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | Complete deployment documentation | DevOps |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | Architecture overview | Developers |
| **[cms-admin/README.md](cms-admin/README.md)** | CMS usage guide | Content Editors |
| **[tools/README.md](tools/README.md)** | Generator script docs | Developers |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CONTENT WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘

  📝 CMS Editor                🔄 Auto Sync              🌐 Live Site
       │                            │                         │
       ├─► Edit Content             ├─► GitHub Action        ├─► Updated
       │   (Netlify)                │   Runs                  │   Content
       │                            │                         │
       ├─► Save & Publish           ├─► Generate             ├─► Auto
       │                            │   mockData.ts           │   Deploy
       │                            │                         │
       └─► Git Commit ──────────────┴─► Commit ──────────────┴─► Live ✨
           (content/)                   (mock-data.ts)           (Render)

         ⏱️ ~5 sec                    ⏱️ ~30 sec              ⏱️ ~3 min
```

---

## 📁 Project Structure

```
.
├── cms-admin/              # Decap CMS (deploy to Netlify)
│   ├── index.html          # CMS interface
│   └── config.yml          # CMS configuration
│
├── content/                # CMS-managed content (Git-based)
│   ├── projects/           # Ready-made projects
│   ├── faq/               # FAQ items
│   ├── testimonials/      # Client testimonials
│   ├── steps/             # How-it-works steps
│   ├── developers/        # Developer profiles
│   └── requests/          # Project requests
│
├── tools/                  # Build tools
│   └── generate-mockdata-from-content.mjs  # Content → mockData
│
├── project-hub-x/          # Frontend app (deploy to Render)
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Astro pages
│   │   └── styles/        # CSS
│   ├── integrations/
│   │   └── cms/
│   │       └── mock-data.ts  # 🤖 AUTO-GENERATED
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── content-sync.yml  # Auto-sync workflow
│
└── render.yaml            # Render deployment config
```

---

## 🎯 How It Works

### 1. Content Management (CMS)
- Login to CMS at: `https://your-site.netlify.app/`
- Edit projects, FAQ, testimonials, etc.
- Click "Publish"
- Changes automatically commit to GitHub

### 2. Automatic Synchronization
- GitHub Action detects content changes
- Runs generator script
- Converts markdown → TypeScript
- Updates `mock-data.ts`
- Commits changes back to repository

### 3. Frontend Deployment
- Render detects `mock-data.ts` update
- Automatically rebuilds frontend
- Deploys updated site
- Content goes live in ~3-6 minutes

### 4. Zero Manual Work
- No database migrations
- No API deployments
- No manual data sync
- Just edit and publish!

---

## 💰 Cost Breakdown

| Service | Plan | Cost | What It Provides |
|---------|------|------|------------------|
| **Netlify** | Free | $0/month | CMS hosting, Identity, Git Gateway |
| **GitHub** | Free | $0/month | Version control, Actions (2000 min/mo) |
| **Render** | Free | $0/month | Frontend hosting (750 hrs/mo) |
| **Total** | - | **$0/month** | Complete production setup |

**Note:** Free tiers are suitable for production use. Upgrade only if needed.

---

## 🔧 Content Collections

The CMS manages these content types:

### Projects (`content/projects/`)
Ready-made projects and products
- Title, description, price
- Category, features
- Images

### FAQ (`content/faq/`)
Frequently asked questions
- Question, answer
- Order for sorting

### Testimonials (`content/testimonials/`)
Client testimonials and reviews
- Client name, company
- Testimonial text, rating
- Avatar image

### How-It-Works Steps (`content/steps/`)
Process workflow steps
- Title, description
- Order, icon

### Developer Profiles (`content/developers/`)
Team member profiles
- Name, role, bio
- Skills list, avatar

### Project Requests (`content/requests/`)
Custom project submissions
- Client info, description
- Budget, status

---

## 🚀 Deployment URLs

After following the deployment guide:

- **CMS Admin:** `https://YOUR-SITE.netlify.app/`
- **Frontend:** `https://YOUR-APP.onrender.com/`

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Setup

```bash
# Clone repository
git clone <your-repo-url>
cd <repo-name>

# Install dependencies
npm install
cd project-hub-x && npm install && cd ..

# Generate mockData
node tools/generate-mockdata-from-content.mjs

# Start development server
cd project-hub-x
npm run dev
```

### Adding Content Locally

1. Create markdown file in `content/` folder
2. Add frontmatter with required fields
3. Run generator: `node tools/generate-mockdata-from-content.mjs`
4. Restart dev server

**Example:**
```markdown
---
title: My New Project
description: A great project
price: 799
category: Web Development
published: true
createdDate: 2024-01-15T00:00:00.000Z
---
```

---

## 📝 Configuration

### Adding CMS Fields

Edit `cms-admin/config.yml`:

```yaml
collections:
  - name: "projects"
    fields:
      - {label: "New Field", name: "newField", widget: "string"}
```

### Modifying Content Structure

Edit `tools/generate-mockdata-from-content.mjs` to change how content is processed.

### Customizing Frontend

All frontend code in `project-hub-x/src/` can be modified as needed.

---

## 🔐 Security

### CMS Access
- **Invite-only** registration (recommended)
- Netlify Identity authentication
- Git Gateway for GitHub access

### Repository
- Content editors have **content/ only** access via CMS
- Developers have full access
- GitHub Actions bot has write access for automation

### Frontend
- No credentials in code
- Read-only access to content
- Fully static/SSR

---

## 🧪 Testing

### Test Local Generator
```bash
node tools/generate-mockdata-from-content.mjs
```

### Test Frontend Build
```bash
cd project-hub-x
npm run build
```

### Test Full Pipeline
1. Edit content in CMS
2. Verify GitHub Action runs
3. Check mock-data.ts updated
4. Verify Render redeploys
5. Check frontend shows changes

---

## 🐛 Troubleshooting

### CMS Issues
**Can't login?**
- Check Netlify Identity is enabled
- Verify Git Gateway is enabled
- Check invitation email (spam folder)

**Changes not saving?**
- Check Git Gateway authorization
- Verify GitHub token permissions

### Sync Issues
**GitHub Action not running?**
- Check Actions are enabled
- Verify workflow file exists
- Check trigger paths in workflow

**mockData.ts not updating?**
- Check GitHub Action logs
- Verify generator script runs
- Check file permissions

### Frontend Issues
**Build fails?**
- Check Render build logs
- Verify Node.js version (18)
- Check dependencies installed

**Content not showing?**
- Verify mockData.ts has content
- Check browser console
- Clear browser cache

---

## 📊 Monitoring

### GitHub Actions
- Go to: Repository → Actions tab
- Check "Content Sync" workflow
- Review logs for errors

### Netlify
- Dashboard shows CMS usage
- Identity tab shows users
- Deploy logs show CMS updates

### Render
- Dashboard shows deployments
- Logs show build process
- Metrics show performance

---

## 🎓 Learning Resources

- **Decap CMS:** https://decapcms.org/docs/
- **Astro:** https://docs.astro.build/
- **GitHub Actions:** https://docs.github.com/actions
- **Render:** https://render.com/docs
- **Netlify:** https://docs.netlify.com/

---

## 🤝 Contributing

This is a template repository. Feel free to:
- Fork and customize
- Add new features
- Improve documentation
- Share your deployment!

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 Get Started!

Ready to deploy? Follow these steps:

1. **Read:** [QUICK_DEPLOY.md](QUICK_DEPLOY.md) (15 minutes)
2. **Deploy CMS:** Netlify setup
3. **Deploy Frontend:** Render setup
4. **Test:** Edit content and watch it go live!

**Questions?** Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed help.

---

**Made with ❤️ using Decap CMS, Astro, and GitHub Actions**
