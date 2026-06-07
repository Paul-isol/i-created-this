import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="relative border border-border bg-background p-5 text-left transition-all duration-300 shadow-sm">
      {/* Top badges */}
      <div className="flex items-center justify-between mb-3.5">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4.5 w-16" />
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mb-1.5" />

      {/* Author */}
      <Skeleton className="h-3 w-1/4 mb-3.5" />

      {/* Description lines */}
      <div className="space-y-1.5 mb-4.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      {/* Tags list */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-14" />
        <Skeleton className="h-4 w-12" />
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
        <div className="flex gap-3">
          <Skeleton className="h-3.5 w-10" />
          <Skeleton className="h-3.5 w-10" />
        </div>
        <Skeleton className="h-3.5 w-16" />
      </div>
    </div>
  );
}