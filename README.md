# Project Hub X

<!-- Badges -->
[![Content Sync](https://github.com/thanush0/project-hub-x2/actions/workflows/content-sync.yml/badge.svg)](https://github.com/thanush0/project-hub-x2/actions/workflows/content-sync.yml)
[![Netlify CMS](https://img.shields.io/badge/CMS-Netlify%20(Decap)-00AD9F?logo=netlify&logoColor=white)](https://app.netlify.com/)
[![Render](https://img.shields.io/badge/Frontend-Render-46E3B7?logo=render&logoColor=black)](https://dashboard.render.com/)


A modern Astro + React project with a Git-based CMS (Decap/Netlify CMS) and automated content sync, designed to run without modifying front-end source code.

## Getting Started (Short)

Prerequisites:
- Node.js 18+

Install and run locally (app only):
```bash
npm --prefix project-hub-x install
npm --prefix project-hub-x run dev
# open http://localhost:4321
```

Full local automation (CMS + sync + app):
```bash
npm run setup    # install deps for cms-admin and project-hub-x
npm run dev      # starts CMS backend, serves CMS UI @ 5500, syncs content, runs app @ 4321
```
- CMS UI: http://localhost:5500
- App: http://localhost:4321

## Deploy (Free)

- CMS (Netlify): Follow `cms-admin/NETLIFY_SETUP.txt` to enable Netlify Identity + Git Gateway and deploy the CMS.
- Frontend (Render): Use `render.yaml` or set build/start commands manually.

### Access URLs
- CMS (Netlify) URL (after deploy):
  - https://<your-netlify-site>.netlify.app/index.html
  - Alternative path if configured: https://<your-netlify-site>.netlify.app/admin/
- Frontend (Render) URL (after deploy):
  - https://<your-render-service>.onrender.com

Replace the placeholders with your actual site names once deployed.

## How Content Flows
- Editors use CMS (cms-admin) to edit content; CMS commits files to `content/`.
- GitHub Actions (`.github/workflows/content-sync.yml`) regenerates `project-hub-x/src/data/mockData.ts` on push.
- The app reads `mockData.ts` directly; no front-end source code changes needed.

## More Docs
- See `CONTRIBUTING_CMS_WORKFLOW.md` for a detailed, step-by-step reference.
