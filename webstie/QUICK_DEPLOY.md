# ⚡ Quick Deploy Guide

Get your CMS + Frontend live in 15 minutes.

---

## 🎯 Prerequisites

- [ ] GitHub account
- [ ] Netlify account (free)
- [ ] Render account (free)
- [ ] This repository pushed to GitHub

---

## 📦 Step-by-Step

### 1. Deploy CMS (5 minutes)

**A. Netlify Setup**
1. Go to https://app.netlify.com
2. "Add new site" → "Import an existing project"
3. Select this repository
4. Settings:
   - Base: `cms-admin`
   - Build: (empty)
   - Publish: `cms-admin`
5. Deploy

**B. Enable Auth**
1. Site Settings → Identity → Enable
2. Identity → Services → Enable Git Gateway
3. Identity → Invite users → Add your email
4. Check email → Accept invitation

**C. Test CMS**
1. Visit: `https://YOUR-SITE.netlify.app/`
2. Login with your credentials
3. Create a test project
4. Publish it

✅ **CMS Ready!**

---

### 2. Verify Content Sync (2 minutes)

**A. Check GitHub**
1. Go to your GitHub repository
2. Navigate to `content/projects/`
3. Should see your test project `.md` file

**B. Check Action**
1. GitHub → Actions tab
2. "Content Sync" should be running/completed
3. Check logs for success

**C. Check Result**
1. View `project-hub-x/integrations/cms/mock-data.ts`
2. Should see your test project in the data

✅ **Sync Working!**

---

### 3. Deploy Frontend (5 minutes)

**A. Render Setup**
1. Go to https://render.com
2. "New" → "Web Service"
3. Connect GitHub repository
4. Render detects `render.yaml` → Click "Apply"
5. Deploy

**B. Wait for Build**
- First build takes 3-5 minutes
- Watch logs in Render dashboard
- Wait for "Live" status

**C. Test Frontend**
1. Visit: `https://YOUR-APP.onrender.com`
2. Navigate to Projects page
3. Should see your test project

✅ **Frontend Live!**

---

### 4. Test Full Pipeline (3 minutes)

**A. Edit in CMS**
1. Login to CMS
2. Edit your test project
3. Change title or description
4. Publish

**B. Monitor**
1. GitHub Actions runs (~30 seconds)
2. Render redeploys (~3 minutes)

**C. Verify**
1. Refresh frontend
2. See updated content

✅ **Everything Working!**

---

## 🎉 You're Done!

**Your Live URLs:**
- 📝 CMS: `https://YOUR-SITE.netlify.app/`
- 🌐 Frontend: `https://YOUR-APP.onrender.com/`

**Content Flow:**
```
Edit in CMS → Auto commit → GitHub Action → Auto deploy → Live ✨
```

---

## 🔧 Troubleshooting

### CMS won't login
- Check Identity is enabled
- Check Git Gateway is enabled
- Check invitation email (spam folder)

### Content not syncing
- Check GitHub Actions ran
- Check `content/` folder updated
- Check `mock-data.ts` updated

### Frontend not updating
- Check Render redeployed
- Check build logs for errors
- Clear browser cache

---

## 📚 Next Steps

1. **Add More Content**
   - Projects, FAQ, Testimonials
   - All via CMS interface

2. **Invite Team**
   - Netlify → Identity → Invite users
   - Share CMS URL

3. **Customize**
   - Edit `cms-admin/config.yml`
   - Add new fields/collections

4. **Custom Domain** (optional)
   - Netlify → Domain settings
   - Render → Custom domain

---

## 💰 Cost

**Total: $0/month**

All services on free tier:
- Netlify: Free (100GB bandwidth)
- GitHub Actions: Free (2000 minutes)
- Render: Free (750 hours, sleeps after 15min)

---

## 📖 Full Documentation

For detailed info, see:
- `DEPLOYMENT_GUIDE.md` - Complete guide
- `cms-admin/README.md` - CMS details
- `tools/README.md` - Generator script info

---

**Need help? Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting!**
