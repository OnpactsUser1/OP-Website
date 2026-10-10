"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonClasses } from "./Button";
import { NavLinks } from "./NavLinks";
import { PLAY_STORE_URL } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="grid size-10 place-items-center rounded-full border border-line text-fg transition-colors duration-300 hover:border-line-strong"
      >
        {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="fade-in fixed inset-x-0 top-16 bottom-0 z-40 border-t border-line bg-bg px-5 py-6"
        >
          <nav aria-label="Mobile">
            <NavLinks vertical onNavigate={() => setOpen(false)} />
          </nav>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "lg", "mt-6 w-full")}
          >
            Get the app
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        </div>
      )}
    </div>
  );
}
