import { z } from "zod"

export const productSchema = z.object({
    name: z.string()
        .min(3, "Product name must be at least 3 characters long")
        .max(100, "Product name cannot exceed 100 characters"),

    slug: z.string()
        .min(3, "Slug must be at least 3 characters long")
        .max(100, "Slug cannot exceed 100 characters")
        .refine((slug) => /^[a-zA-Z0-9-]+$/.test(slug), "Slug can only contain letters, numbers, and hyphens"),

    tagline: z.string()
        .min(3, "Tagline must be at least 3 characters long")
        .max(100, "Tagline cannot exceed 100 characters"),

    description: z.string().optional(),

    websiteUrl: z.url("Please provide a valid website URL"),

    tags: z.string()
        .min(1, "Please provide at least one tag")
        .transform((val) => val.split(",").map((tag) => tag.trim().toLowerCase()).filter(Boolean))
        .refine((tags) => {
            const uniqueTags = new Set(tags);
            return uniqueTags.size === tags.length;
        }, "Tags must be unique")
})