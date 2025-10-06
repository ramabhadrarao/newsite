# System Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface                          │
├─────────────────────────────────────────────────────────────┤
│  Public Website                  │  Admin Panel              │
│  - Home Page                     │  - Dashboard              │
│  - Department Pages              │  - Page Manager           │
│  - Dynamic Content               │  - Menu Builder           │
│  - Responsive Navigation         │  - Section Manager        │
│                                  │  - Media Library          │
│                                  │  - Settings               │
└────────────┬───────────────────────┬────────────────────────┘
             │                       │
             ▼                       ▼
┌────────────────────────────────────────────────────────────┐
│                    React Application                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Router (react-router-dom)                           │  │
│  │  - Public routes                                     │  │
│  │  - Protected admin routes                            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management                                    │  │
│  │  - Zustand (auth state)                              │  │
│  │  - React Query (data cache)                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components                                          │  │
│  │  - Layouts (Public, Admin)                           │  │
│  │  - Pages (Home, PageView, Admin pages)               │  │
│  │  - Forms (React Hook Form)                           │  │
│  │  - UI Elements (Tailwind + Headless UI)             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│              Supabase Client Library                        │
│  - Authentication API                                       │
│  - Database API (PostgreSQL)                                │
│  - Real-time subscriptions                                  │
│  - Storage API (for future media uploads)                   │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│                  Supabase Backend                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Authentication Service                              │  │
│  │  - User management                                   │  │
│  │  - Session handling                                  │  │
│  │  - JWT tokens                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                 │  │
│  │  Tables:                                             │  │
│  │  - pages                                             │  │
│  │  - menus                                             │  │
│  │  - menu_items                                        │  │
│  │  - sections                                          │  │
│  │  - media                                             │  │
│  │  - settings                                          │  │
│  │  - auth.users (built-in)                             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Row Level Security (RLS)                            │  │
│  │  - Public read access for published content          │  │
│  │  - Authenticated write access                        │  │
│  │  - User-specific permissions                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

## Data Flow

### Page Viewing (Public)
```
User Request → Router → PageView Component
                ↓
         React Query (cache check)
                ↓
         Supabase Client
                ↓
         Database Query (with RLS)
                ↓
         Return published pages only
                ↓
         Render sections dynamically
```

### Page Creation (Admin)
```
Admin Form → React Hook Form validation
                ↓
         Mutation (React Query)
                ↓
         Supabase Client
                ↓
         Database Insert (check auth)
                ↓
         Invalidate cache
                ↓
         Update UI
```

## Database Schema

```
┌──────────────────┐         ┌──────────────────┐
│     pages        │         │      menus       │
├──────────────────┤         ├──────────────────┤
│ id (PK)          │         │ id (PK)          │
│ title            │         │ name (unique)    │
│ slug (unique)    │         │ label            │
│ content (jsonb)  │         │ location         │
│ status           │         └──────────────────┘
│ template         │                  │
│ parent_id (FK)   │                  │ 1:N
│ created_by (FK)  │                  ▼
└──────────────────┘         ┌──────────────────┐
         │                   │   menu_items     │
         │ 1:N               ├──────────────────┤
         ▼                   │ id (PK)          │
┌──────────────────┐         │ menu_id (FK)     │
│    sections      │         │ label            │
├──────────────────┤         │ url              │
│ id (PK)          │         │ page_id (FK)     │
│ page_id (FK)     │◄────────│ parent_id (FK)   │
│ name             │         │ sort_order       │
│ type             │         └──────────────────┘
│ content (jsonb)  │
│ sort_order       │
│ is_active        │         ┌──────────────────┐
└──────────────────┘         │    settings      │
                             ├──────────────────┤
┌──────────────────┐         │ id (PK)          │
│      media       │         │ key (unique)     │
├──────────────────┤         │ value (jsonb)    │
│ id (PK)          │         │ group            │
│ filename         │         └──────────────────┘
│ path             │
│ mime_type        │         ┌──────────────────┐
│ size             │         │   auth.users     │
│ uploaded_by (FK) │         ├──────────────────┤
└──────────────────┘         │ id (PK)          │
                             │ email            │
                             │ encrypted_pw     │
                             └──────────────────┘
```

## Component Hierarchy

```
App
├── BrowserRouter
    ├── Routes
        ├── /login → Login
        ├── / → PublicLayout
        │   ├── Header (with navigation)
        │   ├── Outlet
        │   │   ├── HomePage
        │   │   └── PageView
        │   └── Footer
        └── /admin → AdminLayout (Protected)
            ├── Sidebar
            ├── Outlet
            │   ├── Dashboard
            │   ├── PagesManager
            │   ├── PageEditor
            │   ├── MenuManager
            │   ├── SectionsManager
            │   ├── MediaManager
            │   └── SettingsManager
            └── Header
```

## State Management

### Global State (Zustand)
- **authStore**: User authentication state
  - user: Current user object
  - session: Active session
  - loading: Auth loading state
  - Methods: signIn, signUp, signOut, initialize

### Server State (React Query)
- **Queries**: Cached data from database
  - pages, menus, menu_items, sections, media, settings
  - Automatic refetch on stale
  - Background updates

- **Mutations**: Data modifications
  - Create, update, delete operations
  - Optimistic updates
  - Cache invalidation

## Security Architecture

### Authentication Flow
```
1. User enters credentials
2. Supabase Auth validates
3. JWT token issued
4. Token stored in localStorage
5. Token sent with all requests
6. Server validates token
7. RLS policies enforced
```

### Row Level Security
```
Public Users:
  ✓ Read published pages
  ✓ Read active sections
  ✓ Read all menus/menu items
  ✓ Read settings
  ✗ Write anything

Authenticated Users:
  ✓ All public permissions
  ✓ Create own pages
  ✓ Update own pages
  ✓ Delete own pages
  ✓ Full access to menus
  ✓ Full access to sections
  ✓ Upload media
  ✓ Update settings
```

## Build & Deploy Process

```
Development:
  npm run dev → Vite dev server → Hot reload

Production Build:
  1. npm run build
  2. Vite builds optimized bundle
  3. Code splitting
  4. Tree shaking
  5. CSS optimization
  6. Asset hashing
  7. Output to /dist

Deployment:
  1. Upload /dist to hosting
  2. Configure environment variables
  3. Set up database
  4. Create admin user
  5. Configure domain
```

## Performance Optimizations

### Frontend
- Code splitting by route
- Lazy loading components
- React Query caching (5 min stale time)
- Optimized bundle size
- Compressed assets

### Database
- Indexed columns (slug, status, etc.)
- JSONB for flexible content
- Efficient queries
- Connection pooling

### Network
- Minimal API calls
- Cached responses
- Gzip compression
- CDN ready

## Scalability Considerations

### Horizontal Scaling
- Stateless React app (multiple instances)
- Supabase handles database scaling
- Load balancer ready

### Vertical Scaling
- Database can scale up
- More compute for complex queries
- Increased storage capacity

### Content Scaling
- Pagination for large lists (can be added)
- Virtual scrolling (can be added)
- Lazy loading images (can be added)
- Infinite scroll (can be added)

## Technology Stack Details

### Frontend Stack
- **React 19**: UI library
- **Vite 7**: Build tool
- **React Router 7**: Routing
- **TailwindCSS 3**: Styling
- **React Query 5**: Server state
- **Zustand 5**: Client state
- **React Hook Form 7**: Forms
- **Headless UI**: UI components
- **Lucide React**: Icons

### Backend Stack
- **Supabase**: Backend as a Service
  - PostgreSQL 15: Database
  - PostgREST: Auto API
  - GoTrue: Authentication
  - Realtime: WebSockets
  - Storage: File storage

### Development Tools
- **npm**: Package manager
- **ESLint**: Linting (can add)
- **Prettier**: Formatting (can add)
- **Git**: Version control

## File Structure

```
project/
├── src/
│   ├── components/
│   │   └── layouts/
│   │       ├── PublicLayout.jsx
│   │       └── AdminLayout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── public/
│   │   └── admin/
│   ├── stores/
│   ├── lib/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── img/
├── database-setup.sql
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

This architecture provides a solid foundation for a scalable, maintainable CMS system.
