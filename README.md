# Swarnandhra College CMS

A modern, full-featured Content Management System built with React, Vite, and Supabase for Swarnandhra College of Engineering and Technology.

## Features

- **Dynamic Page Management**: Create and edit pages with a user-friendly editor
- **Menu Builder**: Drag-and-drop menu management system
- **Section/Widget System**: Customizable page sections (banners, cards, lists, HTML)
- **Media Library**: Upload and manage images and documents
- **Department Pages**: Create dedicated pages for each department (CSE, ECE, etc.) with 40+ sub-pages
- **SEO Optimization**: Built-in meta tags and SEO settings
- **Authentication**: Secure admin login system
- **Responsive Design**: Mobile-first, modern UI
- **Role-Based Access**: Admin dashboard with user permissions

## Tech Stack

- **Frontend**: React 19, Vite 7, TailwindCSS 4
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Data Fetching**: TanStack React Query
- **Icons**: Lucide React
- **UI Components**: Headless UI

## Getting Started

### 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Open `database-setup.sql` from the project root
4. Copy and paste the entire contents
5. Click **Run** to create all tables and initial data

### 2. Environment Variables

The `.env` file is already configured with your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Create Admin Account

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User**
4. Create a new user with email and password
5. Use these credentials to login to `/login`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production

```bash
npm run build
```

## Usage Guide

### Admin Panel

Access the admin panel at `/admin` (requires authentication)

#### Creating Pages

1. Go to **Pages** > **New Page**
2. Enter page title (slug is auto-generated)
3. Choose template type (default, department, custom)
4. Add SEO metadata
5. Set status (draft/published)
6. Save and publish

#### Menu Management

1. Go to **Menus**
2. Select a menu (e.g., "Main Menu")
3. Click **Add Item**
4. Choose:
   - Link to existing page, or
   - Custom URL (internal or external)
5. Set sort order for positioning
6. Save

#### Creating Sections

1. Go to **Sections** > **New Section**
2. Choose section type:
   - **Banner**: Hero sections with title/description
   - **Cards**: Grid of content cards with images
   - **List**: Simple list items
   - **HTML**: Custom HTML content
3. Assign to a page or make it global
4. Configure content in JSON format
5. Set active/inactive status

#### Example: Creating CSE Department Page

1. Create main page: **Computer Science & Engineering**
   - Slug: `departments/cse`
   - Template: `department`
   - Status: `published`

2. Add sections to the page:
   - Banner section with department overview
   - Cards section with faculty profiles
   - List section with courses offered

3. Create sub-pages:
   - Faculty
   - Curriculum
   - Research
   - Labs
   - Placements
   - Alumni

4. Create a CSE menu:
   - Go to Menus > Add New Menu
   - Name: `cse-menu`
   - Add menu items linking to all sub-pages

## Content Structure

### Page Content JSON

```json
{
  "html": "<div class='prose'>Your HTML content</div>"
}
```

### Section Content Examples

**Banner Section:**
```json
{
  "title": "Welcome to CSE",
  "description": "Leading innovation in computer science"
}
```

**Cards Section:**
```json
{
  "items": [
    {
      "title": "Faculty",
      "description": "Experienced professors",
      "image": "/path/to/image.jpg"
    }
  ]
}
```

**List Section:**
```json
{
  "items": [
    {
      "title": "B.Tech CSE",
      "description": "4-year undergraduate program"
    }
  ]
}
```

## Project Structure

```
src/
├── components/
│   └── layouts/
│       ├── PublicLayout.jsx    # Public site layout
│       └── AdminLayout.jsx     # Admin panel layout
├── pages/
│   ├── auth/
│   │   └── Login.jsx           # Login page
│   ├── public/
│   │   ├── HomePage.jsx        # Public homepage
│   │   └── PageView.jsx        # Dynamic page viewer
│   └── admin/
│       ├── Dashboard.jsx       # Admin dashboard
│       ├── PagesManager.jsx    # Page management
│       ├── PageEditor.jsx      # Page editor
│       ├── MenuManager.jsx     # Menu builder
│       ├── SectionsManager.jsx # Section management
│       ├── MediaManager.jsx    # Media library
│       └── SettingsManager.jsx # Site settings
├── stores/
│   └── authStore.js            # Authentication state
├── lib/
│   └── supabase.js             # Supabase client
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## Database Schema

- **pages**: All website pages
- **menus**: Menu definitions
- **menu_items**: Menu item entries
- **sections**: Reusable page sections
- **media**: Uploaded files
- **settings**: Site-wide configuration

## Customization

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:

```js
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Adding New Section Types

1. Define the type in `SectionRenderer` component
2. Add JSON schema for the section content
3. Create rendering logic

## Support

For issues or questions, contact the development team.

## License

Copyright © 2024 Swarnandhra College of Engineering and Technology
