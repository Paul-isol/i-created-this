"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isAnyLoading = emailLoading || googleLoading;

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          setEmailLoading(true);
        },
        onSuccess: () => {
          setEmailLoading(false);
          toast.success("Successfully logged in!");
        },
        onError: (ctx) => {
          setEmailLoading(false);
          toast.error(ctx.error.message || "Authentication failed. Please verify your credentials.");
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    toast.loading("Connecting to Google OAuth...", { id: "login-toast" });

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/?login=success"
    }, {
      onRequest: () => {
        setGoogleLoading(true)
      },
      onSuccess: () => {
        setGoogleLoading(false)
        toast.loading("Redirecting to Google...", { id: "login-toast" })
      },
      onError: (ctx) => {
        setGoogleLoading(false)
        toast.error(ctx.error.message || "Authentication failed. Please verify your credentials.", { id: "login-toast" })
      }
    })

  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 transition-colors duration-300">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-70" />

      {/* Back to Home Navigation */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors duration-300"
      >
        <ArrowLeft className="size-3" />
        Back to showcase
      </Link>

      {/* Branding Header */}
      <div className="flex flex-col items-center gap-3 mb-8 text-center">
        <div className="bg-primary text-primary-foreground p-2">
          <Code2 className="size-6" />
        </div>
        <span className="font-heading text-xl font-black tracking-widest uppercase">
          I Created This!
        </span>
      </div>

      {/* Authentication Card */}
      <div className="w-full max-w-md border border-border bg-card p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-primary/20">
        <div className="text-center mb-8">
          <h2 className="font-heading text-xl font-bold uppercase tracking-tight mb-2">
            Developer Login
          </h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Continue with your credentials or social provider to access
            developer profiles, post creations, and catalog reviews.
          </p>
        </div>

        {/* Email and Password Form */}
        <form className="space-y-4 mb-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="w-full h-10 bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 rounded-none placeholder:text-muted-foreground/60 disabled:opacity-50"
              disabled={isAnyLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500 font-mono mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <a
                href="#"
                className="text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Forgot?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full h-10 bg-background border border-border px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 rounded-none placeholder:text-muted-foreground/60 disabled:opacity-50"
              disabled={isAnyLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-500 font-mono mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-10 font-heading text-xs uppercase tracking-widest transition-all duration-300 rounded-none"
            disabled={isAnyLoading}
          >
            {emailLoading ? "Signing in..." : "Sign In with Email"}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-[10px] font-mono text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        {/* Social Provider Button */}
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="w-full h-11 border border-border hover:border-foreground/50 hover:bg-muted font-heading text-xs uppercase tracking-widest transition-all duration-300 rounded-none flex items-center justify-center gap-3 active:translate-y-px"
            disabled={isAnyLoading}
          >
            {googleLoading ? (
              <span className="text-xs font-mono text-muted-foreground animate-pulse">
                Connecting...
              </span>
            ) : (
              <>
                {/* Google SVG Icon */}
                <svg className="size-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.59-5.16 3.59-8.46z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.86-3c-1.08.72-2.45 1.16-4.1 1.16-3.15 0-5.81-2.13-6.76-5H1.27v3.1A11.986 11.986 0 0012 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.24 14.25c-.24-.72-.38-1.5-.38-2.31c0-.81.14-1.59.38-2.31V6.53H1.27A11.986 11.986 0 000 12c0 2.12.55 4.12 1.27 5.92l3.97-3.67z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0A11.986 11.986 0 001.27 6.53l3.97 3.67c.95-2.87 3.61-5.12 6.76-5.12z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </div>

        {/* Navigation Link to Register */}
        <div className="mt-8 pt-6 border-t border-border/60 text-center">
          <p className="text-xs text-muted-foreground">
            New to the showcase?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline underline-offset-4 font-semibold tracking-wide"
            >
              Create an account &rarr;
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-[10px] text-muted-foreground font-mono text-center">
        Secured by Better Auth. All rights reserved.
      </p>
    </div>
  );
}
