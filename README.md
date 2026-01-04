# Full-Stack Next.js Application

A production-ready Next.js application built with modern technologies and best practices.

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first CSS with CSS-first configuration
- **ShadCN/ui** - Beautiful UI components
- **next-themes** - Dark/light mode support
- **Lucide React** - Icon library

### Backend
- **Server Actions** - Type-safe server functions (no API routes!)
- **Neon Postgres** - Serverless Postgres database
- **Drizzle ORM** - Type-safe ORM
- **NextAuth v5** - Authentication (optional Google OAuth)
- **Zod** - Schema validation
- **next-safe-action** - Type-safe server actions

### Additional
- **react-hook-form** - Form handling
- **@hookform/resolvers** - Form validation integration
- **TanStack Table** - Advanced data tables

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Required: Add your Neon Postgres connection string
DATABASE_URL="postgresql://..."

# Required: Generate a secret key
AUTH_SECRET="generate-with: openssl rand -base64 32"

# Optional: Only if you want Google OAuth
# AUTH_GOOGLE_ID="your-google-client-id"
# AUTH_GOOGLE_SECRET="your-google-client-secret"
```

### 3. Set Up Database

Run Drizzle migrations to create database tables:

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Optional: Open Drizzle Studio to view your database
npm run db:studio
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your new **Dashboard Overview**.
Navigate to `/dashboard/posts` or `/dashboard/products` to manage content.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Dashboard Overview (Landing Page)
├── dashboard/
│   ├── posts/             # Posts management sub-route
│   └── products/          # Products management sub-route
├── components/
│   ├── ui/                # ShadCN/ui components
│   ├── providers/         # React providers (theme, etc.)
│   └── theme-toggle.tsx   # Dark/light mode toggle
├── lib/
│   ├── db/
│   │   ├── schema.ts      # Drizzle schema
│   │   ├── index.ts       # Database client
│   │   └── migrations/    # Database migrations
│   ├── actions/           # Server actions
│   ├── validations/       # Zod schemas
│   ├── auth.ts           # NextAuth configuration
│   └── safe-action.ts    # Server action utilities
└── drizzle.config.ts      # Drizzle configuration
```

## Features

### ✅ Server Actions First
- All data mutations use Server Actions (not API routes)
- Type-safe with Zod validation
- Integrated with next-safe-action

### ✅ Modern Design
- **Tailwind CSS v4**: Leveraging the latest CSS-first configuration and high-performance engine.
- **Vibrant OKLCH Colors**: Perceptually uniform color palette for stunning aesthetics.
- **Glassmorphism**: Elegant translucent headers and components with `backdrop-blur`.
- **Premium Aesthetics**: Soft shadows, mesh gradients, and silky-smooth transitions.
- **Full Responsive & Accessible**: Mobile-first design that meets WCAG AA standards.

### ✅ Type Safety
- End-to-end TypeScript
- Zod runtime validation
- Type-safe database queries with Drizzle

### ✅ Authentication Ready
- NextAuth v5 configured
- Optional Google OAuth
- Database adapter with Drizzle

### ✅ Database Ready
- Drizzle ORM setup
- Neon Postgres integration
- Example schema with users and posts
- Migration system

## Development

### Database Commands

```bash
# Generate new migration
npm run db:generate

# Apply migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio
```

### Adding ShadCN Components

```bash
npx shadcn@latest add [component-name]
```

### Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Add credentials to `.env.local`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

- `DATABASE_URL` - Neon Postgres connection string
- `AUTH_SECRET` - Generate new secret for production
- `AUTH_GOOGLE_ID` - (Optional) Google OAuth client ID
- `AUTH_GOOGLE_SECRET` - (Optional) Google OAuth client secret
- `NEXT_PUBLIC_APP_URL` - Your production URL

## Best Practices

1. **Use Server Actions** - Avoid API routes, use Server Actions for all data operations
2. **Validate Everything** - Use Zod schemas for both client and server validation
3. **Type Safety** - Leverage TypeScript and Drizzle for end-to-end type safety
4. **Server Components** - Default to Server Components, use Client Components only when needed
5. **Modern Design** - Follow the design principles (soft shadows, good typography, accessibility)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [NextAuth Docs](https://authjs.dev)
- [ShadCN/ui Docs](https://ui.shadcn.com)
- [next-safe-action Docs](https://next-safe-action.dev)

## License

MIT
