## Summary
Describe the changes and the motivation here.

- [ ] No front-end source code changes
- [ ] Adds/updates CI workflow(s)
- [ ] CMS-related changes
- [ ] Deployment configuration

## Changes
- Briefly list key changes:
  - 

## Testing
- Local content generation:
  - `node tools/generate-mockdata-from-content.mjs`
- Run the app locally:
  - `npm --prefix project-hub-x run dev` → http://localhost:4321

## Deployment
- CMS (Netlify): see `cms-admin/NETLIFY_SETUP.txt`
- Frontend (Render): `render.yaml` provided

## Notes
- Content changes live under `content/`
- CI (`.github/workflows/content-sync.yml`) regenerates `project-hub-x/src/data/mockData.ts` and commits back to `main`
- This PR adheres to the "no changes to front-end source code" constraint
