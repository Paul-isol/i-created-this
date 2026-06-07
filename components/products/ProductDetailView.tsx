import { Product } from "@/lib/generated/prisma/client";
import {
  ArrowLeft,
  Calendar,
  Eye,
  ExternalLink,
  Star,
  Tag,
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

        {/* Main Content Card */}
        <div className="border border-border bg-card shadow-2xl transition-all duration-500">
          {/* Terminal-style Header Bar */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-1.5">
              <div className="size-2 bg-destructive/60" />
              <div className="size-2 bg-yellow-500/60" />
              <div className="size-2 bg-green-500/60" />
              <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider">
                product_detail/{product.slug}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.status === "approved" ? (
                <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest text-green-500 bg-green-500/10 px-2 py-0.5 border border-green-500/20">
                  <Zap className="size-2.5" />
                  Live
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-0.5 border border-yellow-500/20">
                  <Clock className="size-2.5" />
                  Pending
                </span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            {/* Top Section: Title + Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              <div className="flex-1 min-w-0">
                {/* Featured Badge */}
                {product.likes >= 100 && (
                  <div className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest border border-primary shadow-sm mb-3">
                    <Star className="size-2.5 fill-primary-foreground" />
                    Featured Project
                  </div>
                )}

                <h1 className="font-heading text-3xl sm:text-4xl font-black tracking-tight uppercase leading-tight text-foreground mb-2">
                  {product.name}
                </h1>

                {/* Author */}
                <p className="text-xs font-mono text-muted-foreground/80 mb-4">
                  submitted by{" "}
                  <span className="text-primary font-bold">{authorHandle}</span>
                </p>

                {/* Tagline */}
                {product.tagline && (
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed font-medium max-w-xl">
                    {product.tagline}
                  </p>
                )}
              </div>

              {/* CTA Section */}
              <div className="flex flex-col gap-2.5 shrink-0">
                {product.websiteUrl && (
                  <a
                    href={product.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full group/btn gap-2 font-heading transition-all duration-300 active:translate-y-px">
                      Visit Website
                      <ExternalLink className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-border bg-border mb-8">
              <div className="bg-card p-4 text-center transition-colors duration-300 hover:bg-muted/30">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Eye className="size-3.5 text-muted-foreground" />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                    Views
                  </span>
                </div>
                <span className="font-heading text-xl font-black text-foreground">
                  {product.views.toLocaleString()}
                </span>
              </div>

              <div className="bg-card p-4 text-center transition-colors duration-300 hover:bg-muted/30">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                    Likes
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-heading text-xl font-black text-foreground">
                    {product.likes.toLocaleString()}
                  </span>
                  <ProductLikeButton product={product} hasLiked={hasLiked} />
                </div>
              </div>

              <div className="bg-card p-4 text-center transition-colors duration-300 hover:bg-muted/30">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                    Submitted
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-foreground">
                  {createdDate}
                </span>
              </div>

              <div className="bg-card p-4 text-center transition-colors duration-300 hover:bg-muted/30">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <Tag className="size-3.5 text-muted-foreground" />
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest font-bold">
                    Status
                  </span>
                </div>
                <span
                  className={`font-mono text-xs font-bold uppercase ${
                    product.status === "approved"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </div>

            {/* Tags Section */}
            {tagsList.length > 0 && (
              <div className="mb-8">
                <h2 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <div className="size-1.5 bg-primary" />
                  Tech Stack / Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tagsList.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-muted-foreground bg-muted hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all duration-300 px-3 py-1 border border-border uppercase tracking-wider font-semibold cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description Section */}
            {product.description && (
              <div className="mb-8">
                <h2 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <div className="size-1.5 bg-primary" />
                  About This Project
                </h2>
                <div className="border border-border bg-background/50 p-5">
                  <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* Website URL Section */}
            {product.websiteUrl && (
              <div className="mb-8">
                <h2 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                  <div className="size-1.5 bg-primary" />
                  Project URL
                </h2>
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:underline transition-colors duration-300 border border-border bg-background/50 px-4 py-2.5 hover:border-primary/30 group"
                >
                  <ExternalLink className="size-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  {product.websiteUrl}
                </a>
              </div>
            )}

            {/* Metadata Footer */}
            {approvedDate && (
              <div className="border-t border-border pt-5 mt-8">
                <div className="flex flex-wrap gap-6 text-[10px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    Approved: {approvedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3" />
                    Submitted: {createdDate}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest group hover:text-primary transition-colors duration-300"
          >
            <ArrowLeft className="size-3 transition-transform duration-300 group-hover:-translate-x-1" />
            Explore More
          </Link>

          {product.websiteUrl && (
            <a
              href={product.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Visit Live Site
                <ExternalLink className="size-3" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
