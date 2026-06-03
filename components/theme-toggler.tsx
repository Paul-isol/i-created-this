"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
        const isAppearanceTransition =
            typeof document !== "undefined" &&
            "startViewTransition" in document &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isAppearanceTransition) {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = (document as any).startViewTransition(() => {
            setTheme(resolvedTheme === "light" ? "dark" : "light");
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];
            const isDark = resolvedTheme === "dark";
            document.documentElement.animate(
                {
                    clipPath: isDark ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 400,
                    easing: "ease-in-out",
                    pseudoElement: isDark
                        ? "::view-transition-new(root)"
                        : "::view-transition-old(root)",
                }
            );
        });
    };

    return (
        <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
            {resolvedTheme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
        </Button>
    )
}