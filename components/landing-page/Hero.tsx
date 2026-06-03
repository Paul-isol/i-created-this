import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import FeaturedProducts from "./FeaturedProducts";

export default function Hero() {
  return (
    <div className="relative overflow-hidden py-20 sm:py-32 bg-background transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <Badge
          variant="outline"
          className="inline-flex border-primary/30 text-[10px] py-1 px-3 bg-primary/5 tracking-widest gap-2 font-mono mb-8 uppercase text-primary animate-pulse"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-primary opacity-75" />
            <span className="relative inline-flex size-2 bg-primary" />
          </span>
          Next.js 16 Showcase Engine
        </Badge>

        {/* Title */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[1.05] mb-6">
          I Created{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-primary/90 to-primary/60">
            This!
          </span>
          <br />
          <span className="text-foreground">Showcase Your Code.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          The curated launchpad for modern creators to index builds, log
          technical challenges, and capture code peer feedback in a sharp,
          non-rounded ecosystem.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 sm:mb-20">
          <Button
            size="lg"
            className="group/btn gap-2 font-heading transition-all duration-300 active:translate-y-px"
          >
            Share Your Project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group/btn gap-2 font-heading border-border hover:border-foreground transition-all duration-300 active:translate-y-px"
          >
            Explore Showcase
          </Button>
        </div>

        {/* Interactive Dashboard Mockup */}
        <FeaturedProducts />
      </div>
    </div>
  );
}
