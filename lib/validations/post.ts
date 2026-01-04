import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().optional(),
  published: z.boolean(),
});

export const updatePostSchema = postSchema.extend({
  id: z.string().uuid("Invalid post ID"),
});

export const deletePostSchema = z.object({
  id: z.string().uuid("Invalid post ID"),
});

export type PostFormData = z.infer<typeof postSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>;
export type DeletePostFormData = z.infer<typeof deletePostSchema>;
