import { Product } from "@/lib/generated/prisma/client";
import {
  ArrowLeft,
  Calendar,
  Eye,
  ExternalLink,
  Star,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductLikeButton from "./ProductLikeButton";

export default function ProductDetailView({
  product,
  hasLiked,
}: {
  product: Product;
  hasLiked: boolean;
}) {
  // Safe parsing of tags from Prisma Json field
  const tagsList: string[] = Array.isArray(product.tags)
    ? (product.tags as string[])
    : typeof product.tags === "string"
    ? JSON.parse(product.tags)
    : [];

  const authorHandle = product.submittedBy
    ? product.submittedBy.startsWith("@")
      ? product.submittedBy
      : `@${product.submittedBy}`
    : "@anonymous";

  const createdDate = product.createdAt
    ? new Date(product.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown";

  const approvedDate = product.approvedAt
    ? new Date(product.approvedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb / Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-8 group hover:text-primary transition-colors duration-300"
        >
          <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Showcase
        </Link>

        {/* Header Console Card */}
        <div className="border border-border bg-card p-6 mb-8 relative overflow-hidden transition-all duration-300">
          {/* Top Console Bar */}
          <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
            <div className="flex items-center gap-1.5">
              <div className="size-2 bg-destructive/60" />
              <div className="size-2 bg-yellow-500/60" />
              <div className="size-2 bg-green-500/60" />
              <span className="text-[10px] font-mono text-muted-foreground ml-2 tracking-wider">
                src/showcase/{product.slug}/page.tsx
              </span>
            </div>
            <div>
              {product.status === "approved" ? (
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-2.5 py-0.5 border border-green-500/20">
                  <Zap className="size-2.5 animate-pulse" />
                  Status: Live
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2.5 py-0.5 border border-yellow-500/20">
                  <Clock className="size-2.5" />
                  Status: Pending
                </span>
              )}
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            {product.likes >= 100 && (
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest border border-primary shadow-sm">
                <Star className="size-2.5 fill-primary-foreground" />
                Featured Build
              </span>
            )}
            <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight text-foreground">
              {product.name}
            </h1>
            {product.tagline && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
                {product.tagline}
              </p>
            )}
          </div>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Primary Content */}
          <div className="md:col-span-2 space-y-8">
            {/* README.md Editor Window */}
            <div className="border border-border bg-card shadow-lg transition-all duration-300 hover:border-border/80">
              {/* Tab Header */}
              <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-foreground font-bold">README.md</span>
                  <span className="text-[9px] font-mono text-muted-foreground font-medium uppercase tracking-widest bg-muted px-1.5 py-0.5 border border-border">
                    Markdown
                  </span>
                </div>
                <div className="text-[10px] font-mono text-muted-foreground select-none">
                  UTF-8
                </div>
              </div>
              {/* Description Content */}
              <div className="p-6 font-mono text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap select-text">
                {product.description || "No description provided."}
              </div>
            </div>

            {/* package.json Dependency Block */}
            {tagsList.length > 0 && (
              <div className="border border-border bg-card shadow-lg transition-all duration-300 hover:border-border/80">
                <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-foreground font-bold">package.json</span>
                    <span className="text-[9px] font-mono text-muted-foreground font-medium uppercase tracking-widest bg-muted px-1.5 py-0.5 border border-border">
                      JSON
                    </span>
                  </div>
                </div>
                {/* Tech Stack Code View */}
                <div className="p-6 font-mono text-xs overflow-x-auto">
                  <pre className="text-foreground">
                    <span className="text-muted-foreground">{"{"}</span>
                    <br />
                    <span className="text-primary/80">  &quot;name&quot;</span>: <span className="text-green-400">&quot;{product.slug}&quot;</span>,
                    <br />
                    <span className="text-primary/80">  &quot;dependencies&quot;</span>: <span className="text-muted-foreground">{"{"}</span>
                    {tagsList.map((tag, idx) => (
                      <div key={tag} className="pl-6">
                        <span className="text-green-400">&quot;{tag.toLowerCase()}&quot;</span>: <span className="text-yellow-400">&quot;latest&quot;</span>
                        {idx < tagsList.length - 1 ? "," : ""}
                      </div>
                    ))}
                    <span className="text-muted-foreground">  {"}"}</span>
                    <br />
                    <span className="text-muted-foreground">{"}"}</span>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: Controls and Registry info */}
          <div className="md:col-span-1 space-y-6">
            {/* Launch Deck Card */}
            <div className="border border-border bg-card p-6 shadow-lg">
              <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <div className="size-1.5 bg-primary animate-pulse" />
                Launch Controls
              </h3>
              <div className="space-y-4">
                {product.websiteUrl && (
                  <a
                    href={product.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full group/btn gap-2 font-heading tracking-wider uppercase text-xs h-11 transition-all duration-300 active:translate-y-px">
                      Visit Website
                      <ExternalLink className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </a>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 border border-border divide-x divide-border bg-muted/10">
                  {/* Views */}
                  <div className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 text-muted-foreground">
                      <Eye className="size-3.5" />
                      <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
                        Views
                      </span>
                    </div>
                    <span className="font-heading text-xl font-black text-foreground">
                      {product.views.toLocaleString()}
                    </span>
                  </div>

                  {/* Likes */}
                  <div className="p-4 text-center flex flex-col justify-center items-center">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 text-muted-foreground">
                      <span className="text-[9px] font-mono uppercase tracking-widest font-bold">
                        Likes
                      </span>
                    </div>
                    <ProductLikeButton product={product} hasLiked={hasLiked} variant="stat" />
                  </div>
                </div>
              </div>
            </div>

            {/* Registry Info Card */}
            <div className="border border-border bg-card p-6 shadow-lg">
              <h3 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                <div className="size-1.5 bg-primary" />
                Registry Metadata
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">CREATOR</span>
                  <span className="text-primary font-bold">{authorHandle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">SUBMITTED</span>
                  <span className="text-foreground font-semibold">{createdDate}</span>
                </div>
                {approvedDate && (
                  <div className="flex justify-between py-1.5 border-b border-border/40">
                    <span className="text-muted-foreground">APPROVED</span>
                    <span className="text-foreground font-semibold">{approvedDate}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-border/40">
                  <span className="text-muted-foreground">STATUS</span>
                  <span className={`font-semibold uppercase ${product.status === "approved" ? "text-green-500" : "text-yellow-500"}`}>
                    {product.status}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">BUILD_ID</span>
                  <span className="text-foreground font-semibold">#{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-12 border-t border-border pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest group hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Explore More Builds
          </Link>
        </div>
      </div>
    </div>
  );
}
