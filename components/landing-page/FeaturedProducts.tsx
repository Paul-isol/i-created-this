import { ArrowRightCircleIcon } from "lucide-react";
import { ProductCard } from "../products/ProductCard";
import Link from "next/link";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      title: "DevFlow Developer Hub",
      author: "@sarah_codes",
      category: "Fullstack",
      desc: "A high-performance developer index featuring AI search, custom markdown parsing, and collaborative notebooks.",
      likes: "142",
      views: "1.2k",
      tags: ["Next.js 16", "Fullstack", "AI"],
    },
    {
      id: 2,
      title: "Tailwind V4 Sandbox",
      author: "@alex_dev",
      category: "Frontend Tool",
      desc: "An advanced stylesheet compiler playground to test utility variables and compile inline CSS modules instantly.",
      likes: "98",
      views: "840",
      tags: ["PostCSS", "Frontend", "CSS"],
    },
    {
      id: 3,
      title: "Antigravity Workspace",
      author: "@agent_deep",
      category: "Developer Tool",
      desc: "A browser-based workspace editor with integrated task runners, system log diagnostics, and state management trees.",
      likes: "256",
      views: "3.1k",
      tags: ["TypeScript", "Developer Tool", "IDE"],
    },
    {
      id: 4,
      title: "Agentic AI Coding",
      author: "@AI_Insider",
      category: "AI Agent",
      desc: "An advanced agent-based coding system that writes, tests, and deploys code autonomously using state-of-the-art AI models.",
      likes: "123",
      views: "2k",
      tags: ["AI", "Agent", "Coding"],
    },
  ];
  return (
    <div className="relative w-full max-w-5xl mx-auto border border-border bg-card p-3 sm:p-5 shadow-2xl transition-all duration-500 hover:border-primary/30">
      {/* Mock Header Console */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
        <div className="flex items-center gap-1.5">
          <div className="size-2 bg-destructive/60" />
          <div className="size-2 bg-yellow-500/60" />
          <div className="size-2 bg-green-500/60" />
          <span className="text-[10px] font-mono text-muted-foreground ml-3 tracking-wider">
            Featured Today
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
            <ArrowRightCircleIcon className="size-3 text-primary animate-pulse" />
            Show All
          </span>
        </div>
      </div>

      {/* Simulated Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
