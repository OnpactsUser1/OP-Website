"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";
import type { PostMeta } from "@/lib/content";
import { BlogCard } from "./BlogCard";

const PAGE_SIZE = 6;
const ALL = "All";

const urlListeners = new Set<() => void>();

function subscribeUrl(onChange: () => void) {
  urlListeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    urlListeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
}

/** Tag filter chips and pagination over pre-rendered post metadata; the URL (?tag=&page=) is the source of truth. */
export function BlogExplorer({ posts, featuredSlug }: { posts: PostMeta[]; featuredSlug?: string }) {
  const search = useSyncExternalStore(subscribeUrl, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  const tag = params.get("tag") ?? ALL;
  const page = Math.max(1, Number(params.get("page")) || 1);

  const tags = useMemo(
    () => [ALL, ...Array.from(new Set(posts.flatMap((p) => p.tags))).sort()],
    [posts],
  );

  const filtered = useMemo(
    () =>
      tag === ALL
        ? posts.filter((p) => p.slug !== featuredSlug)
        : posts.filter((p) => p.tags.includes(tag)),
    [posts, tag, featuredSlug],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function update(nextTag: string, nextPage: number) {
    const next = new URLSearchParams();
    if (nextTag !== ALL) next.set("tag", nextTag);
    if (nextPage > 1) next.set("page", String(nextPage));
    const qs = next.toString();
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}`);
    urlListeners.forEach((l) => l());
  }

  return (
    <div>
      <div role="group" aria-label="Filter posts by tag" className="flex flex-wrap gap-2">
        {tags.map((t) => {
          const active = t === tag;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => update(t, 1)}
              className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors duration-300 ${
                active
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line text-fg-2 hover:border-line-strong hover:text-fg"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {filtered.length} posts{tag !== ALL ? ` tagged ${tag}` : ""}.
      </p>

      {visible.length === 0 ? (
        <p className="mt-10 text-fg-2">No posts with this tag yet.</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      )}

      {pageCount > 1 && (
        <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => update(tag, current - 1)}
            disabled={current === 1}
            aria-label="Previous page"
            className="grid size-10 place-items-center rounded-full border border-line text-fg-2 hover:text-fg disabled:opacity-40"
          >
            <ChevronLeft aria-hidden className="size-4" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => update(tag, n)}
              aria-current={n === current ? "page" : undefined}
              aria-label={`Page ${n}`}
              className={`grid size-10 place-items-center rounded-full font-mono text-sm font-bold ${
                n === current ? "bg-accent text-on-accent" : "border border-line text-fg-2 hover:text-fg"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => update(tag, current + 1)}
            disabled={current === pageCount}
            aria-label="Next page"
            className="grid size-10 place-items-center rounded-full border border-line text-fg-2 hover:text-fg disabled:opacity-40"
          >
            <ChevronRight aria-hidden className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
