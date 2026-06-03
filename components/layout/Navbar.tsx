"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, ArrowUpRight } from "lucide-react";
import { ToggleTheme } from "../theme-toggler";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Explore Showcase", href: "/" },
    { name: "Leaderboard", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "Docs", href: "#" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-2 transition-all duration-300 group-hover:bg-primary/90">
                <Code2 className="size-5 transition-transform duration-500 group-hover:rotate-12" />
              </div>
              <span className="font-heading text-lg font-bold tracking-wider uppercase transition-colors duration-300 group-hover:text-primary">
                I Created This!
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="transition-all duration-300 hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="group/btn gap-1.5 transition-all duration-300">
                Submit Project
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Button>
            </Link>
            <ToggleTheme />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden border-b border-border bg-background transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-72 opacity-100 py-4"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:pl-2 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Link href="/login">
              <Button
                variant="ghost"
                className="w-full justify-start transition-all duration-300 hover:text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="w-full justify-center transition-all duration-300">
                Submit Project
              </Button>
            </Link>
            <ToggleTheme />
          </div>
        </div>
      </div>
    </nav>
  );
}
