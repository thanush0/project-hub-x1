# Installation & Verification Checklist

Follow these steps to ensure your application is properly set up and running.

---

## 📋 Pre-Installation Checklist

- [ ] Node.js version 18 or higher installed
- [ ] npm or yarn package manager available
- [ ] Port 3000 is available (or change in `astro.config.mjs`)
- [ ] Terminal/Command Prompt access

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd project-hub-x
```

### Step 2: Clean Install (Recommended)
```bash
# Remove old dependencies if they exist
rm -rf node_modules package-lock.json

# Install fresh dependencies
npm install
```

**Expected Result:** Dependencies install without Wix-related errors

### Step 3: Verify Installation
```bash
# Check if Astro is installed
npm list astro

# Should show: astro@5.8.0 (or similar)
```

---

## ✅ Post-Installation Verification

### Test 1: Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
🚀 astro v5.8.0 started in X ms

┃ Local    http://localhost:3000/
┃ Network  http://192.168.x.x:3000/
```

✅ **Success Criteria:**
- No Wix-related errors
- Server starts on port 3000
- No module not found errors

### Test 2: Open in Browser
Navigate to: `http://localhost:3000`

✅ **Success Criteria:**
- Page loads without errors
- Styling is applied correctly
- No console errors related to Wix
- Navigation works

### Test 3: Check for Wix Dependencies
```bash
npm list | grep @wix
```

✅ **Success Criteria:**
- Should return **NO results**
- If any `@wix` packages appear, they need to be removed

### Test 4: Build Test
```bash
npm run build
```

✅ **Success Criteria:**
- Build completes successfully
- No Wix-related errors
- Output directory created (`dist/`)

### Test 5: TypeScript Check
```bash
npm run check
```

✅ **Success Criteria:**
- Type checking passes
- No Wix type errors

---

## 🧪 Feature Testing

### Test Authentication
1. [ ] Click "Sign In" button
2. [ ] Enter any email when prompted
3. [ ] Verify you're logged in (UI updates)
4. [ ] Refresh page - session should persist
5. [ ] Click "Logout"
6. [ ] Verify you're logged out

### Test Navigation
1. [ ] Click through all navigation links
2. [ ] Verify all pages load
3. [ ] Check responsive design (resize browser)
4. [ ] Test on mobile view

### Test Data Display
1. [ ] Check if any data displays on pages
2. [ ] If no data, initialize sample data (see below)

---

## 📊 Initialize Sample Data (Optional)

To see sample data in your application:

### Option 1: Auto-initialize on Page Load
Edit `src/components/pages/HomePage.tsx`:

```tsx
import { useEffect } from 'react';
import { initializeSampleData } from '@/integrations/cms/sample-data';

// Inside your component
useEffect(() => {
  initializeSampleData();
}, []);
```

### Option 2: Manual Call in Browser Console
```javascript
import('@/integrations/cms/sample-data').then(m => m.initializeSampleData());
```

---

## 🔍 Troubleshooting Common Issues

### Issue: Port 3000 Already in Use
**Solution:**
Edit `astro.config.mjs`:
```js
server: {
  host: true,
  port: 3001,  // Change to any available port
}
```

### Issue: Module Not Found Errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .astro
npm install
```

### Issue: TypeScript Errors
**Solution:**
```bash
# Regenerate TypeScript config
npm run check
```

### Issue: Styling Not Loading
**Solution:**
- Check if `tailwindcss` is installed: `npm list tailwindcss`
- Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: Images Not Loading
**Solution:**
- Place images in `public/` directory
- Reference as `/image-name.jpg` in code
- Check browser console for 404 errors

---

## 📁 Verify File Structure

Ensure these key files exist:

```
project-hub-x/
├── ✅ package.json (updated, no @wix deps)
├── ✅ astro.config.mjs (updated, no Wix integrations)
├── ✅ tsconfig.json (updated paths)
├── ❌ wix.config.json (should be deleted)
├── ✅ integrations/
│   ├── cms/
│   │   ├── ✅ mock-data.ts (NEW)
│   │   ├── ✅ sample-data.ts (NEW)
│   │   ├── ✅ service.ts (modified)
│   │   └── ✅ types.ts (modified)
│   └── members/
│       ├── ✅ mock-auth.ts (NEW)
│       ├── ✅ service.ts (modified)
│       └── ✅ types.ts (modified)
├── ✅ src/
│   ├── components/ui/
│   │   └── ✅ image.tsx (modified)
│   └── pages/
│       └── ✅ [...slug].astro (modified)
└── ✅ Documentation files (NEW)
```

---

## 🎯 Final Verification Checklist

### Dependencies
- [ ] No `@wix/*` packages in `package.json`
- [ ] `@astrojs/node` adapter installed
- [ ] All UI libraries intact (Radix, Tailwind, etc.)

### Configuration
- [ ] `wix.config.json` deleted
- [ ] `astro.config.mjs` updated
- [ ] `tsconfig.json` paths updated

### Code
- [ ] No `import ... from '@wix/...'` statements
- [ ] Mock services implemented
- [ ] Image component simplified
- [ ] Authentication mocked

### Documentation
- [ ] `QUICK_START.md` exists
- [ ] `README_SETUP.md` exists
- [ ] `MIGRATION_SUMMARY.md` exists
- [ ] `.env.example` exists

### Functionality
- [ ] Dev server starts successfully
- [ ] Application loads in browser
- [ ] No Wix-related console errors
- [ ] Navigation works
- [ ] Authentication works (mocked)
- [ ] Styling is intact
- [ ] Build completes successfully

---

## ✅ Success!

If all checks pass, your application is successfully running without Wix dependencies!

**Next Steps:**
1. Read `QUICK_START.md` for usage guide
2. Read `README_SETUP.md` for architecture details
3. Read `MIGRATION_SUMMARY.md` for change details
4. Start developing your features!

---

## 📞 Need Help?

If you encounter issues:

1. **Check Documentation:**
   - `QUICK_START.md` - Quick start guide
   - `README_SETUP.md` - Detailed setup
   - `MIGRATION_SUMMARY.md` - What changed

2. **Common Commands:**
   ```bash
   npm install          # Reinstall dependencies
   npm run dev          # Start dev server
   npm run build        # Build for production
   npm run check        # Type check
   ```

3. **Clean Start:**
   ```bash
   rm -rf node_modules package-lock.json .astro dist
   npm install
   npm run dev
   ```

---

**Happy Coding! 🎉**
