"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/auth";
import { postSchema, updatePostSchema, deletePostSchema } from "@/lib/validations/post";
import { eq } from "drizzle-orm";

const allowAnonymousPosts = process.env.ALLOW_ANONYMOUS_POSTS === "true";

// Helper to get or create anonymous user
async function getOrCreateAnonymousUser() {
  const [anonymousUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, "anonymous@example.com"))
    .limit(1);

  if (anonymousUser) {
    return anonymousUser;
  }

  // Create anonymous user if doesn't exist
  const [newUser] = await db
    .insert(users)
    .values({
      name: "Anonymous User",
      email: "anonymous@example.com",
      emailVerified: new Date(),
    })
    .returning();

  return newUser;
}

// Create a new post (works with or without auth if anonymous posts allowed)
export const createPost = actionClient
  .schema(postSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth();
    let authorId: string;

    if (session?.user?.id) {
      // User is authenticated, use their ID
      authorId = session.user.id;
    } else if (allowAnonymousPosts) {
      // Anonymous posts allowed, use anonymous user
      const anonymousUser = await getOrCreateAnonymousUser();
      authorId = anonymousUser.id;
    } else {
      throw new Error("Authentication required to create posts");
    }

    const [post] = await db
      .insert(posts)
      .values({
        ...parsedInput,
        authorId,
      })
      .returning();

    revalidatePath("/dashboard");
    return { success: true, post };
  });

// Update an existing post (works with or without auth if anonymous posts allowed)
export const updatePost = actionClient
  .schema(updatePostSchema)
  .action(async ({ parsedInput }) => {
    const { id, ...data } = parsedInput;
    const session = await auth();

    // Check if post exists
    const existingPost = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    // Verify permissions
    if (!allowAnonymousPosts) {
      // If anonymous posts not allowed, must be authenticated and own the post
      if (!session?.user?.id) {
        throw new Error("Authentication required");
      }
      if (existingPost.authorId !== session.user.id) {
        throw new Error("You don't have permission to edit this post");
      }
    } else if (session?.user?.id) {
      // If logged in, can only edit own posts (even in anonymous mode)
      if (existingPost.authorId !== session.user.id) {
        throw new Error("You don't have permission to edit this post");
      }
    }
    // If anonymous mode and not logged in, allow editing any post

    const [post] = await db
      .update(posts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    revalidatePath("/dashboard");
    return { success: true, post };
  });

// Delete a post (works with or without auth if anonymous posts allowed)
export const deletePost = actionClient
  .schema(deletePostSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;
    const session = await auth();

    // Check if post exists
    const existingPost = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    // Verify permissions
    if (!allowAnonymousPosts) {
      // If anonymous posts not allowed, must be authenticated and own the post
      if (!session?.user?.id) {
        throw new Error("Authentication required");
      }
      if (existingPost.authorId !== session.user.id) {
        throw new Error("You don't have permission to delete this post");
      }
    } else if (session?.user?.id) {
      // If logged in, can only delete own posts (even in anonymous mode)
      if (existingPost.authorId !== session.user.id) {
        throw new Error("You don't have permission to delete this post");
      }
    }
    // If anonymous mode and not logged in, allow deleting any post

    await db.delete(posts).where(eq(posts.id, id));

    revalidatePath("/dashboard");
    return { success: true };
  });

// Get user's posts (Server Action for data fetching)
export async function getUserPosts(userId: string) {
  const userPosts = await db.query.posts.findMany({
    where: (posts, { eq }) => eq(posts.authorId, userId),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });

  return userPosts;
}
