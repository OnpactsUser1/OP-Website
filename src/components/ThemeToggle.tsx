"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";

export const THEME_STORAGE_KEY = "onpacts-theme";

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeToggle() {
  // Re-applies the saved theme after React's dev-mode remount resets <html> attributes.
  useLayoutEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  function toggle() {
    const current = document.documentElement.getAttribute("data-theme") ?? "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="grid size-10 place-items-center rounded-full border border-line text-fg-2 transition-colors duration-300 hover:border-line-strong hover:text-fg"
    >
      <Sun aria-hidden className="size-[18px] light:hidden" />
      <Moon aria-hidden className="hidden size-[18px] light:block" />
    </button>
  );
}
