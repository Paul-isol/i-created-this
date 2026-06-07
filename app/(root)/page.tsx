import Hero from "@/components/landing-page/Hero";
import RecentlyLaunchedProducts from "@/components/landing-page/RecentlyLaunchedProducts";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </>
  );
}
