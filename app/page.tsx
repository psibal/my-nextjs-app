import Link from "next/link";
import { ArrowRight, CheckCircle2, Database, Lock, Palette, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <div className="mesh-gradient opacity-60" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/20 bg-glass backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Antigravity</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="#tech-stack" className="text-muted-foreground hover:text-foreground transition-colors">Stack</Link>
            </nav>
            <div className="h-6 w-px bg-border/50" />
            <ThemeToggle />
            <Button size="sm" asChild className="hidden sm:flex">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24 md:py-32">
          <div className="relative flex flex-col items-center text-center">
            {/* Background Glow */}
            <div className="absolute -top-24 -z-10 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[120px]" />

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              <span>Next.js 15 + Tailwind CSS v4</span>
            </div>

            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl">
              Elevate Your Next.js
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent pb-2">
                Development Experience
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              A premium, type-safe starter template built for speed, scalability, and
              sheer visual excellence. Start building the future today.
            </p>

            <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="rounded-full px-8 text-base shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 text-base border-border/50 bg-background/50 backdrop-blur-sm transition-transform hover:-translate-y-1">
                <Link href="/dashboard">Access Dashboard</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="container mx-auto px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Engineered for Performance</h2>
            <p className="mt-4 text-muted-foreground text-lg">Every detail crafted to perfection</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <CardTitle>Turbocharged Actions</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Type-safe server actions with next-safe-action and robust Zod validation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle>Drizzle ORM</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Lighting fast database queries with Neon Postgres and type-safe schema.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Lock className="h-6 w-6" />
                </div>
                <CardTitle>Auth.js v5</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Modern authentication with battle-tested security and OAuth support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Palette className="h-6 w-6" />
                </div>
                <CardTitle>OKLCH Colors</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Perceptually uniform color spaces for consistent and vibrant UI design.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <CardTitle>Form Master</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Perfectly synchronized forms with React Hook Form and Shadcn/ui.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group border-none bg-glass transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle>Modern Stack</CardTitle>
                <CardDescription className="text-base text-muted-foreground/80">
                  Built with React 19, TypeScript 5, and the latest Next.js features.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Tech Stack Details */}
        <section id="tech-stack" className="container mx-auto px-6 py-24">
          <Card className="overflow-hidden border-none bg-glass backdrop-blur-xl">
            <div className="grid md:grid-cols-2">
              <div className="p-12">
                <h3 className="text-3xl font-bold tracking-tight">Everything You Need</h3>
                <p className="mt-4 text-muted-foreground">The ultimate foundation for your next big idea.</p>

                <div className="mt-8 space-y-4">
                  {[
                    "Next.js 15 (App Router)",
                    "React 19 (Server Components)",
                    "Tailwind CSS v4 (Early Adopter)",
                    "Drizzle ORM & Neon Postgres",
                    "Auth.js v5 (Beta)",
                    "TypeScript 5 & Zod"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative bg-primary/5 p-12 flex items-center justify-center overflow-hidden">
                <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-primary/10 blur-[80px]" />
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-16 w-16 rounded-full border-4 border-background bg-muted shadow-xl" />
                    ))}
                  </div>
                  <div className="rounded-2xl border border-primary/20 bg-background/80 p-6 shadow-2xl backdrop-blur-md">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      <span className="text-sm font-semibold">Project Healthy</span>
                    </div>
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[85%] bg-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-muted/30 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">Antigravity</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Antigravity. Built with ❤️ for the Next.js community.
          </p>
        </div>
      </footer>
    </div>
  );
}
