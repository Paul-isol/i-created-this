import { getProductsBySlug, getUserLikedProductIds } from "@/lib/products/products-select";
import { updateProductViews } from "@/lib/products/product-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import ProductDetailView from "./ProductDetailView";

export default async function ProductDynamicSection({ slug }: { slug: string }) {
  const product = await getProductsBySlug(slug);

  if (!product) {
    notFound();
  }

  // Increment view count (dynamic, needs DB connection)
  await updateProductViews(product.id);

  // Check if the current user has liked this product
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const likedIds = session?.user?.id
    ? await getUserLikedProductIds(session.user.id)
    : new Set<number>();
  const hasLiked = likedIds.has(product.id);

  return <ProductDetailView product={product} hasLiked={hasLiked} />;
}
