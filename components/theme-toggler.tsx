"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export function ToggleTheme() {
    const { theme, setTheme } = useTheme()
    function toggleTheme() {
        setTheme(prev => prev == "light" ? "dark" : "light");
    }
    return (
        <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
            {theme == "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}