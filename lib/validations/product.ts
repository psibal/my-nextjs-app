import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    description: z.string().optional().nullable(),
    price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    imageUrl: z.string().url("Invalid image URL").optional().nullable().or(z.literal("")),
    published: z.boolean(),
});

export const updateProductSchema = productSchema.extend({
    id: z.string().uuid("Invalid product ID"),
});

export const deleteProductSchema = z.object({
    id: z.string().uuid("Invalid product ID"),
});

export type ProductFormData = z.infer<typeof productSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type DeleteProductFormData = z.infer<typeof deleteProductSchema>;
