import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts, products } from "@/lib/db/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  LogOut,
  LogIn,
  LayoutDashboard,
  Package,
  Sparkles,
  Files,
  ArrowRight,
  TrendingUp,
  Clock,
  Plus
} from "lucide-react";
import { count, desc } from "drizzle-orm";

export default async function DashboardOverview() {
  const session = await auth();

  // Fetch stats
  const [postsCount] = await db.select({ value: count() }).from(posts);
  const [productsCount] = await db.select({ value: count() }).from(products);

  const recentPosts = await db.query.posts.findMany({
    limit: 3,
    orderBy: [desc(posts.createdAt)],
  });

  return (
    <div className="min-h-screen bg-background/50 selection:bg-primary/30">
      <div className="mesh-gradient opacity-40" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-glass backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden text-xl font-bold tracking-tight sm:inline-block italic">Antigravity</span>
            </Link>

            <nav className="flex items-center gap-1 text-sm font-medium bg-muted/50 p-1 rounded-xl border border-border/50">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background shadow-sm text-foreground"
              >
                <LayoutDashboard className="h-4 w-4 text-primary" />
                Overview
              </Link>
              <Link
                href="/dashboard/posts"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                <Files className="h-4 w-4" />
                Posts
              </Link>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <span className="hidden text-sm font-medium text-muted-foreground lg:block">
                {session.user.name || session.user.email}
              </span>
            )}
            <ThemeToggle />
            {session?.user ? (
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button variant="outline" size="sm" type="submit" className="rounded-full shadow-sm hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </form>
            ) : (
              <Button variant="outline" size="sm" asChild className="rounded-full shadow-sm">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
            Dashboard
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">Overview</h2>
          <p className="mt-1 text-muted-foreground text-lg">
            Welcome back. Here&apos;s what&apos;s happening with your projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5 group hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
              <Files className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{postsCount.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>Active publications</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5 group hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
              <Package className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{productsCount.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>Digital assets</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5 group hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
              <Sparkles className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">Optimal</div>
              <p className="text-xs text-muted-foreground mt-1">All services operational</p>
            </CardContent>
          </Card>

          <Card className="bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5 group hover:-translate-y-1 transition-transform">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Session</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{session?.user ? "Authenticated" : "Public"}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {session?.user ? session.user.email : "Limited access"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-7">
          {/* Recent Posts */}
          <Card className="lg:col-span-4 bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/10">
              <div>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Latest updates to your content library</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild className="rounded-full">
                <Link href="/dashboard/posts">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/10">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-4 flex items-center justify-between hover:bg-primary/5 transition-colors group">
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()} • {post.published ? "Published" : "Draft"}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-3 bg-glass backdrop-blur-xl border-none shadow-xl shadow-black/5">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and management tools</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button asChild className="w-full justify-start h-12 rounded-xl group" variant="outline">
                <Link href="/dashboard/posts">
                  <Plus className="mr-2 h-5 w-5 text-primary group-hover:scale-125 transition-transform" />
                  Create New Post
                </Link>
              </Button>
              <Button asChild className="w-full justify-start h-12 rounded-xl group" variant="outline">
                <Link href="/dashboard/products">
                  <Package className="mr-2 h-5 w-5 text-primary group-hover:scale-125 transition-transform" />
                  Add New Product
                </Link>
              </Button>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h5 className="text-sm font-semibold text-primary mb-1">Production Ready</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your application is optimized and ready for scaling. Monitor your performance in the Vercel dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
