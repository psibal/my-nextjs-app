# Anonymous Posts Mode

## Overview

The dashboard now supports **Anonymous Posts Mode** - a feature that allows users to create, edit, and delete posts without requiring authentication. This is perfect for:

- 🎨 Demos and prototypes with a premium, high-end design
- 🧪 Local development and testing
- 📝 Simple blogs with modern aesthetics (glassmorphism/OKLCH)
- 🎓 Learning projects with the latest tech stack
- 🚀 Quick MVPs that look professional out of the box

## How It Works

When `ALLOW_ANONYMOUS_POSTS="true"` is set in your environment:

1. ✅ Anyone can create posts (no sign-in required)
2. ✅ Anyone can edit any post
3. ✅ Anyone can delete any post
4. ✅ Posts are attributed to an "Anonymous User"
5. ✅ "New Post" button shows for everyone
6. ✅ Edit/Delete actions appear on all posts

## Setup

Add to your `.env.local`:

```env
ALLOW_ANONYMOUS_POSTS="true"
```

That's it! No other configuration needed.

## Security Considerations

⚠️ **IMPORTANT**: This mode is **NOT recommended for production** unless you understand the implications:

### What This Means:
- **No ownership control** - Anyone can modify anyone's posts
- **No audit trail** - You can't track who made changes
- **Spam risk** - No barrier to creating posts
- **Data integrity** - Posts can be deleted by anyone

### When to Use:
✅ **Safe for:**
- Local development
- Internal tools behind a firewall
- Personal projects
- Prototypes and demos
- Learning/tutorial projects

❌ **NOT safe for:**
- Public-facing production sites
- Multi-user applications
- Any app requiring accountability
- Sites with sensitive content
- Applications requiring moderation

## Three Operating Modes

Your dashboard can operate in three different modes:

### Mode 1: Anonymous Posts (No Auth Required)
```env
ALLOW_ANONYMOUS_POSTS="true"
REQUIRE_AUTH="false"
```
- Anyone can visit the Dashboard Overview (/)
- Anyone can manage content at `/dashboard/posts`
- Anyone can create/edit/delete posts
- No sign-in required
- Perfect for demos

### Mode 2: Public Read, Auth for Write
```env
ALLOW_ANONYMOUS_POSTS="false"  # or omit
REQUIRE_AUTH="false"
```
- Anyone can view posts
- Must sign in to create/edit/delete
- Users can only edit their own posts
- Good for blogs with guest viewing

### Mode 3: Full Authentication
```env
ALLOW_ANONYMOUS_POSTS="false"  # or omit
REQUIRE_AUTH="true"
```
- Must sign in to access dashboard
- Users can only edit their own posts
- Most secure option
- Best for production

## How Posts Are Attributed

In anonymous mode, posts are created under an "Anonymous User" account:

```typescript
{
  name: "Anonymous User",
  email: "anonymous@example.com"
}
```

This user is automatically created when the first anonymous post is made.

## Migration Path

### From Anonymous to Authenticated

If you start with anonymous mode and later want authentication:

1. Set `ALLOW_ANONYMOUS_POSTS="false"`
2. All existing posts will remain (attributed to Anonymous User)
3. New posts require authentication
4. Users can only edit posts they created while authenticated

### Cleaning Up Anonymous Posts

To remove all anonymous posts:

```sql
-- Find anonymous user ID
SELECT id FROM users WHERE email = 'anonymous@example.com';

-- Delete posts by anonymous user
DELETE FROM posts WHERE author_id = '<anonymous-user-id>';
```

Or use Drizzle Studio (`npm run db:studio`) to manually delete posts.

## Implementation Details

### Server Actions

All three CRUD operations check the `ALLOW_ANONYMOUS_POSTS` flag:

**createPost:**
- If authenticated → Use user's ID as author
- If anonymous mode → Use Anonymous User as author
- Otherwise → Throw error

**updatePost:**
- If anonymous mode + not logged in → Allow editing any post
- If authenticated → Only allow editing own posts
- If anonymous mode disabled → Require auth

**deletePost:**
- Same logic as updatePost

### Frontend

**Dashboard:**
- Shows "New Post" button if authenticated OR anonymous mode enabled
- Passes `allowAnonymous` prop to PostsTable

**PostsTable:**
- Shows edit/delete actions if user owns post OR anonymous mode enabled
- Actions appear on ALL posts in anonymous mode

## Best Practices

### For Development:
```env
# Maximum flexibility for local dev
ALLOW_ANONYMOUS_POSTS="true"
REQUIRE_AUTH="false"
```

### For Production Blog (Guest Viewing):
```env
# Public can read, auth to write
ALLOW_ANONYMOUS_POSTS="false"
REQUIRE_AUTH="false"
# Configure Google OAuth
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

### For Production App (Fully Protected):
```env
# Must auth for everything
ALLOW_ANONYMOUS_POSTS="false"
REQUIRE_AUTH="true"
# Configure Google OAuth
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

## Testing Anonymous Mode

1. Set `ALLOW_ANONYMOUS_POSTS="true"` in `.env.local`
2. Restart your dev server
3. Visit the Dashboard Overview at `/` (no login needed)
4. Navigate to `/dashboard/posts` to manage content
4. Click "New Post"
5. ✅ Create, edit, and delete posts without signing in!

## FAQ

**Q: Can I have some users authenticated and some anonymous?**
A: Yes! If `ALLOW_ANONYMOUS_POSTS="true"`, both authenticated and non-authenticated users can create posts. Authenticated users' posts show their name, anonymous posts show "Anonymous User".

**Q: Can authenticated users edit anonymous posts?**
A: No, even in anonymous mode, authenticated users can only edit their own posts. Only non-authenticated visitors can edit all posts.

**Q: What happens if I disable anonymous mode after creating posts?**
A: All posts remain. The "Anonymous User" posts can only be edited/deleted if you re-enable anonymous mode or use database tools.

**Q: Is this secure enough for a simple personal blog?**
A: If it's truly personal (only you access it), yes. But if it's public, consider requiring authentication for write operations.

**Q: Can I delete the Anonymous User?**
A: You can, but you'll need to delete or reassign all their posts first due to foreign key constraints.

## Alternative Approaches

If you need more control but don't want full authentication:

### Option 1: Password Protection
Add simple password middleware (not implemented, but possible):
```typescript
// Check for admin password before allowing writes
if (process.env.ADMIN_PASSWORD) {
  // require password for mutations
}
```

### Option 2: IP Whitelisting
Restrict by IP address (requires infrastructure setup)

### Option 3: API Keys
Require API key for mutations (would need custom implementation)

For now, anonymous mode is all-or-nothing for simplicity.

## Summary

Anonymous Posts Mode is a powerful feature for demos and local development, but should be used carefully in production. Choose the mode that matches your security requirements:

- 🟢 **Anonymous Mode**: Fast setup, no auth needed, perfect for demos
- 🟡 **Hybrid Mode**: Public reading, auth for writing, good for blogs
- 🔴 **Protected Mode**: Full auth required, best for production apps
