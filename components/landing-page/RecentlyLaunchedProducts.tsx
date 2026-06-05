import { getRecentlyLaunchedProducts } from "@/lib/products/products-select";
import { ProductCard } from "../products/ProductCard";
import Link from "next/link";
import { RocketIcon, InboxIcon } from "lucide-react";

export default async function RecentlyLaunchedProducts() {
  const products = await getRecentlyLaunchedProducts();

  return (
    <div className="relative w-full max-w-5xl mx-auto border border-border bg-card p-3 sm:p-5 shadow-2xl transition-all duration-500 hover:border-primary/30 mt-8 mb-16">
      {/* Mock Header Console */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className="size-2 bg-primary/60 animate-pulse" />
          <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider uppercase">
            Recently Launched
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase">
            <RocketIcon className="size-3 text-primary animate-bounce" />
            Live Builds
          </span>
        </div>
      </div>

      {/* Main Content */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-dashed border-border/70 bg-background/50 py-16 px-4 text-center">
          <div className="bg-card p-4 border border-border mb-4 text-muted-foreground/80">
            <InboxIcon className="size-6 stroke-[1.5]" />
          </div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider mb-1 text-foreground">
            No Recent Launches
          </h3>
          <p className="text-[11px] text-muted-foreground/75 max-w-[280px] leading-relaxed font-mono">
            Check back later for fresh projects and catalog submissions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}