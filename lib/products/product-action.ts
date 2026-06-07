"use server"

import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath, updateTag } from "next/cache";
import { productSchema } from "./product-validation";
import db from "../db";
import { z } from "zod";

type FormState = {
    success: boolean;
    errors?: Record<string, string[]>;
    message: string;
    fields?: Record<string, string>;
}

export async function addProductAction(prevState: FormState, formData: FormData): Promise<FormState> {
    // raw data parsed early to preserve on any failure path
    const rawData = Object.fromEntries(formData.entries());
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(rawData)) {
        fields[key] = value.toString();
    }

    try {
        // check if the user is logged in
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return {
                success: false,
                errors: {},
                message: "You must be logged in to add a product",
                fields
            }
        }

        // validate form data
        const validatedData = productSchema.safeParse(rawData)

        // check for validation errors
        if(!validatedData.success){
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Validation failed",
                fields
            }
        }

        const {name, slug, tagline, description, websiteUrl, tags} = validatedData.data;

        await db.product.create({
            data: {
                name,
                slug,
                tagline,
                description,
                websiteUrl,
                tags,
                status: "pending",
                submittedBy: session.user.email || "anonymous",
                userId: session.user.id,
                organizationId: session.session.activeOrganizationId
            }
        })
        
        return {
            success: true,
            errors: {},
            message: "Product added successfully"
        }

    } catch (error) {
        if(error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Validation failed",
                fields
            }
        }
        return {
            success: false,
            errors: {},
            message: "Failed to add Product",
            fields
        }
    }
}

export async function likeProductAction(productId: number) {
    try {
        // check if the user is logged in
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session) {
            return {
                success: false,
                message: "You must be logged in to like a product",
            }
        }

        const userId = session.user.id;

        // Check if user already liked this product
        const existingLike = await db.productLike.findUnique({
            where: {
                userId_productId: { userId, productId }
            }
        })

        if (existingLike) {
            // Unlike: delete the like row and decrement the counter
            const [_, updatedProduct] = await db.$transaction([
                db.productLike.delete({
                    where: { id: existingLike.id }
                }),
                db.product.update({
                    where: { id: productId },
                    data: { likes: { decrement: 1 } }
                })
            ])

            updateTag(`product-id-${productId}`)
            updateTag(`product-slug-${updatedProduct.slug}`)
            updateTag("featured-products")
            revalidatePath("/")
            revalidatePath(`/products/${updatedProduct.slug}`)

            return {
                success: true,
                liked: false,
                message: "Product unliked"
            }
        } else {
            // Like: create the like row and increment the counter
            const [_, updatedProduct] = await db.$transaction([
                db.productLike.create({
                    data: { userId, productId }
                }),
                db.product.update({
                    where: { id: productId },
                    data: { likes: { increment: 1 } }
                })
            ])

            updateTag(`product-id-${productId}`)
            updateTag(`product-slug-${updatedProduct.slug}`)
            updateTag("featured-products")
            revalidatePath("/")
            revalidatePath(`/products/${updatedProduct.slug}`)

            return {
                success: true,
                liked: true,
                message: "Product liked"
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to update like",
            error: error
        }
    }
}
export async function updateProductViews(productId: number) {
    try {
        await db.product.update({
            where: { id: productId },
            data: {
                views: {
                    increment: 1
                }
            }
        })
        return {
            success: true,
            errors: {},
            message: "Product views updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Failed to update product views",
            error: error
        }
    }
}