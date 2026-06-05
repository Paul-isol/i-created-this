"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Menu, X, ArrowUpRight, User, LogOut, ChevronDown } from "lucide-react";
import { ToggleTheme } from "../theme-toggler";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!", { id: "signout-toast" });
          window.location.href = "/login";
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Sign out failed. Please try again.", { id: "signout-toast" });
        }
      },
    });
  };

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
            {isPending ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted/50 border border-border/50" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 hover:bg-muted transition-all duration-300 focus:outline-none"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase overflow-hidden border border-primary/20">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <span className="text-xs font-medium text-foreground max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <>
                    {/* Backdrop to close dropdown on click outside */}
                    <div className="fixed inset-0 z-30" onClick={() => setShowDropdown(false)} />
                    
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md border border-border bg-popover/90 backdrop-blur-md p-2 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 text-xs">
                        <p className="font-semibold text-foreground truncate">{user.name}</p>
                        <p className="text-muted-foreground truncate">{user.email}</p>
                      </div>
                      
                      <div className="my-1 border-t border-border" />
                      
                      <Link
                        href="/products"
                        onClick={() => setShowDropdown(false)}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors duration-200"
                      >
                        <User className="size-3.5 text-muted-foreground" />
                        Explore Products
                      </Link>

                      <div className="my-1 border-t border-border" />

                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 transition-colors duration-200"
                      >
                        <LogOut className="size-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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
            ? "max-h-[360px] opacity-100 py-4"
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
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-md bg-muted/50 border border-border/50" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2 py-1.5 bg-card/50 border border-border/50 rounded-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-sm font-bold uppercase overflow-hidden border border-primary/20">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-foreground truncate">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</span>
                  </div>
                </div>
                <Link href="/products" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2 hover:text-primary transition-all duration-300">
                    <User className="size-3.5" />
                    Explore Products
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                >
                  <LogOut className="size-3.5" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start transition-all duration-300 hover:text-primary"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center transition-all duration-300">
                    Submit Project
                  </Button>
                </Link>
              </>
            )}
            <div className="flex justify-start mt-2">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
