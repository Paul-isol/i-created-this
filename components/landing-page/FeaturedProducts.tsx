"use cache"
import { ArrowRightCircleIcon } from "lucide-react";
import { ProductCard } from "../products/ProductCard";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products/products-select";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  
  return (
    <div className="relative w-full max-w-5xl mx-auto border border-border bg-card p-3 sm:p-5 shadow-2xl transition-all duration-500 hover:border-primary/30">
      {/* Mock Header Console */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className="size-2 bg-destructive/60" />
          <div className="size-2 bg-yellow-500/60" />
          <div className="size-2 bg-green-500/60" />
          <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider">
            Featured Today
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
            <ArrowRightCircleIcon className="size-3 text-primary animate-pulse" />
            Show All
          </span>
        </div>
      </div>

      {/* Simulated Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
