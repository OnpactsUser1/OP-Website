import { List } from "lucide-react";
import type { Heading } from "@/lib/headings";

function TocList({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-1 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a
            href={`#${h.id}`}
            className="block rounded-lg px-3 py-1.5 leading-snug text-fg-2 transition-colors duration-300 hover:bg-surface hover:text-fg"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sticky sidebar on desktop, collapsible disclosure on smaller screens. */
export function TableOfContents({
  headings,
  title = "On this page",
}: {
  headings: Heading[];
  title?: string;
}) {
  if (headings.length === 0) return null;
  return (
    <>
      <details className="card mb-8 p-0 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 font-semibold text-fg [&::-webkit-details-marker]:hidden">
          <List aria-hidden className="size-4 text-accent-ink" />
          {title}
        </summary>
        <nav aria-label={title} className="px-2 pb-4">
          <TocList headings={headings} />
        </nav>
      </details>

      <nav
        aria-label={title}
        className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block"
      >
        <p className="eyebrow mb-3 px-3">{title}</p>
        <TocList headings={headings} />
      </nav>
    </>
  );
}
