import { Eye, Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    title: string;
    author: string;
    category: string;
    desc: string;
    likes: string;
    views: string;
    tags: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group/card border border-border bg-background p-5 text-left transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 border border-primary/10">
          {product.tags[0]}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground font-semibold">
          {product.category}
        </span>
      </div>
      <h3 className="font-heading text-lg font-bold text-foreground mb-1 group-hover/card:text-primary transition-colors duration-300">
        {product.title}
      </h3>
      <p className="text-[11px] font-mono text-muted-foreground/80 mb-3">
        {product.author}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        {product.desc}
      </p>
      {/* Tags List */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.tags.map((tag) => (
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
