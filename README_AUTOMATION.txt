Automated local run for Project Hub X + CMS

One-time setup:
  npm run setup

Start everything (CMS backend, CMS UI server, content sync, web app):
  npm run dev

What this does:
- Starts Decap CMS local backend (saves into content/)
- Serves the CMS admin UI at http://localhost:5500 (cms-admin/index.html)
- Runs initial content -> mockData.ts generation
- Watches content/**/* and regenerates project-hub-x/src/data/mockData.ts automatically
- Starts the web app dev server at http://localhost:4321

Workflow:
1) Open CMS UI: http://localhost:5500
2) Edit and save entries in CMS (writes to content/ folders)
3) The generator updates mockData.ts automatically
4) Refresh the web app at http://localhost:4321 to see changes

Notes:
- No changes are made to the app source code beyond generating mockData.ts from content/.
- You can commit content/ to version content in Git.
