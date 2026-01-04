# Quick Start Guide

Get your dashboard up and running in 3 steps!

## 1️⃣ Setup Environment

Create `.env.local` (copy from `.env.local.example`):

```bash
cp .env.local.example .env.local
```

Required variables:
```env
DATABASE_URL="your-neon-postgres-url"
AUTH_SECRET="run: openssl rand -base64 32"
```

Optional configurations:
```env
# Require authentication for dashboard access (default: false)
REQUIRE_AUTH="false"

# Allow anonymous post creation/editing (default: false)
# ⚠️ WARNING: Only for demos/local dev - anyone can edit/delete posts!
ALLOW_ANONYMOUS_POSTS="true"

# Google OAuth (optional)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
```

## 2️⃣ Setup Database

Run migrations:
```bash
npm run db:generate
npm run db:migrate
```

Add test data (creates test user + 5 sample posts):
```bash
npm run db:seed
```

## 3️⃣ Start App

```bash
npm run dev
```

Visit: `http://localhost:3000` to see your new **Dashboard Overview**!
Manage your content via the navigation:
- **Posts**: `http://localhost:3000/dashboard/posts`
- **Products**: `http://localhost:3000/dashboard/products`

## Authentication Options

The dashboard works in **two modes**:

### Mode 1: Public Dashboard (Default - `REQUIRE_AUTH="false"`)
- ✅ Anyone can view all posts
- ✅ "Sign In" button shown in header
- ✅ Only authenticated users can create/edit/delete their own posts
- ✅ No login required to browse

### Mode 2: Protected Dashboard (`REQUIRE_AUTH="true"`)
- 🔒 Must sign in to access dashboard
- 🔒 Redirects to login page if not authenticated

### Setting Up Authentication

**Option A: Public Mode (No setup needed)**
Set in `.env.local`:
```env
REQUIRE_AUTH="false"
```
Users can browse without login. Sign in only needed to create/edit posts.

**Option B: Protected Mode + Google OAuth**
1. Set `REQUIRE_AUTH="true"` in `.env.local`
2. Go to [Google Cloud Console](https://console.cloud.google.com)
3. Create OAuth 2.0 credentials
4. Add to `.env.local`:
   ```env
   REQUIRE_AUTH="true"
   AUTH_GOOGLE_ID="your-id.apps.googleusercontent.com"
   AUTH_GOOGLE_SECRET="your-secret"
   ```
5. Restart dev server

## Dashboard Features

**For Everyone (No Login Required):**
- ✅ **Premium UI**: Enjoy a modern design with glassmorphism and OKLCH color vibrance
- ✅ **View all posts**: Browse content in a sortable, filterable table
- ✅ **See post authors**: Identify content creators at a glance
- ✅ **Filter & Sort**: Efficiently manage data with TanStack Table integration
- ✅ **Toggle dark/light mode**: Switch themes with a sleek toggle

**For Authenticated Users:**
- ✅ **Create new posts** with title, content, and publish toggle
- ✅ **Edit your own posts** by clicking the actions menu (⋯)
- ✅ **Delete your own posts** with confirmation dialog
- ✅ Actions only appear on posts you created

## Quick Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:generate` | Generate migrations |
| `npm run db:migrate` | Run migrations |
| `npm run db:seed` | Seed test data |
| `npm run db:studio` | Open Drizzle Studio |

## File Structure

```
app/
├── dashboard/         # Protected dashboard page
│   ├── page.tsx      # Main dashboard
│   ├── loading.tsx   # Loading skeleton
│   └── error.tsx     # Error boundary
├── login/            # Login page
└── api/auth/         # NextAuth endpoints

components/posts/     # Post management components
├── posts-table.tsx   # TanStack Table
├── create-post-dialog.tsx
├── edit-post-dialog.tsx
└── delete-post-dialog.tsx

lib/
├── actions/posts.ts  # Server actions
├── db/
│   ├── schema.ts     # Database schema
│   └── seed.ts       # Seed script
└── validations/      # Zod schemas
```

## Troubleshooting

**Dashboard is 404?**
- Files created correctly? Check `app/dashboard/page.tsx` exists
- Restart dev server

**Can't login?**
- Check `AUTH_SECRET` in `.env.local`
- For Google: verify OAuth credentials
- Alternative: run `npm run db:seed` for test user

**No posts showing?**
- Run `npm run db:seed` to add sample data
- Check database connection
- Verify migrations completed

**TypeScript errors?**
- Run `npm install` to ensure all deps installed
- Restart TypeScript server in your IDE

## Next Steps

📖 Read full documentation: [DASHBOARD.md](DASHBOARD.md)
🗄️ Explore database: `npm run db:studio`
🎨 Customize UI: Edit components in `components/posts/`
🔒 Add more features: Categories, comments, images, etc.

## Need Help?

- Check browser console for errors
- Check terminal for server errors
- Review [DASHBOARD.md](DASHBOARD.md) for detailed docs
- Inspect database with `npm run db:studio`
