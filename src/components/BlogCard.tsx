import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostMeta } from "@/lib/content";

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function PostMetaLine({ post }: { post: PostMeta }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden className="size-3.5" />
        {post.readingTime}
      </span>
    </p>
  );
}

export function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
      {tag}
    </span>
  );
}

export function BlogCard({ post, priority = false }: { post: PostMeta; priority?: boolean }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent-ink">
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-line bg-well">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          unoptimized
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((t) => (
            <TagChip key={t} tag={t} />
          ))}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug text-fg">
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-fg-2">
          {post.description}
        </p>
        <div className="mt-4">
          <PostMetaLine post={post} />
        </div>
      </div>
    </article>
  );
}
