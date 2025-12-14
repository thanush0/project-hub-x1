# Changelog

## Unreleased
### Added
- Git-based CMS (Decap/Netlify CMS) in `cms-admin/` with `config.yml` and `NETLIFY_SETUP.txt`.
- GitHub Actions workflow `.github/workflows/content-sync.yml` to auto-generate `project-hub-x/src/data/mockData.ts` from `content/`.
- Render deployment file `render.yaml` for free frontend hosting.
- Root automation scripts (in `package.json`) to run CMS backend, serve admin UI, watch content, and start the app.
- Seed content in `content/` and generator script `tools/generate-mockdata-from-content.mjs`.
- CONTRIBUTING_CMS_WORKFLOW.md with end-to-end docs.
- Root README with Getting Started, deploy pointers, and badges.

### Notes
- No changes to front-end source code in `project-hub-x/`. The app reads from generated `src/data/mockData.ts`.
