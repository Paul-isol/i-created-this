import { Product } from "@/lib/generated/prisma/client";
import { Eye, Heart, Star } from "lucide-react";



export function ProductCard({ product }: { product: Product }) {
  // Safe parsing of tags from Prisma Json field
  const tagsList: string[] = Array.isArray(product.tags)
    ? (product.tags as string[])
    : typeof product.tags === "string"
    ? JSON.parse(product.tags)
    : [];

  const mainTag = tagsList[0] || "Product";
  const categoryLabel = tagsList[1] || "SaaS"; // default fallback category
  const authorHandle = product.submittedBy
    ? product.submittedBy.startsWith("@")
      ? product.submittedBy
      : `@${product.submittedBy}`
    : "@anonymous";

  const descriptionText = product.tagline || product.description || "No description provided.";
  const maxLength = 95;
  const isTruncated = descriptionText.length > maxLength;

  return (
    <div className="group/card relative border border-border bg-background p-5 text-left transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg">
      {product.likes >= 100 && (
        <div className="absolute top-0.5 left-0.5 bg-primary text-primary-foreground px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest border-b border-r border-primary shadow-sm flex items-center gap-1 z-10">
          <Star className="size-2 fill-primary-foreground" />
          Featured
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/10">
          {mainTag}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground font-semibold">
          {categoryLabel}
        </span>
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover/card:text-primary transition-colors duration-300">
        {product.name}
      </h3>
      <p className="text-[11px] font-mono text-muted-foreground/80 mb-3">
        {authorHandle}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 h-10 overflow-hidden">
        {isTruncated ? (
          <>
            {descriptionText.slice(0, maxLength).trim()}...{" "}
            <span className="text-primary/95 font-mono text-[9px] font-bold uppercase tracking-wider group-hover/card:underline">
              read more
            </span>
          </>
        ) : (
          descriptionText
        )}
      </p>
      {/* Tags List */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tagsList.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono text-muted-foreground bg-muted hover:bg-muted/80 transition-colors duration-300 px-2 py-0.5 border border-border uppercase tracking-wider"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3.5 border-t border-border/60 text-[10px] font-mono text-muted-foreground">
        <div className="flex gap-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" /> {product.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" /> {product.likes}
          </span>
        </div>
        <span className="group-hover/card:translate-x-1 group-hover/card:text-primary transition-all duration-300">
          View Specs →
        </span>
      </div>
    </div>
  );
}
