"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Provide default class strings for unmounted state to prevent hydration mismatch
    const isDark = mounted ? resolvedTheme === 'dark' : true;

    return (
        <div className="flex items-center gap-1 bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-full p-1 max-w-fit shadow-sm">
            <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full transition-colors ${!isDark ? 'bg-black/5 dark:bg-white/10 text-[var(--color-foreground)]' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                aria-label="Light Mode"
            >
                <Sun className="w-4 h-4" />
            </button>
            <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-colors ${isDark ? 'bg-black/5 dark:bg-white/10 text-[var(--color-foreground)]' : 'text-[var(--color-muted)] hover:text-[var(--color-foreground)]'}`}
                aria-label="Dark Mode"
            >
                <Moon className="w-4 h-4" />
            </button>
        </div>
    );
}
