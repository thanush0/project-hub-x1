# 🎨 CMS Customization Guide

Guide to customizing your Decap CMS configuration for your specific needs.

---

## 📋 Current Configuration Overview

### Backend Settings
```yaml
backend:
  name: git-gateway          # Uses Netlify Identity + Git Gateway
  branch: main               # Git branch for content
```

### Workflow Settings
```yaml
publish_mode: editorial_workflow  # Enables draft → review → publish workflow
```
**Options:**
- `editorial_workflow` - Requires review before publishing (recommended for teams)
- `simple` - Direct publish (good for solo content editors)

### Media Settings
```yaml
media_folder: "project-hub-x/public/uploads"  # Where uploaded images are stored
public_folder: "/uploads"                      # Public URL path for images
```

---

## 🔧 Common Customizations

### 1. Change to Simple Publish Mode

**Current:** Editorial workflow (draft → review → publish)  
**Change to:** Direct publish (one-click publishing)

```yaml
# Change line 6 from:
publish_mode: editorial_workflow

# To:
publish_mode: simple
```

**When to use:**
- Solo content editor
- Don't need review process
- Want faster publishing

---

### 2. Add New Field to Existing Collection

**Example: Add "Tags" field to Projects**

```yaml
# Add after line 26 (after features field):
- {label: "Tags", name: "tags", widget: "list", required: false}
```

**Field will appear in:**
- CMS form (for editing)
- Generated mockData.ts
- Available to frontend

---

### 3. Add New Content Collection

**Example: Add "Blog Posts" collection**

```yaml
# Add after line 95 (at end of collections):
  # Blog Posts
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "image", widget: "image", required: false}
      - {label: "Excerpt", name: "excerpt", widget: "text"}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Published", name: "published", widget: "boolean", default: true}
```

**Then create folder:**
```bash
mkdir content/blog
```

**Generator will auto-detect it!**

---

### 4. Modify Field Types

**Available Widgets:**

| Widget | Use For | Example |
|--------|---------|---------|
| `string` | Short text | Title, Name |
| `text` | Long text | Description, Bio |
| `markdown` | Rich text with formatting | Blog posts, Articles |
| `number` | Numbers | Price, Rating, Order |
| `boolean` | True/False | Published status |
| `datetime` | Date & time | Created date, Event date |
| `image` | Single image | Avatar, Featured image |
| `file` | Any file | PDF, Document |
| `select` | Dropdown | Status, Category |
| `list` | Array of items | Features, Tags, Skills |
| `relation` | Link to another collection | Author, Related posts |

---

### 5. Add Field Validation

**Make field required:**
```yaml
- {label: "Title", name: "title", widget: "string", required: true}
```

**Set min/max for numbers:**
```yaml
- {label: "Rating", name: "rating", widget: "number", min: 1, max: 5}
```

**Set pattern for strings:**
```yaml
- {label: "Email", name: "email", widget: "string", pattern: ['^[^@]+@[^@]+\.[^@]+$', 'Must be a valid email']}
```

**Set default value:**
```yaml
- {label: "Published", name: "published", widget: "boolean", default: true}
```

---

### 6. Add Rich Text Editor

**Replace simple text with markdown editor:**

```yaml
# Change from:
- {label: "Description", name: "description", widget: "text"}

# To:
- {label: "Description", name: "description", widget: "markdown"}
```

**Features:**
- Bold, italic, links
- Headings, lists
- Images, code blocks
- Preview pane

---

### 7. Add Dropdown Select Field

**Example: Category dropdown for Projects**

```yaml
# Change from:
- {label: "Category", name: "category", widget: "string"}

# To:
- {label: "Category", name: "category", widget: "select", options: ["Web Development", "Mobile Apps", "E-Commerce", "Custom Software"]}
```

---

### 8. Add Image Gallery (Multiple Images)

**Example: Add project screenshots**

```yaml
- {label: "Screenshots", name: "screenshots", widget: "list", field: {label: "Image", name: "image", widget: "image"}}
```

**Output in mockData:**
```typescript
screenshots: [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg"
]
```

---

### 9. Add Complex Nested Fields

**Example: Team members with details**

```yaml
- label: "Team"
  name: "team"
  widget: "list"
  fields:
    - {label: "Name", name: "name", widget: "string"}
    - {label: "Role", name: "role", widget: "string"}
    - {label: "Photo", name: "photo", widget: "image", required: false}
```

**Output in mockData:**
```typescript
team: [
  {
    name: "John Doe",
    role: "Developer",
    photo: "/uploads/john.jpg"
  }
]
```

---

## 🎯 Recommended Customizations

### For E-Commerce Projects

**Add to Projects collection:**
```yaml
- {label: "SKU", name: "sku", widget: "string"}
- {label: "Stock", name: "stock", widget: "number", min: 0}
- {label: "Sale Price", name: "salePrice", widget: "number", required: false}
- {label: "Available", name: "available", widget: "boolean", default: true}
```

### For Portfolio Sites

**Add to Projects collection:**
```yaml
- {label: "Client", name: "client", widget: "string"}
- {label: "Year", name: "year", widget: "number"}
- {label: "Technologies", name: "technologies", widget: "list"}
- {label: "Live URL", name: "liveUrl", widget: "string", required: false}
- {label: "GitHub URL", name: "githubUrl", widget: "string", required: false}
```

### For Blog Sites

**Add Blog collection:**
```yaml
- name: "blog"
  label: "Blog Posts"
  folder: "content/blog"
  create: true
  slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
  fields:
    - {label: "Title", name: "title", widget: "string"}
    - {label: "Date", name: "date", widget: "datetime"}
    - {label: "Author", name: "author", widget: "string"}
    - {label: "Tags", name: "tags", widget: "list"}
    - {label: "Featured Image", name: "featuredImage", widget: "image"}
    - {label: "Excerpt", name: "excerpt", widget: "text"}
    - {label: "Body", name: "body", widget: "markdown"}
    - {label: "Published", name: "published", widget: "boolean", default: true}
```

---

## 🧪 Testing Customizations

### After Making Changes

1. **Save config file**
   ```bash
   # Edit cms-admin/config.yml
   # Save changes
   ```

2. **Test generator**
   ```bash
   node tools/generate-mockdata-from-content.mjs
   ```

3. **Verify output**
   ```bash
   node tools/test-generator.mjs
   ```

4. **Commit changes**
   ```bash
   git add cms-admin/config.yml
   git commit -m "Update CMS configuration"
   git push
   ```

5. **Deploy to Netlify**
   - Netlify auto-deploys on push
   - CMS updates automatically
   - Test in CMS interface

---

## 📝 Configuration Examples

### Minimal Configuration (Simplest)
```yaml
collections:
  - name: "posts"
    label: "Posts"
    folder: "content/posts"
    create: true
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Published", name: "published", widget: "boolean", default: true}
```

### Advanced Configuration (Feature-rich)
```yaml
collections:
  - name: "projects"
    label: "Projects"
    folder: "content/projects"
    create: true
    slug: "{{year}}-{{slug}}"
    preview_path: "projects/{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Subtitle", name: "subtitle", widget: "string", required: false}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Featured Image", name: "image", widget: "image"}
      - {label: "Gallery", name: "gallery", widget: "list", field: {widget: "image"}}
      - {label: "Description", name: "description", widget: "markdown"}
      - {label: "Category", name: "category", widget: "select", options: ["Web", "Mobile", "Desktop"]}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Client", name: "client", widget: "string"}
      - {label: "Budget", name: "budget", widget: "number", min: 0}
      - label: "Team"
        name: "team"
        widget: "list"
        fields:
          - {label: "Name", name: "name", widget: "string"}
          - {label: "Role", name: "role", widget: "string"}
      - {label: "Published", name: "published", widget: "boolean", default: true}
```

---

## ⚠️ Important Notes

### What Requires Code Changes

**These need generator modification:**
- Changing collection key names (e.g., `readymadeprojects` → `products`)
- Complex data transformations
- Custom field processing

**These work automatically:**
- Adding new fields
- Adding new collections
- Changing field types
- Modifying validation

### What Doesn't Require Redeployment

**CMS config changes are instant:**
- Add/remove fields
- Change field labels
- Modify validation rules
- Add new collections

**Just edit and save `cms-admin/config.yml`!**

---

## 🎨 Quick Customization Recipes

### Recipe 1: Add Social Links to Team Profiles
```yaml
# Add to developers collection:
- {label: "Twitter", name: "twitter", widget: "string", required: false}
- {label: "LinkedIn", name: "linkedin", widget: "string", required: false}
- {label: "GitHub", name: "github", widget: "string", required: false}
```

### Recipe 2: Add SEO Fields to Projects
```yaml
- {label: "Meta Title", name: "metaTitle", widget: "string", required: false}
- {label: "Meta Description", name: "metaDescription", widget: "text", required: false}
- {label: "Keywords", name: "keywords", widget: "list", required: false}
```

### Recipe 3: Add Project Status
```yaml
- {label: "Status", name: "status", widget: "select", options: ["Draft", "In Progress", "Completed", "On Hold"]}
```

### Recipe 4: Add Video Support
```yaml
- {label: "Video URL", name: "videoUrl", widget: "string", required: false}
- {label: "Video Thumbnail", name: "videoThumbnail", widget: "image", required: false}
```

---

## 🚀 Ready to Customize?

**Current status:** Configuration is production-ready as-is!

**Options:**
1. **Keep current config** - Perfect for most use cases
2. **Minor tweaks** - Add a few fields here and there
3. **Major customization** - Redesign for specific needs

**Need help deciding?** Current config includes:
- ✅ All essential fields
- ✅ Good defaults
- ✅ Flexible structure
- ✅ Room to grow

---

## 📚 More Resources

- [Decap CMS Widget Reference](https://decapcms.org/docs/widgets/)
- [Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Collection Types](https://decapcms.org/docs/collection-types/)

---

**Would you like to customize anything? Let me know what you need!**
