# Tools Directory

## Scripts

### generate-mockdata-from-content.mjs

**Purpose:** Converts markdown content files from `content/` folders into TypeScript data for the frontend.

**Input:** Markdown files in `content/` folders with YAML frontmatter
**Output:** `project-hub-x/integrations/cms/mock-data.ts`

**Usage:**
```bash
node tools/generate-mockdata-from-content.mjs
```

**What it does:**
1. Reads all `.md` files from content folders
2. Parses YAML frontmatter
3. Filters published content only
4. Generates TypeScript file with all data
5. Preserves type safety

**Triggered by:**
- GitHub Actions on content changes
- Render build process
- Manual execution

**Example Input:**
```markdown
---
title: My Project
description: A great project
price: 999
published: true
---
```

**Example Output:**
```typescript
const mockDataStore = {
  readymadeprojects: [
    {
      _id: "projects_my-project",
      title: "My Project",
      description: "A great project",
      price: 999,
      published: true,
      _createdDate: "2024-01-15T00:00:00.000Z",
      _updatedDate: "2024-01-15T00:00:00.000Z"
    }
  ]
};
```

## Adding New Tools

To add a new tool script:

1. Create new `.mjs` file in this directory
2. Add documentation to this README
3. Update GitHub Actions workflow if needed
4. Update Render build command if needed

## Troubleshooting

### Generator fails
- Check Node.js version (18+ required)
- Verify content/ folders exist
- Check markdown file syntax

### Content not appearing
- Ensure `published: true` in frontmatter
- Check file has `.md` extension
- Verify frontmatter format (YAML between `---`)

### TypeScript errors
- Run generator again
- Check generated file syntax
- Verify no special characters in content
