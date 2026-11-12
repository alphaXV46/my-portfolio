"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { getClientTheme, setClientTheme, Theme } from "@/lib/cookies";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getClientTheme());
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setClientTheme(nextTheme);

    const root = document.documentElement;
    if (nextTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Cegah layout shift saat hidrasi
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-g-bg-secondary text-g-text-muted hover:text-g-text-main border border-g-subtle"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-g-yellow" />
      ) : (
        <Moon className="w-4 h-4 text-g-blue" />
      )}
    </button>
  );
}