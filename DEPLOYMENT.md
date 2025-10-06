# Deployment Guide

## Pre-Deployment Checklist

- [x] Application builds successfully (`npm run build`)
- [x] Database schema is ready (`database-setup.sql`)
- [x] Environment variables configured (`.env`)
- [ ] Content created and reviewed
- [ ] All menus configured
- [ ] Settings updated
- [ ] Testing completed

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Free tier available
- Automatic deployments from Git
- Built-in CI/CD
- Global CDN
- Zero configuration for Vite apps

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables:
     ```
     VITE_SUPABASE_URL=your_url
     VITE_SUPABASE_SUPABASE_ANON_KEY=your_key
     ```
   - Click "Deploy"

3. **Configure Domain**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

**Steps:**

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to https://netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add Environment Variables
   - Click "Deploy site"

3. **Configure Domain**
   - Site settings > Domain management
   - Add custom domain

### Option 3: Traditional Hosting (cPanel, etc.)

**Steps:**

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Upload dist folder**
   - Connect via FTP/SFTP
   - Upload contents of `dist` folder to `public_html` or `www`

3. **Configure Environment**
   - Create `.env` file on server (if supported)
   - Or embed variables in build before uploading

4. **Configure Apache/Nginx**
   - Ensure SPA routing works (see below)

## Server Configuration

### Apache (.htaccess)

Create `.htaccess` in your web root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/your-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Database Setup on Production

1. **Production Supabase Project**
   - Create new project at https://supabase.com
   - Or use existing project

2. **Run Database Setup**
   - Go to SQL Editor
   - Run `database-setup.sql`
   - Verify tables created

3. **Create Admin User**
   - Authentication > Users > Add User
   - Save credentials securely

4. **Update Environment Variables**
   - Update production URLs and keys
   - Deploy/restart application

## Environment Variables

### Development (.env.local)
```
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_SUPABASE_ANON_KEY=local_key
```

### Production (Vercel/Netlify)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_SUPABASE_ANON_KEY=your_production_key
```

## Post-Deployment Steps

1. **Verify Deployment**
   - Visit your site URL
   - Test public pages
   - Test admin login
   - Create a test page

2. **Configure DNS**
   - Point domain to hosting
   - Wait for DNS propagation (can take 24-48 hours)

3. **SSL Certificate**
   - Vercel/Netlify: Automatic
   - Other hosting: Use Let's Encrypt or provider SSL

4. **Test Thoroughly**
   - All page routes work
   - Admin panel accessible
   - Forms submit correctly
   - Images load
   - Mobile responsive

5. **Monitor Performance**
   - Use Google PageSpeed Insights
   - Check Lighthouse scores
   - Monitor Supabase usage

## Domain Configuration

### Update Settings After Domain Setup

1. Login to admin panel
2. Go to Settings
3. Update:
   - Site URL to your domain
   - Contact email
   - Any other URLs

### Update Supabase Settings

1. Supabase Dashboard > Settings > API
2. Update Site URL to your domain
3. Add domain to Redirect URLs (for auth)

## Performance Optimization

### After Deployment

1. **Enable Gzip Compression**
   - Usually automatic on Vercel/Netlify
   - For other hosting, enable in server config

2. **Configure Caching**
   - Set cache headers for static assets
   - Usually automatic on modern platforms

3. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check dist/assets/*.js sizes
   ```

4. **Image Optimization**
   - Use WebP format when possible
   - Compress images before upload
   - Consider CDN for images

## Continuous Deployment

### Automatic Deployments (Vercel/Netlify)

1. **Connect Git Repository**
   - Already done during setup

2. **Configure Branch Deployments**
   - Production: `main` branch
   - Staging: `develop` branch (optional)

3. **Deploy on Push**
   - Push to `main` → Automatic deployment
   - Review deployment status in dashboard

### Manual Deployments

```bash
# Build locally
npm run build

# Deploy via CLI (Vercel)
npm install -g vercel
vercel --prod

# Deploy via CLI (Netlify)
npm install -g netlify-cli
netlify deploy --prod
```

## Backup Strategy

### Database Backups

1. **Automatic (Supabase)**
   - Point-in-Time Recovery available
   - Check your plan's backup retention

2. **Manual Backups**
   - Supabase Dashboard > Database > Backups
   - Export as SQL dump
   - Schedule regular exports

### Code Backups

1. **Git Repository**
   - Main backup is your Git repo
   - Push regularly

2. **Keep Production Build**
   - Save `dist` folder locally
   - Tag releases in Git

## Rollback Procedure

### Vercel/Netlify

1. Go to Deployments
2. Find previous working deployment
3. Click "Rollback to this deployment"

### Manual Hosting

1. Keep previous `dist` folder
2. Replace current files with backup
3. Test thoroughly

## Monitoring

### Application Monitoring

1. **Supabase Dashboard**
   - Monitor API usage
   - Check error logs
   - Review query performance

2. **Browser Console**
   - Check for JavaScript errors
   - Monitor network requests

3. **Analytics (Optional)**
   - Add Google Analytics
   - Track page views
   - Monitor user behavior

### Uptime Monitoring

1. **UptimeRobot** (free)
   - https://uptimerobot.com
   - Check every 5 minutes
   - Email alerts on downtime

2. **Pingdom**
   - More detailed monitoring
   - Performance insights

## Security Considerations

### Production Checklist

- [x] SSL certificate enabled
- [x] Environment variables secured
- [x] Database RLS policies active
- [ ] Regular backups scheduled
- [ ] Admin credentials secured
- [ ] Supabase security headers enabled
- [ ] Rate limiting configured (Supabase)

### Best Practices

1. **Strong Admin Passwords**
   - Use password manager
   - Enable 2FA if available

2. **Environment Variables**
   - Never commit to Git
   - Use platform's secret management

3. **Database Access**
   - Only through Supabase API
   - Never expose direct database connection

4. **Regular Updates**
   - Update npm packages monthly
   - Monitor security advisories

## Troubleshooting Deployment

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Don't Work

- Check server configuration (see above)
- Ensure SPA routing is enabled

### Environment Variables Not Working

- Verify variable names start with `VITE_`
- Check they're set in hosting platform
- Restart/redeploy after adding variables

### Database Connection Issues

- Verify Supabase URL is correct
- Check anon key is valid
- Ensure RLS policies allow access

### Slow Performance

- Check bundle size
- Enable gzip compression
- Optimize images
- Use Supabase caching

## Cost Considerations

### Free Tier Limits

**Vercel/Netlify Free:**
- Bandwidth: 100GB/month
- Build minutes: 300/month
- Websites: Unlimited

**Supabase Free:**
- Database: 500MB
- Storage: 1GB
- Monthly active users: 50,000

### When to Upgrade

- High traffic (>100GB/month)
- More database storage needed
- Need more bandwidth
- Require support SLAs

## Support Resources

### If Something Goes Wrong

1. Check deployment logs
2. Review Supabase logs
3. Test locally first
4. Check DNS configuration
5. Verify SSL certificate

### Getting Help

- Vercel Discord: https://vercel.com/discord
- Netlify Forums: https://answers.netlify.com
- Supabase Discord: https://discord.supabase.com

---

## Quick Deploy Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

**Your site is ready for the world! 🚀**
