"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
            {resolvedTheme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
        </Button>
    )
}