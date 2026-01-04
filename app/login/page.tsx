import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome } from "lucide-react";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  const hasGoogleAuth =
    process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasGoogleAuth ? (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/" });
              }}
            >
              <Button type="submit" className="w-full" size="lg">
                <Chrome className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200">
                <p className="font-semibold">Google OAuth not configured</p>
                <p className="mt-1">
                  To enable Google sign-in, add the following to your{" "}
                  <code className="rounded bg-yellow-100 px-1 py-0.5 dark:bg-yellow-900/40">
                    .env.local
                  </code>{" "}
                  file:
                </p>
                <pre className="mt-2 overflow-x-auto rounded bg-yellow-100 p-2 text-xs dark:bg-yellow-900/40">
                  AUTH_GOOGLE_ID=your_google_client_id{"\n"}
                  AUTH_GOOGLE_SECRET=your_google_client_secret
                </pre>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>For development, you can also add a test user directly to your database.</p>
              </div>
            </div>
          )}

          <div className="text-center text-xs text-muted-foreground">
            <p>
              By signing in, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
