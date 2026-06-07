import { RocketIcon } from "lucide-react";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductSkeleton() {
  return (
    <div className="relative w-full max-w-5xl mx-auto border border-border bg-card p-3 sm:p-5 shadow-2xl transition-all duration-500 hover:border-primary/30 mt-8 mb-16">
      {/* Mock Header Console */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className="size-2 bg-primary/40 animate-pulse" />
          <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider uppercase">
            Loading recently_launched...
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase">
            <RocketIcon className="size-3 text-primary animate-bounce" />
            Live Builds
          </span>
        </div>
      </div>

      {/* Main Content Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}