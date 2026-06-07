"use client";

import { useState } from "react";
import { Product } from "@/lib/generated/prisma/client";
import { ProductCard } from "../products/ProductCard";
import { PackageOpen, PlusCircle, LayoutGrid, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function UserProductsList({ products, likedProductIds = [] }: { products: Product[]; likedProductIds?: number[] }) {
  const likedSet = new Set(likedProductIds);
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all");

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    return product.status === filter;
  });

  const countApproved = products.filter((p) => p.status === "approved").length;
  const countPending = products.filter((p) => p.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-5 text-primary" />
          <h2 className="font-heading text-lg font-black uppercase tracking-wider text-foreground">
            My Creations
          </h2>
        </div>
        
        {products.length > 0 && (
          <Link href="/submit" className="shrink-0">
            <Button size="sm" className="h-8 font-mono text-[10px] font-bold uppercase tracking-wider rounded-none">
              <PlusCircle className="size-3.5 mr-1" />
              New Product
            </Button>
          </Link>
        )}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-border/80 bg-background/40">
          <div className="bg-card p-4 border border-border mb-4 text-muted-foreground/80">
            <PackageOpen className="size-6 stroke-[1.5]" />
          </div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider mb-1 text-foreground">
            No Creations Yet
          </h3>
          <p className="text-[11px] text-muted-foreground/75 max-w-[280px] leading-relaxed font-mono mb-6">
            You haven&apos;t submitted any projects to the developer showcase yet.
          </p>
          <Link href="/submit">
            <Button className="font-mono text-[10px] font-bold uppercase tracking-widest rounded-none">
              Submit Your First Product &rarr;
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-wrap gap-2 border-b border-border/60 pb-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 ${
                filter === "all"
                  ? "bg-primary border-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 flex items-center gap-1.5 ${
                filter === "approved"
                  ? "bg-green-500 border-green-500 text-white shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <CheckCircle2 className="size-3" />
              Approved ({countApproved})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 flex items-center gap-1.5 ${
                filter === "pending"
                  ? "bg-yellow-500 border-yellow-500 text-black shadow-sm"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <AlertCircle className="size-3" />
              Pending ({countPending})
            </button>
          </div>

          {/* Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center border border-dashed border-border/60 bg-background/20">
              <p className="text-[11px] text-muted-foreground font-mono">
                No products match the selected status filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative group/card-wrapper">
                  {/* Status Overlay Badge */}
                  <div className="absolute top-2 right-2 z-10 font-mono text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-sm border select-none">
                    {product.status === "approved" ? (
                      <span className="text-green-500 flex items-center gap-1">
                        <CheckCircle2 className="size-2" />
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-500 flex items-center gap-1">
                        <AlertCircle className="size-2" />
                        Pending
                      </span>
                    )}
                  </div>
                  <Link href={`/products/${product.id}`} className="block">
                    <ProductCard product={product} hasLiked={likedSet.has(product.id)} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
