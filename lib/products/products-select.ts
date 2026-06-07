import { connection } from "next/server";
import db from "../db";

export async function getFeaturedProducts() {
    "use cache"
    const products = await db.product.findMany({
        where: {
            status: "approved"
        },
        orderBy: {
            likes: "desc"
        }
    })

    return products
}

export async function getAllProducts(){
    const productsData = await db.product.findMany({
        where: {status: "approved"},
        orderBy: {
            createdAt: "desc"
        }
    })
    return productsData
}

export async function getProductsBySlug(slug: string) {
    "use cache"
    const product = await db.product.findUnique({
        where: {
            slug: slug
        }
    })

    return product
}

export async function getRecentlyLaunchedProducts() {
    await connection()
    const productsData = await getFeaturedProducts()
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return productsData.filter(
        (product) =>
            product.createdAt && new Date(product.createdAt.toISOString()) >= oneWeekAgo
    )
}

export async function getUserProducts(userId: string) {
    "use cache"
    const userProducts = await db.product.findMany({
        where: {
            userId: userId
        }
    })
    return userProducts
}

export async function getUserLikedProductIds(userId: string): Promise<Set<number>> {
    const likes = await db.productLike.findMany({
        where: { userId },
        select: { productId: true }
    })
    return new Set(likes.map((like) => like.productId))
}
