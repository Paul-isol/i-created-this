export default function ProductViewSkeleton() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-3.5 w-32 bg-muted mb-8" />

        {/* Header Console Skeleton */}
        <div className="border border-border bg-card p-6 mb-8">
          <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-1.5">
              <div className="size-2 bg-muted" />
              <div className="size-2 bg-muted" />
              <div className="size-2 bg-muted" />
              <div className="h-3 w-40 bg-muted ml-2" />
            </div>
            <div className="h-4 w-20 bg-muted" />
          </div>
          <div className="space-y-3">
            <div className="h-8 w-2/3 bg-muted" />
            <div className="h-4 w-5/6 bg-muted" />
          </div>
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel Skeleton */}
          <div className="md:col-span-2 space-y-8">
            <div className="border border-border bg-card">
              <div className="border-b border-border bg-muted/30 px-4 py-2.5 h-9" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-5/6 bg-muted" />
                <div className="h-4 w-4/5 bg-muted" />
              </div>
            </div>

            <div className="border border-border bg-card">
              <div className="border-b border-border bg-muted/30 px-4 py-2.5 h-9" />
              <div className="p-6 space-y-2">
                <div className="h-3.5 w-1/3 bg-muted" />
                <div className="h-3.5 w-1/4 bg-muted pl-6" />
                <div className="h-3.5 w-1/4 bg-muted pl-6" />
              </div>
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="md:col-span-1 space-y-6">
            <div className="border border-border bg-card p-6 space-y-4">
              <div className="h-3 w-24 bg-muted mb-2" />
              <div className="h-11 w-full bg-muted" />
              <div className="grid grid-cols-2 border border-border divide-x divide-border bg-muted/10 h-16" />
            </div>

            <div className="border border-border bg-card p-6 space-y-3">
              <div className="h-3 w-28 bg-muted mb-2" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex justify-between py-1.5 border-b border-border/40">
                  <div className="h-3.5 w-16 bg-muted" />
                  <div className="h-3.5 w-20 bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}