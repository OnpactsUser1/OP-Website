import { Mail } from "lucide-react";
import type { ReactNode } from "react";
import type { Heading } from "@/lib/headings";
import { SUPPORT_EMAIL } from "@/lib/site";
import { PageHero } from "./Section";
import { TableOfContents } from "./TableOfContents";

export function LegalLayout({
  title,
  intro,
  lastUpdated,
  headings,
  children,
}: {
  title: string;
  intro?: string;
  lastUpdated: string;
  headings: Heading[];
  children: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} intro={intro}>
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-fg-2">
          Last updated {lastUpdated}
        </p>
      </PageHero>

      <div className="container-site grid gap-10 py-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14">
        <aside>
          <TableOfContents headings={headings} title="Contents" />
        </aside>
        <div className="min-w-0">
          <article className="prose-op max-w-[72ch]">{children}</article>
          <div className="card mt-14 flex max-w-[72ch] flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-fg-2">Questions about this document?</p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center gap-2 font-semibold text-accent-ink hover:underline"
            >
              <Mail aria-hidden className="size-4" />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
