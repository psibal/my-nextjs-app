import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { PostsTable } from "@/components/posts/posts-table";
import { CreatePostDialog } from "@/components/posts/create-post-dialog";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, LayoutDashboard, Package, Sparkles, Files } from "lucide-react";
import { desc } from "drizzle-orm";

export default async function PostsManagementPage() {
  const session = await auth();
  const requireAuth = process.env.REQUIRE_AUTH === "true";
  const allowAnonymousPosts = process.env.ALLOW_ANONYMOUS_POSTS === "true";

  if (requireAuth && !session?.user) {
    redirect("/login");
  }

  const allPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    with: {
      author: {
        columns: {
          name: true,
          email: true,
        },
      },
    },
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
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-all"
              >
                <LayoutDashboard className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/posts"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background shadow-sm text-foreground"
              >
                <Files className="h-4 w-4 text-primary" />
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
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
              Management
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">Posts</h2>
            <p className="mt-1 text-muted-foreground text-lg">
              {session?.user || allowAnonymousPosts ? "Craft and manage your published content" : "Browse all published stories"}
            </p>
          </div>
          {(session?.user || allowAnonymousPosts) && <CreatePostDialog />}
        </div>

        <div className="rounded-2xl border border-border/50 bg-glass p-1 backdrop-blur-xl shadow-2xl shadow-black/5">
          <div className="bg-background/80 rounded-[11px] overflow-hidden">
            <PostsTable
              data={allPosts}
              currentUserId={session?.user?.id}
              allowAnonymous={allowAnonymousPosts}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
