How to run the CMS (Decap / Netlify CMS) without changing the main app:

1) Install CMS dev server
   cd cms-admin
   npm install

2) Start local backend server (for live editing)
   npm run cms

3) Open the admin UI
   Open cms-admin/index.html directly in the browser (or serve this folder)
   The CMS will write changes to the /content folder as Markdown files.

4) Regenerate app data
   From repo root, run:
   npm exec node tools/generate-mockdata-from-content.mjs
   This updates project-hub-x/src/data/mockData.ts, used by the app without changing any app code.

Notes:
- The main app stays untouched. Only content files and generated data change.
- You can commit the /content changes to version your content.
- Adjust cms-admin/config.yml to add more collections.
