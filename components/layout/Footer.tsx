import Link from "next/link";
import { Code2, Globe, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const exploreLinks = [
    { name: "Showcase Hub", href: "/" },
    { name: "Explore Projects", href: "#" },
    { name: "Monthly Leaderboard", href: "#" },
    { name: "Featured Submissions", href: "#" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Changelog updates", href: "#" },
    { name: "Submit Feedback", href: "#" },
    { name: "Support Desk", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-border bg-background transition-colors duration-300">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-2">
                <Code2 className="size-5" />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider uppercase">
                I Created This!
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A high-performance hub to showcase your creations, receive
              real-time peer reviews, and grow your engineering skills.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex size-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <Link
                href="#"
                className="flex size-9 items-center justify-center border border-border bg-background text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-0.5"
              >
                <Globe className="size-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:pl-1.5"
                  >
                    <span className="mr-1.5 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:pl-1.5"
                  >
                    <span className="mr-1.5 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground">
              Get notified when top new projects are uploaded or showcase events
              happen.
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors duration-300 placeholder:text-muted-foreground rounded-none"
              />
              <Button
                size="icon"
                className="shrink-0 transition-all duration-300"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} I Created This!. All rights
            reserved.
          </p>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            Designed with sharp precision using Next.js & Tailwind.
            <Heart className="size-3 text-primary fill-primary" />
          </div>
        </div>
      </div>
    </footer>
  );
}
