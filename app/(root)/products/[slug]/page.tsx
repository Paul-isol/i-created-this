import { Suspense } from "react";
import ProductDynamicSection from "@/components/products/ProductDynamicSection";
import ProductViewSkeleton from "@/components/products/ProductViewSkeleton";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={
      <ProductViewSkeleton />
    }>
      <ProductDynamicSection params={params} />
    </Suspense>
  );
}