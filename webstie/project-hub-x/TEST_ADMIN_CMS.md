# 🧪 Admin CMS - Testing Guide

## 🎯 Local Validation Checklist

### Pre-Test Setup

```bash
# 1. Ensure dependencies are installed
cd project-hub-x
npm install --legacy-peer-deps

# 2. Initialize CMS (visit this URL once)
# http://localhost:3000/admin-init

# 3. Start dev server
npm run dev

# Expected: Server running at http://localhost:3000
```

---

## ✅ Test Suite

### Test 1: Admin Login

**URL**: `http://localhost:3000/admin/login`

**Steps**:
1. Navigate to login page
2. Enter credentials:
   - Email: `admin@projecthubx.com`
   - Password: `admin123`
3. Click "Login to Admin Panel"

**Expected Results**:
- ✅ Login form displays correctly
- ✅ No console errors
- ✅ Redirect to `/admin` on success
- ✅ Token saved to localStorage

**Validation**:
```javascript
// Open browser console and check:
localStorage.getItem('admin_token')
// Should return a token string
```

---

### Test 2: Admin Dashboard Access

**URL**: `http://localhost:3000/admin`

**Steps**:
1. After login, verify dashboard loads
2. Check all tabs are visible
3. Check page list in sidebar

**Expected Results**:
- ✅ Dashboard displays with header
- ✅ User email shown in top-right
- ✅ Tabs visible: Pages, Media, Versions, Settings
- ✅ Sidebar shows: Home Page, Projects, Contact, FAQ
- ✅ Logout button present

**Validation**:
- All UI elements render without errors
- No broken layouts
- Responsive design works

---

### Test 3: Content Editor

**Steps**:
1. Click "Home Page" in sidebar
2. Verify content editor loads
3. Check all sections are visible

**Expected Results**:
- ✅ Page title shows "Home Page"
- ✅ Route shows "/"
- ✅ Sections displayed: Hero Section, Stats Ticker, Featured Projects
- ✅ All content fields populated
- ✅ "Save Draft" and "Publish" buttons visible

**Content to Verify**:
```
Hero Section:
- Hero Heading Line 1: "PROJECT"
- Hero Heading Line 2: "HUB"
- Hero Heading Line 3: "X"
- Hero Description: "The definitive marketplace..."
- CTA buttons present
- Hero image URL present

Stats Section:
- 4 stats with numbers and labels
- All fields editable

Featured Projects:
- Section heading
- Description
- CTA button
```

---

### Test 4: Edit Content

**Steps**:
1. In Home Page editor
2. Find "Hero Heading Line 1"
3. Change "PROJECT" to "WELCOME"
4. Click "Save Draft"

**Expected Results**:
- ✅ "Unsaved changes" indicator appears when editing
- ✅ Draft saves successfully
- ✅ Success message shown
- ✅ Page list updates (if tracking draft state)

**Validation**:
```javascript
// Check console for:
console.log('Draft saved successfully!');
// No errors in console
```

---

### Test 5: Publish Changes

**Steps**:
1. After editing, click "Publish"
2. Confirm publish action

**Expected Results**:
- ✅ Publish confirmation shown
- ✅ Success message: "Page published successfully!"
- ✅ Version created automatically
- ✅ Published cache updated

**Validation**:
```javascript
// In browser console:
// This tests the content store
import { ContentStore } from '@/integrations/cms-admin';
ContentStore.getPageContent('home', 'published');
// Should show updated content
```

---

### Test 6: SEO Metadata

**Steps**:
1. In content editor, click "SEO" tab
2. Verify current values
3. Edit SEO title
4. Save and publish

**Expected Results**:
- ✅ SEO tab displays
- ✅ Current title and description shown
- ✅ Character count displayed
- ✅ Changes save correctly

**Fields to Test**:
- Page Title (limit: 60 chars)
- Meta Description (limit: 160 chars)
- Keywords (optional)
- OG Image URL (optional)

---

### Test 7: Section Control

**Steps**:
1. In content editor
2. Find any section (e.g., "Stats Ticker")
3. Uncheck "Enabled" checkbox
4. Save and publish

**Expected Results**:
- ✅ Section toggle works
- ✅ Saves correctly
- ✅ Section should hide on live page (when integrated)

---

### Test 8: Section Ordering

**Steps**:
1. In content editor
2. Find a section (e.g., "Stats Ticker")
3. Click up arrow ↑
4. Verify order changes

**Expected Results**:
- ✅ Section moves up in order
- ✅ Order numbers update
- ✅ Changes persist on save

---

### Test 9: Media Manager

**URL**: `/admin` → Media tab

**Steps**:
1. Click "Media" tab
2. Enter image URL: `https://via.placeholder.com/800x600`
3. Add alt text: "Test Image"
4. Click "Add Media"

**Expected Results**:
- ✅ Media tab displays
- ✅ Upload form visible
- ✅ Media added successfully
- ✅ Appears in media grid
- ✅ Can copy URL
- ✅ Can delete media

**Validation**:
- Image preview shows correctly
- Search functionality works
- Copy button works

---

### Test 10: Version History

**URL**: `/admin` → Versions tab

**Steps**:
1. Click "Versions" tab
2. Select "Home Page" from sidebar
3. View version history

**Expected Results**:
- ✅ Version history displays
- ✅ Shows created date and user
- ✅ Version numbers correct
- ✅ Can view version details
- ✅ Restore button visible

**Test Restore**:
1. Click restore on any version
2. Confirm restore action
3. Verify draft updated

---

### Test 11: Logout

**Steps**:
1. Click "Logout" button in header
2. Verify redirect

**Expected Results**:
- ✅ Session cleared
- ✅ Redirect to `/admin/login`
- ✅ Token removed from localStorage
- ✅ Cannot access `/admin` without login

**Validation**:
```javascript
// After logout, check console:
localStorage.getItem('admin_token')
// Should return null
```

---

### Test 12: Content Injection (Integration)

**Steps**:
1. Edit homepage heading to "WELCOME"
2. Publish changes
3. Open new tab
4. Visit `http://localhost:3000/` (homepage)

**Expected Results** (when integrated):
- ✅ Page loads normally
- ✅ If ContentProvider wrapper added, shows "WELCOME"
- ✅ If not integrated yet, shows original hardcoded value
- ✅ No errors in console

**Note**: Content injection requires wrapping pages with ContentProvider

---

## 🔍 Browser Console Tests

### Test Content Store

```javascript
// Open browser console on /admin page

// Import ContentStore (if accessible)
// Test getting page content
const homeContent = ContentStore.getPageContent('home', 'published');
console.log('Home Page Content:', homeContent);

// Test published cache
const cache = ContentStore.getPublishedMapping('home');
console.log('Published Cache:', cache);

// Should show key-value pairs like:
// {
//   "hero-heading-1": "PROJECT",
//   "hero-heading-2": "HUB",
//   ...
// }
```

### Test Authentication

```javascript
// Check current session
const token = localStorage.getItem('admin_token');
console.log('Auth Token:', token);

// Verify token format
// Should be: "admin_TIMESTAMP_RANDOMSTRING"
```

---

## 📊 Test Results Template

```
Test Date: _______________
Browser: ________________
OS: _____________________

Test 1: Admin Login              [ ] Pass [ ] Fail
Test 2: Dashboard Access         [ ] Pass [ ] Fail
Test 3: Content Editor           [ ] Pass [ ] Fail
Test 4: Edit Content             [ ] Pass [ ] Fail
Test 5: Publish Changes          [ ] Pass [ ] Fail
Test 6: SEO Metadata             [ ] Pass [ ] Fail
Test 7: Section Control          [ ] Pass [ ] Fail
Test 8: Section Ordering         [ ] Pass [ ] Fail
Test 9: Media Manager            [ ] Pass [ ] Fail
Test 10: Version History         [ ] Pass [ ] Fail
Test 11: Logout                  [ ] Pass [ ] Fail
Test 12: Content Injection       [ ] Pass [ ] Fail

Overall Status: [ ] All Pass [ ] Some Failures

Notes:
_________________________________
_________________________________
_________________________________
```

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find module" errors

**Cause**: TypeScript path resolution

**Fix**:
```bash
# Check tsconfig.json has correct paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/integrations/*": ["./integrations/*"]
    }
  }
}
```

### Issue 2: Login page doesn't redirect

**Cause**: Router not updated or navigation issue

**Fix**:
- Verify Router.tsx has admin routes
- Check browser console for errors
- Verify useNavigate() is imported from react-router-dom

### Issue 3: Content editor is empty

**Cause**: Page definitions not initialized

**Fix**:
```typescript
// Visit http://localhost:3000/admin-init first
// Or manually initialize:
import { initializePageDefinitions } from '@/integrations/cms-admin';
await initializePageDefinitions();
```

### Issue 4: Changes don't save

**Cause**: ContentStore not accessible or memory cleared

**Fix**:
- Refresh browser (data is in-memory, lost on refresh)
- Re-initialize page definitions
- Check browser console for errors

### Issue 5: Published content not showing on website

**Cause**: Pages not wrapped with ContentProvider

**Fix**:
```typescript
// Wrap pages in Router.tsx:
<Route path="/" element={
  <ContentProvider pageId="home">
    <HomePage />
  </ContentProvider>
} />
```

---

## ✅ Success Criteria

### Minimum Viable Test (MVT)

All of these MUST work:

1. ✅ Can login to admin panel
2. ✅ Dashboard loads without errors
3. ✅ Can view page content in editor
4. ✅ Can edit text fields
5. ✅ Can save draft
6. ✅ Can publish changes
7. ✅ Can logout

### Full Feature Test

All features working:

1. ✅ Content editing (all types)
2. ✅ SEO metadata editing
3. ✅ Section enable/disable
4. ✅ Section reordering
5. ✅ Media management
6. ✅ Version history viewing
7. ✅ Version restore
8. ✅ Authentication flow
9. ✅ Logout functionality

---

## 📝 Testing Report Format

```markdown
# Admin CMS Test Report

## Environment
- Date: [Date]
- Browser: [Chrome/Firefox/Safari]
- Version: [Browser version]
- OS: [Windows/Mac/Linux]
- Node Version: [Version]

## Test Results

### Passed Tests (X/12)
- [List passed tests]

### Failed Tests (X/12)
- [List failed tests with details]

### Issues Found
1. [Issue description]
   - Severity: [High/Medium/Low]
   - Steps to reproduce: [Steps]
   - Expected: [Expected behavior]
   - Actual: [Actual behavior]

### Browser Console Errors
[Copy any errors from console]

### Screenshots
[Attach screenshots if needed]

## Recommendations
[Any suggestions for improvements]

## Overall Status
[ ] Ready for production (after DB migration)
[ ] Needs fixes before production
[ ] Blocked by critical issues
```

---

## 🚀 Next Steps After Testing

### If All Tests Pass:

1. **Document Findings**
   - Create test report
   - Note any UI improvements
   - List any bugs found

2. **Integration Planning**
   - Plan which pages to integrate first
   - Decide on integration strategy (wrapper/hook/components)
   - Create integration timeline

3. **Production Planning**
   - Database selection (PostgreSQL/MongoDB)
   - Hosting provider decision
   - Security hardening checklist

### If Tests Fail:

1. **Debug Issues**
   - Check browser console
   - Verify file imports
   - Check TypeScript compilation
   - Review error messages

2. **Report Issues**
   - Document exact steps to reproduce
   - Include console errors
   - Provide screenshots

3. **Fix and Retest**
   - Apply fixes
   - Run tests again
   - Verify all working

---

## 💡 Pro Testing Tips

1. **Use Browser DevTools**
   - React DevTools to inspect components
   - Network tab to check API calls (when implemented)
   - Console for errors and warnings

2. **Test in Multiple Browsers**
   - Chrome (primary)
   - Firefox
   - Safari (if on Mac)
   - Edge

3. **Test Responsive Design**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

4. **Test Edge Cases**
   - Very long content
   - Special characters
   - Empty fields
   - Invalid URLs

5. **Performance Testing**
   - Check memory usage
   - Monitor for memory leaks
   - Test with many versions

---

## 📞 Support During Testing

If you encounter issues:

1. Check `ADMIN_CMS_DOCUMENTATION.md` - Troubleshooting section
2. Review `ADMIN_CMS_ARCHITECTURE.md` - Technical details
3. Check browser console for specific errors
4. Verify all files are created correctly
5. Ensure TypeScript paths are configured

---

**Ready to test? Start with Test 1 and work through the checklist!**

**Report your findings and I'll help resolve any issues. 🚀**
