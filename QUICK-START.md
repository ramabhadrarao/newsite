# 🚀 Quick Start - Get Running in 10 Minutes

## Step 1: Database Setup (3 minutes)

1. **Open Supabase Dashboard**
   ```
   https://0ec90b57d6e95fcbda19832f.supabase.co
   ```

2. **Go to SQL Editor**
   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run Database Setup**
   - Open `database-setup.sql` file
   - Copy ALL contents
   - Paste into SQL Editor
   - Click "Run" or press `Ctrl+Enter`
   - Wait for "Success. No rows returned"

✅ Database is now ready!

## Step 2: Create Admin Account (2 minutes)

1. **Go to Authentication**
   - Click "Authentication" in left sidebar
   - Click "Users" tab
   - Click "Add User" button

2. **Create User**
   ```
   Email: admin@swarnandhra.edu
   Password: YourSecurePassword123!
   ```
   - Click "Create User"

✅ Admin account created!

## Step 3: Start the Application (1 minute)

```bash
npm run dev
```

The app will open at: `http://localhost:3000`

✅ Application is running!

## Step 4: Login (1 minute)

1. Go to `http://localhost:3000/login`
2. Enter your email: `admin@swarnandhra.edu`
3. Enter your password: `YourSecurePassword123!`
4. Click "Sign In"

✅ You're in the admin dashboard!

## Step 5: Create Your First Page (3 minutes)

1. **Click "Pages" in sidebar**
2. **Click "New Page" button**
3. **Fill in the form:**
   ```
   Title: Computer Science & Engineering
   Slug: departments/cse (auto-filled)
   Template: department
   Status: published
   Meta Title: CSE Department - Swarnandhra College
   Meta Description: Leading innovation in computer science education
   ```
4. **Click "Save Page"**

✅ First page created!

## Step 6: View Your Page (30 seconds)

1. Go to `http://localhost:3000/departments/cse`
2. See your page live!

✅ You're now managing content!

---

## What's Next?

### Explore the Admin Panel

**Dashboard** - Overview of your content
- Quick stats
- Quick actions

**Pages** - Manage all pages
- Create, edit, delete pages
- Set status (draft/published)
- SEO settings

**Menus** - Build navigation
- Create menus
- Add menu items
- Order items

**Sections** - Dynamic content blocks
- Create sections
- Assign to pages
- Configure content

**Media** - File management
- View uploaded files
- (Upload feature ready to implement)

**Settings** - Site configuration
- Site name, tagline
- Contact information
- Branding

### Create More Content

**Add Menu Items:**
1. Go to Menus
2. Select "Main Menu"
3. Click "Add Item"
4. Link to your CSE page
5. Save

**Create Sub-Pages:**
1. Pages > New Page
2. Title: "CSE Faculty"
3. Slug: departments/cse/faculty
4. Status: published
5. Save

**Add Sections:**
1. Sections > New Section
2. Name: "Welcome Banner"
3. Type: banner
4. Page: Computer Science & Engineering
5. Content:
   ```json
   {
     "title": "Welcome to CSE Department",
     "description": "Leading innovation in technology"
   }
   ```
6. Save

### Build Your Department Structure

For CSE Department, create these pages:

**Main Pages:**
- /departments/cse
- /departments/cse/about
- /departments/cse/faculty
- /departments/cse/curriculum

**Academic Pages:**
- /departments/cse/programs/be
- /departments/cse/programs/me
- /departments/cse/programs/phd

**Lab Pages:**
- /departments/cse/labs/programming
- /departments/cse/labs/networks
- /departments/cse/labs/database
- (7 more labs...)

**Other Pages:**
- /departments/cse/research
- /departments/cse/placements
- /departments/cse/students
- /departments/cse/gallery

---

## Common Actions

### Publishing a Page
1. Edit page
2. Change Status to "published"
3. Save

### Reordering Menu Items
1. Go to Menus
2. Edit menu item
3. Change "Sort Order" number
4. Lower numbers appear first
5. Save

### Hiding a Section
1. Go to Sections
2. Find your section
3. Click Edit
4. Uncheck "Active"
5. Save

### Changing Site Name
1. Go to Settings
2. Update "Site Name" field
3. Click "Save Settings"
4. Refresh public site to see changes

---

## Tips for Success

### Content Organization
- Use clear, descriptive page titles
- Keep slugs simple and readable
- Group related pages with URL structure
- Use sections for reusable content

### Menu Management
- Start with main sections
- Add sub-pages as menu items
- Use sort order for logical flow
- Keep mobile menu in mind

### SEO Best Practices
- Fill in meta titles (unique per page)
- Write descriptive meta descriptions
- Use clear, keyword-rich page titles
- Keep URLs clean and readable

### Performance
- Publish pages only when ready
- Use sections efficiently
- Keep images optimized (for future uploads)
- Cache settings are automatic

---

## Keyboard Shortcuts

While in admin panel:
- `Ctrl+S` - Save form (in most editors)
- `Ctrl+Enter` - Submit form (in SQL editor)
- `Esc` - Close modals/dropdowns

---

## Troubleshooting

**Can't login?**
- Check email/password
- Verify user exists in Supabase > Authentication
- Try password reset

**Page not showing?**
- Check page status is "published"
- Verify slug is correct
- Clear browser cache

**Menu not appearing?**
- Ensure menu name is correct
- Check menu items exist
- Verify menu_id matches

**Changes not visible?**
- Hard refresh browser (Ctrl+F5)
- Check React Query cache (devtools)
- Verify database was updated

---

## Getting Help

**Documentation:**
- README.md - Full documentation
- FEATURES.md - Feature list
- ARCHITECTURE.md - System design
- SETUP-GUIDE.md - Detailed setup

**Check the code:**
- All components are documented
- Database schema in SQL file
- Examples throughout

**Common Issues:**
- Database not initialized → Run database-setup.sql
- Can't access admin → Create user in Supabase
- Build errors → Run `npm install` again

---

## Ready for Production?

Before going live:

1. ✅ Create content for all pages
2. ✅ Set up all menus
3. ✅ Configure settings
4. ✅ Test on mobile
5. ✅ Check all links work
6. ✅ Review SEO metadata
7. ✅ Run `npm run build`
8. ✅ Deploy to hosting
9. ✅ Configure domain
10. ✅ Set up SSL

---

## You're All Set! 🎉

Your CMS is ready to use. Start creating amazing content for Swarnandhra College!

For detailed information, see:
- **README.md** for complete documentation
- **FEATURES.md** for all capabilities
- **PROJECT-SUMMARY.md** for overview

Happy content managing! 📝
