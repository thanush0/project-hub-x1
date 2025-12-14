# 📋 Quick Reference Card

One-page reference for the Git-based CMS deployment.

---

## 🎯 What Is This?

A **Git-based CMS** setup that lets content editors manage website content through a web UI while keeping everything in version control. Content changes automatically flow to the live site in ~4-6 minutes.

---

## 📦 What's Included

- **CMS Admin** (Netlify) - Web interface for editing content
- **Content Folder** (Git) - Markdown files with all content
- **Sync Tool** (GitHub Actions) - Automatic content synchronization
- **Frontend** (Render) - Live website displaying content

**All free, all automated, zero code changes needed!**

---

## 🚀 Deployment Commands

### Deploy CMS (Netlify)
```bash
# No commands needed - use Netlify UI
# 1. Create site from GitHub
# 2. Base: cms-admin
# 3. Enable Identity + Git Gateway
# 4. Invite users
```

### Deploy Frontend (Render)
```bash
# No commands needed - use Render UI
# 1. Create web service from GitHub
# 2. Detects render.yaml automatically
# 3. Deploy
```

### Test Locally
```bash
# Generate mockData from content
node tools/generate-mockdata-from-content.mjs

# Start frontend
cd project-hub-x && npm run dev
```

---

## 🔗 Key URLs

| Service | URL Pattern | Purpose |
|---------|-------------|---------|
| **CMS** | `https://SITE.netlify.app/` | Edit content |
| **Frontend** | `https://APP.onrender.com/` | Live website |
| **GitHub Actions** | Repository → Actions tab | Monitor sync |
| **Render Dashboard** | render.com/dashboard | Monitor deploys |

---

## 📁 Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `cms-admin/config.yml` | CMS configuration | Yes |
| `content/**/*.md` | Content files | Via CMS |
| `tools/generate-mockdata-from-content.mjs` | Generator script | Yes |
| `.github/workflows/content-sync.yml` | Auto-sync workflow | Rarely |
| `render.yaml` | Deployment config | Rarely |
| `project-hub-x/integrations/cms/mock-data.ts` | **AUTO-GENERATED** | Never |

---

## 🔄 Content Workflow

```
1. Edit in CMS          (https://SITE.netlify.app/)
2. Click Publish        (Commits to GitHub)
3. GitHub Action runs   (30 seconds)
4. Render deploys       (3-5 minutes)
5. Content is live!     (Total: ~4-6 min)
```

---

## 🎨 Content Collections

| Collection | CMS Label | Files in | Used on |
|-----------|-----------|----------|---------|
| Projects | Projects | `content/projects/` | ProjectsPage |
| FAQ | FAQ | `content/faq/` | FAQPage |
| Testimonials | Testimonials | `content/testimonials/` | HomePage |
| Steps | How It Works | `content/steps/` | HomePage |
| Developers | Developer Profiles | `content/developers/` | AboutPage |
| Requests | Project Requests | `content/requests/` | Dashboard |

---

## ⚙️ Configuration

### Add New Content Field
Edit `cms-admin/config.yml`:
```yaml
collections:
  - name: "projects"
    fields:
      - {label: "New Field", name: "newField", widget: "string"}
```

### Add New Collection
Edit `cms-admin/config.yml`:
```yaml
collections:
  - name: "newcollection"
    label: "New Collection"
    folder: "content/newcollection"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
```

### Modify Generator
Edit `tools/generate-mockdata-from-content.mjs` to change transformation logic.

---

## 🐛 Troubleshooting

### CMS Won't Login
1. Check: Netlify → Identity → Enabled?
2. Check: Netlify → Identity → Services → Git Gateway enabled?
3. Check invitation email (spam folder)

### Content Not Syncing
1. Check: GitHub → Actions → Workflow ran?
2. Check: Workflow logs for errors
3. Check: `mock-data.ts` updated in repo?

### Frontend Not Updating
1. Check: Render → Dashboard → Deploy succeeded?
2. Check: Build logs for errors
3. Clear browser cache

### Generator Fails
```bash
# Test locally
node tools/generate-mockdata-from-content.mjs

# Check Node.js version (need 18+)
node --version
```

---

## 📊 Health Checks

| Component | Check | Expected |
|-----------|-------|----------|
| CMS | Visit CMS URL | Loads, can login |
| Content | Edit & publish | Creates Git commit |
| Sync | GitHub Actions | Green checkmark |
| mockData | Check file | Updated recently |
| Frontend | Visit site URL | Shows content |

---

## 💰 Costs

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| Netlify | Free | $0 | 100GB/mo bandwidth |
| GitHub | Free | $0 | 2000 Actions min/mo |
| Render | Free | $0 | 750 hrs/mo, sleeps after 15min |
| **Total** | | **$0/mo** | Production-ready |

---

## 🔐 Access Control

| Role | Can Do |
|------|--------|
| **Content Editor** | Login to CMS, edit content, publish |
| **Developer** | Full repo access, deploy, configure |
| **GitHub Actions** | Read content, write mock-data.ts |
| **End User** | View website only |

---

## ⏱️ Performance Targets

| Metric | Target | Typical |
|--------|--------|---------|
| CMS Load | < 3 sec | ~2 sec |
| Content Save | < 5 sec | ~3 sec |
| GitHub Action | < 60 sec | ~30 sec |
| Frontend Build | < 5 min | ~3-4 min |
| **Total Pipeline** | **< 8 min** | **~4-6 min** |

---

## 🛠️ Common Tasks

### Invite Content Editor
1. Netlify → Identity tab
2. Click "Invite users"
3. Enter email
4. User receives invite email

### Create New Content
1. Login to CMS
2. Select collection
3. Click "New [Item]"
4. Fill fields
5. Click "Publish"

### Revert Content
**Method 1: CMS**
- Edit content back to previous values

**Method 2: Git**
- GitHub → Commits
- Find commit → Revert

### View Content History
- GitHub → Navigate to content file
- Click "History" button
- See all changes with diffs

### Test Pipeline
1. Edit any content in CMS
2. Publish
3. Watch GitHub Actions (~30 sec)
4. Watch Render deploy (~3-5 min)
5. Refresh frontend site
6. Verify content changed

---

## 📚 Documentation Quick Links

**Getting Started:**
- [README.md](README.md) - Overview
- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - 15-min deployment

**Reference:**
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete guide
- [CHECKLIST.md](CHECKLIST.md) - Verification steps

**Visual Guides:**
- [WORKFLOW_DIAGRAM.md](WORKFLOW_DIAGRAM.md) - Data flow diagrams
- [VISUAL_SUMMARY.md](VISUAL_SUMMARY.md) - Visual overview

**Indexes:**
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - All docs
- [COMPLETE_SETUP_SUMMARY.md](COMPLETE_SETUP_SUMMARY.md) - What's included

---

## 🎯 Success Criteria

Your setup is complete when:

- ✅ CMS accessible at Netlify URL
- ✅ Can create/edit content in CMS
- ✅ Publish creates Git commit
- ✅ GitHub Action runs successfully
- ✅ mock-data.ts updates automatically
- ✅ Render deploys automatically
- ✅ Frontend shows updated content
- ✅ Total time: < 6 minutes

---

## 🆘 Get Help

1. **Search docs** - Check relevant guide
2. **Check logs** - GitHub Actions, Render dashboard
3. **Verify setup** - Use [CHECKLIST.md](CHECKLIST.md)
4. **Troubleshoot** - See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
5. **Open issue** - GitHub Issues

---

## 🎉 Quick Start

```bash
# 1. Push to GitHub
git add .
git commit -m "Add Git-based CMS setup"
git push

# 2. Deploy (via web UIs)
# - Netlify: Deploy cms-admin/
# - Render: Deploy with render.yaml

# 3. Test
# - Edit content in CMS
# - Watch it go live!

# Done! 🚀
```

---

## 📞 Emergency Contacts

**CMS Down?** → Check Netlify Status Page  
**Sync Broken?** → Check GitHub Actions Logs  
**Frontend Down?** → Check Render Dashboard  
**Need Help?** → [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) Troubleshooting Section

---

## 🎓 Learning Path

**For Quick Deploy (30 min):**
1. README.md (5 min)
2. QUICK_DEPLOY.md (15 min)
3. CHECKLIST.md (10 min)

**For Understanding (1 hour):**
1. README.md (5 min)
2. PROJECT_STRUCTURE.md (20 min)
3. WORKFLOW_DIAGRAM.md (15 min)
4. DEPLOYMENT_GUIDE.md (20 min)

**For Development (2 hours):**
- Read all documentation
- Test locally
- Customize CMS
- Deploy and verify

---

## ⚡ One-Liners

```bash
# Generate mockData locally
node tools/generate-mockdata-from-content.mjs

# Start frontend locally
cd project-hub-x && npm run dev

# Check Node version
node --version  # Should be 18+

# Test Astro build
cd project-hub-x && npm run build
```

---

## 🔑 Key Concepts

**Git-based CMS** = Content stored as files in Git, edited via web UI  
**Content Sync** = Automatic conversion from markdown → TypeScript  
**Zero Backend** = No database, no API server, just static files + Git  
**Auto-deploy** = Push to Git → Automatically deploys  
**Free Tier** = All services on free plans = $0/month

---

**Print this page for quick reference! 📋**

**Ready to deploy? → [QUICK_DEPLOY.md](QUICK_DEPLOY.md)**
