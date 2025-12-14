# Decap CMS Admin

This is the content management system (CMS) admin interface for managing project content.

## 🎯 Purpose

- Provide a web-based UI to edit content
- Commit changes directly to GitHub
- No backend server required
- Works with Git as the backend

## 📦 What's Inside

- `index.html` - CMS admin interface loader
- `config.yml` - CMS configuration (collections, fields, etc.)

## 🚀 Deployment to Netlify

### Step 1: Create Netlify Site

1. Go to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider (GitHub)
4. Select this repository
5. Configure build settings:
   - **Base directory**: `cms-admin`
   - **Build command**: (leave empty)
   - **Publish directory**: `cms-admin`
6. Click "Deploy site"

### Step 2: Enable Identity

1. Go to Site Settings → Identity
2. Click "Enable Identity"
3. Under Registration preferences:
   - Choose "Invite only" (recommended for security)
4. Under External providers (optional):
   - Enable GitHub, Google, etc. if desired

### Step 3: Enable Git Gateway

1. Go to Site Settings → Identity → Services
2. Click "Enable Git Gateway"
3. Authorize GitHub access when prompted

### Step 4: Invite Users

1. Go to Identity tab
2. Click "Invite users"
3. Enter email addresses of content editors
4. Users will receive invitation emails

### Step 5: Access CMS

Once deployed, access your CMS at:
- `https://YOUR-SITE-NAME.netlify.app/`
- Or: `https://YOUR-SITE-NAME.netlify.app/admin/`

## 🔐 First Login

1. Click the invitation link in your email
2. Set your password
3. You'll be redirected to the CMS admin interface
4. Start editing content!

## 📝 Content Collections

The CMS manages the following content types:

### Projects
- Ready-made projects/products
- Fields: title, description, price, category, features, image

### FAQ
- Frequently asked questions
- Fields: question, answer, order

### Testimonials
- Client testimonials and reviews
- Fields: client name, company, testimonial, rating, avatar

### How It Works Steps
- Process/workflow steps
- Fields: title, description, order, icon

### Developer Profiles
- Team member profiles
- Fields: name, role, bio, skills, avatar

### Project Requests
- Custom project request submissions
- Fields: client info, description, budget, status

## 🔄 Content Workflow

1. **Edit in CMS** → Content saved as markdown in `content/` folder
2. **Commit to Git** → Changes pushed to GitHub
3. **GitHub Action** → Automatically runs content sync
4. **MockData Updated** → Frontend data file regenerated
5. **Auto Deploy** → Render redeploys with new content

## 📂 Content Structure

Content is stored in markdown files with frontmatter:

```markdown
---
title: My Project
description: Project description here
price: 999
published: true
---
```

## ⚙️ Configuration

Edit `config.yml` to:
- Add new content collections
- Modify field definitions
- Change media folder location
- Adjust workflow settings

## 🔧 Troubleshooting

### Can't Login?
- Ensure Identity is enabled
- Check that Git Gateway is enabled
- Verify you accepted the invitation email

### Changes Not Appearing?
- Check if GitHub Action ran successfully
- Verify content file was committed to repository
- Check Render deployment logs

### CMS Not Loading?
- Check browser console for errors
- Verify `config.yml` syntax is correct
- Ensure Netlify site is deployed successfully

## 📚 Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)
