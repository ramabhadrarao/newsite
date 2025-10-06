# Quick Setup Guide

Follow these steps to get your CMS up and running:

## Step 1: Database Setup (5 minutes)

1. Open your Supabase dashboard: https://0ec90b57d6e95fcbda19832f.supabase.co
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the `database-setup.sql` file from your project
5. Copy all the contents and paste into the SQL editor
6. Click **Run** (or press Ctrl+Enter)
7. Wait for "Success" message

## Step 2: Create Admin User (2 minutes)

1. In Supabase dashboard, go to **Authentication** > **Users**
2. Click **Add User** button
3. Enter:
   - Email: `admin@swarnandhra.edu` (or your preferred email)
   - Password: Choose a strong password
   - Confirm password
4. Click **Create User**
5. **Save these credentials** - you'll need them to login

## Step 3: Run the Application

```bash
npm run dev
```

The site will open at `http://localhost:3000`

## Step 4: Login to Admin Panel

1. Go to `http://localhost:3000/login`
2. Enter the email and password you created
3. Click **Sign In**
4. You'll be redirected to the admin dashboard

## Step 5: Create Your First Department Page

### Example: Computer Science Department

1. **Create Main Page**
   - Go to **Pages** > **New Page**
   - Title: `Computer Science & Engineering`
   - Slug: `departments/cse` (auto-generated from title)
   - Template: `department`
   - Status: `published`
   - Click **Save**

2. **Create a Menu for CSE**
   - Go to **Menus**
   - Click **+** to add new menu
   - Name: `cse-menu`
   - Label: `CSE Navigation`
   - Click OK

3. **Add Menu Items**
   - Select the `cse-menu`
   - Click **Add Item**
   - Add items like:
     - Home → /departments/cse
     - Faculty → /departments/cse/faculty
     - Curriculum → /departments/cse/curriculum
     - Labs → /departments/cse/labs
     - Placements → /departments/cse/placements

4. **Create Sub-Pages**
   - Repeat Step 1 for each sub-page:
     - `departments/cse/faculty`
     - `departments/cse/curriculum`
     - `departments/cse/labs`
     - etc.

5. **Add Sections to Pages**
   - Go to **Sections** > **New Section**
   - Name: `CSE Banner`
   - Type: `banner`
   - Page: Select `Computer Science & Engineering`
   - Content:
     ```json
     {
       "title": "Department of Computer Science & Engineering",
       "description": "Leading innovation in technology and research"
     }
     ```
   - Sort Order: `0`
   - Active: ✓
   - Click **Save**

## Step 6: Customize Site Settings

1. Go to **Settings**
2. Update:
   - Site Name
   - Site Tagline
   - Contact Information
3. Click **Save Settings**

## Common Tasks

### Adding a New Page

Pages > New Page > Fill form > Save

### Creating a Menu

Menus > + > Enter name and label > Add Items

### Adding Dynamic Content

Sections > New Section > Choose type > Configure JSON > Save

### Publishing Content

Edit page > Change Status to "published" > Save

## Content Structure Examples

### Banner Section
```json
{
  "title": "Welcome",
  "description": "Your description here"
}
```

### Cards Section
```json
{
  "items": [
    {
      "title": "Card Title",
      "description": "Description",
      "image": "/path/to/image.jpg"
    }
  ]
}
```

### List Section
```json
{
  "items": [
    {
      "title": "Item 1",
      "description": "Details about item 1"
    },
    {
      "title": "Item 2",
      "description": "Details about item 2"
    }
  ]
}
```

## Troubleshooting

### Can't login?
- Verify user exists in Supabase Authentication panel
- Check credentials are correct
- Make sure email is confirmed (if confirmation enabled)

### Pages not showing?
- Check page status is "published"
- Verify slug is correct
- Check RLS policies in database

### Menu not appearing?
- Ensure menu name matches in code (default is "main-menu")
- Check menu items are created and have correct menu_id
- Verify sort_order is set

## Need Help?

- Check `README.md` for detailed documentation
- Review `database-setup.sql` for database schema
- Inspect browser console for errors
- Check Supabase logs for backend issues

## Next Steps

1. Create pages for all departments (ECE, Mechanical, EEE, Civil, IT)
2. Build out 40+ sub-pages for CSE department
3. Add faculty profiles with sections
4. Upload placement records
5. Create news and events pages
6. Add photo galleries
7. Set up contact forms

Your CMS is now ready to use!
