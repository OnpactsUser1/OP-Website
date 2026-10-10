import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "./Button";
import { LogoMark, Wordmark } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";
import { PLAY_STORE_URL } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line">
      {/* Blur lives on a sibling layer: backdrop-filter on <header> would trap the fixed mobile menu inside it. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-bg/80 backdrop-blur-xl" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-on-accent"
      >
        Skip to content
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 text-fg" aria-label="OnPacts home">
          <LogoMark size={34} priority />
          <Wordmark className="text-lg" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href={PLAY_STORE_URL} size="sm" className="hidden sm:inline-flex">
            Get the app
            <ArrowUpRight aria-hidden className="size-4" />
          </ButtonLink>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
