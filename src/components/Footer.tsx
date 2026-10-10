import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin } from "lucide-react";
import { StoreBadges } from "./StoreBadges";
import { LogoMark, Wordmark } from "./Logo";
import { COMPANY, FOOTER_NAV, SUPPORT_EMAIL, TAGLINE } from "@/lib/site";

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface-2/60">
      <div className="container-site grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-2.5 text-fg" aria-label="OnPacts home">
            <LogoMark size={36} />
            <Wordmark className="text-xl" />
          </Link>
          <p className="max-w-xs font-semibold text-fg">{TAGLINE}</p>
          <StoreBadges height={52} className="-ml-1.5" />
          <ul className="space-y-2 text-sm text-fg-2">
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-accent-ink"
              >
                <Mail aria-hidden className="size-4 text-accent-ink" />
                {SUPPORT_EMAIL}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-accent-ink" />
              {COMPANY.city}, {COMPANY.region}, {COMPANY.country}
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow mb-4">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-2 transition-colors duration-300 hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wide">
            Not a medical service · Not a contest · Not gambling
          </p>
        </div>
      </div>
    </footer>
  );
}
