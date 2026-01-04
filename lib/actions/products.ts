"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { actionClient } from "@/lib/safe-action";
import { productSchema, updateProductSchema, deleteProductSchema } from "@/lib/validations/product";
import { eq } from "drizzle-orm";

// Create a new product
export const createProduct = actionClient
    .schema(productSchema)
    .action(async ({ parsedInput }) => {
        const [product] = await db
            .insert(products)
            .values({
                ...parsedInput,
                updatedAt: new Date(),
            })
            .returning();

        revalidatePath("/dashboard/products");
        return { success: true, product };
    });

// Update an existing product
export const updateProduct = actionClient
    .schema(updateProductSchema)
    .action(async ({ parsedInput }) => {
        const { id, ...data } = parsedInput;

        const [product] = await db
            .update(products)
            .set({
                ...data,
                updatedAt: new Date()
            })
            .where(eq(products.id, id))
            .returning();

        revalidatePath("/dashboard/products");
        return { success: true, product };
    });

// Delete a product
export const deleteProduct = actionClient
    .schema(deleteProductSchema)
    .action(async ({ parsedInput }) => {
        const { id } = parsedInput;

        await db.delete(products).where(eq(products.id, id));

        revalidatePath("/dashboard/products");
        return { success: true };
    });

// Fetch all products (Server Action for data fetching)
export async function getProducts() {
    const allProducts = await db.query.products.findMany({
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    return allProducts;
}

// Fetch a single product
export async function getProduct(id: string) {
    const product = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, id),
    });

    return product;
}
