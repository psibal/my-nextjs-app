import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth";

// Base action client
export const actionClient = createSafeActionClient();

// Authenticated action client - throws error if user not logged in
export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized - Please sign in");
  }

  return next({
    ctx: {
      userId: session.user.id!,
      user: session.user,
    },
  });
});
