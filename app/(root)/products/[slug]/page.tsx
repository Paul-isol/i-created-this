import { Suspense } from "react";
import ProductDynamicSection from "@/components/products/ProductDynamicSection";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <Suspense fallback={
      <div className="relative min-h-[calc(100vh-4rem)] bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="border border-border bg-card shadow-2xl animate-pulse">
            <div className="border-b border-border px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                <div className="size-2 bg-destructive/60" />
                <div className="size-2 bg-yellow-500/60" />
                <div className="size-2 bg-green-500/60" />
                <div className="h-3 w-40 bg-muted ml-3" />
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="h-10 w-3/4 bg-muted" />
              <div className="h-4 w-1/3 bg-muted" />
              <div className="h-20 w-full bg-muted" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border bg-border">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-card p-4"><div className="h-8 w-12 mx-auto bg-muted" /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductDynamicSection slug={slug} />
    </Suspense>
  );
}