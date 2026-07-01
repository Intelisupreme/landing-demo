"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- theme read from DOM after no-FOUC script
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore (e.g. private mode)
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:bg-surface hover:shadow-sm aria-pressed:text-brand-blue"
      data-mounted={mounted ? "true" : "false"}
    >
      {theme === "light" ? (
        <Moon size={18} weight="duotone" />
      ) : (
        <Sun size={18} weight="duotone" />
      )}
    </button>
  );
}