# Dashboard Documentation

This document explains the dashboard implementation and how to use it.

## Overview

The dashboard provides a complete CRUD interface for managing blog posts. It includes:

- **Authentication**: Protected routes requiring user login
- **Posts Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Tailwind CSS v4**: Modern, CSS-first configuration and high-performance engine
- **Premium Design**: OKLCH colors, glassmorphism, and mesh gradients
- **Data Table**: Advanced table with sorting, filtering, and pagination using TanStack Table
- **Form Validation**: Type-safe forms with react-hook-form and Zod
- **Server Actions**: Backend mutations without API routes

## File Structure

```
app/
├── dashboard/
│   ├── page.tsx          # Main dashboard page
│   ├── loading.tsx       # Loading skeleton
│   └── error.tsx         # Error boundary
├── login/
│   └── page.tsx          # Login page
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts  # NextAuth API handler

components/
└── posts/
    ├── posts-table.tsx           # TanStack Table implementation
    ├── create-post-dialog.tsx    # Create new post
    ├── edit-post-dialog.tsx      # Edit existing post
    └── delete-post-dialog.tsx    # Delete confirmation

lib/
├── actions/
│   └── posts.ts          # Server actions (already existed)
├── validations/
│   └── post.ts           # Zod schemas (already existed)
└── db/
    ├── schema.ts         # Database schema (already existed)
    └── seed.ts           # Seed script for test data
```

## Getting Started

### 1. Database Setup

Make sure you have your Neon Postgres database configured in `.env.local`:

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="your-secret-key"
```

Generate the auth secret:
```bash
openssl rand -base64 32
```

### 2. Run Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 3. Seed Test Data (Optional)

Since Google Auth is optional, you can create a test user and sample posts:

```bash
npm run db:seed
```

This creates:
- Test user: `test@example.com`
- 5 sample blog posts (4 published, 1 draft)

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` and click "View Dashboard"

## Authentication

### Option 1: Google OAuth (Optional)

Add to `.env.local`:
```env
AUTH_GOOGLE_ID="your-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="your-client-secret"
```

### Option 2: Use Seeded Test User

After running `npm run db:seed`, you can manually create a session in your database, or add the user through the NextAuth sign-in flow.

### Option 3: Add User Manually

Use Drizzle Studio to add a user:
```bash
npm run db:studio
```

Navigate to the `users` table and add a new user with:
- `email`: your email
- `emailVerified`: current timestamp (optional)

## Features

### Posts Table

The posts table includes:

- **Sorting**: Click column headers to sort by Title or Created Date
- **Filtering**: Search posts by title using the filter input
- **Pagination**: Navigate through posts with Previous/Next buttons
- **Status Badges**: Visual indicators for Published/Draft status
- **Actions Menu**: Edit or Delete posts from the dropdown menu

### Create Post

Click "New Post" button to open the create dialog:

1. **Title** (required): Post title, max 200 characters
2. **Content** (optional): Post content, markdown supported
3. **Published** (toggle): Make post visible to others

### Edit Post

Click the actions menu (⋯) on any post row and select "Edit":

- Pre-filled form with existing post data
- Same validation as create form
- Updates timestamp on save

### Delete Post

Click the actions menu (⋯) and select "Delete":

- Confirmation dialog to prevent accidental deletion
- Permanent deletion (no undo)
- Shows post title for verification

## Database Schema

### Posts Table

```typescript
posts {
  id: uuid (primary key)
  title: text (required, max 200 chars)
  content: text (optional)
  published: boolean (default: false)
  authorId: uuid (foreign key to users)
  createdAt: timestamp (auto)
  updatedAt: timestamp (auto)
}
```

### Users Table (NextAuth)

```typescript
users {
  id: uuid (primary key)
  name: text
  email: text (unique, required)
  emailVerified: timestamp
  image: text
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Server Actions

All mutations use Next.js Server Actions defined in [lib/actions/posts.ts](lib/actions/posts.ts):

- `createPost(data)` - Create new post
- `updatePost(data)` - Update existing post
- `deletePost({ id })` - Delete post
- `getUserPosts(userId)` - Fetch user's posts

All actions include:
- Authentication checks
- Zod validation
- Type safety
- Automatic revalidation

## Security

### Page Protection

- Dashboard routes check for authentication at the page level
- Unauthenticated users are redirected to `/login` if `REQUIRE_AUTH="true"`
- All server actions verify user authentication individually

### Data Validation

- Client-side validation with react-hook-form
- Server-side validation with Zod schemas
- Type-safe throughout the stack

### Authorization

- Users can only edit/delete their own posts
- Post ownership verified in server actions
- Author ID automatically set from session

## Extending the Dashboard

### Add New Fields

1. Update database schema in [lib/db/schema.ts](lib/db/schema.ts)
2. Run `npm run db:generate` and `npm run db:migrate`
3. Update Zod schema in [lib/validations/post.ts](lib/validations/post.ts)
4. Add form fields to create/edit dialogs
5. Update table columns if needed

### Add Categories/Tags

Example:
```typescript
// In schema.ts
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

// Add to posts table
categoryId: uuid("category_id").references(() => categories.id),
```

### Add Search

The posts table already supports basic filtering. For full-text search:

1. Add search index to database
2. Create search server action
3. Update table filter to use search action

## Troubleshooting

### Dashboard shows 404
- Make sure you created the dashboard files in `app/dashboard/`
- Restart dev server

### Can't login
- Check `.env.local` has `AUTH_SECRET`
- Verify Google OAuth credentials if using
- Try seeding test user with `npm run db:seed`

### Posts not showing
- Check database connection
- Verify migrations ran successfully
- Ensure user is authenticated
- Check browser console for errors

### Form validation errors
- Check required fields (title is required)
- Verify title is under 200 characters
- Check server console for detailed errors

## Performance

- Posts are fetched server-side (no client-side requests)
- Table operations (sort/filter) happen client-side
- Mutations use Server Actions with automatic revalidation
- Loading states prevent layout shift

## Next Steps

Consider adding:
- Rich text editor for content
- Image uploads
- Categories and tags
- Comments system
- Post analytics
- RSS feed
- Share to social media
- SEO metadata
