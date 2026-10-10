import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogCard, PostMetaLine, TagChip } from "@/components/BlogCard";
import { StoreBadges } from "@/components/StoreBadges";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { getAllPosts, getPost, getRelatedPosts, toMeta } from "@/lib/content";
import { blogPostingJsonLd } from "@/lib/jsonld";
import { MdxContent } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    ogKey: `blog-${post.slug}`,
    type: "article",
    extra: {
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const meta = toMeta(post);
  const related = getRelatedPosts(meta);
  const url = absoluteUrl(`/blog/${post.slug}/`);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(meta)} />

      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2"
        />
        <div className="container-site relative py-12 sm:py-16">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-fg-2 hover:text-fg"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All posts
          </Link>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <TagChip key={t} tag={t} />
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-fg sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-2">{post.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-fg">By {post.author}</span>
            <span aria-hidden className="text-muted">·</span>
            <PostMetaLine post={meta} />
          </div>
        </div>
      </header>

      <div className="container-site py-12">
        <div className="relative mx-auto aspect-[1200/630] max-w-4xl overflow-hidden rounded-3xl border border-line bg-well">
          <Image src={post.cover} alt={post.coverAlt} fill unoptimized priority sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <div className="min-w-0 lg:order-1">
            <div className="lg:hidden">
              <TableOfContents headings={post.headings} />
            </div>
            <article className="prose-op max-w-[70ch]">
              <MdxContent source={post.body} />
            </article>

            <div className="mt-12 max-w-[70ch] border-t border-line pt-8">
              <p className="eyebrow mb-4">Share this post</p>
              <ShareButtons url={url} title={post.title} />
            </div>

            <aside
              aria-label="Get the OnPacts app"
              className="relative mt-12 max-w-[70ch] overflow-hidden rounded-3xl border border-accent/25 bg-deep p-7 sm:p-9"
            >
              <div aria-hidden className="hero-glow pointer-events-none absolute -right-20 -top-20 size-72" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                <LogoMark size={64} />
                <div className="flex-1">
                  <p className="text-xl font-extrabold text-fg">Make this week&apos;s pact.</p>
                  <p className="mt-1 text-fg-2">
                    Plan your days, pick your slot, and get rewarded for the work you actually do.
                  </p>
                </div>
              </div>
              <StoreBadges height={52} className="relative mt-6 -ml-1.5" />
            </aside>
          </div>

          <aside className="hidden lg:order-2 lg:block">
            <TableOfContents headings={post.headings} />
          </aside>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-20 border-t border-line pt-14">
            <h2 id="related-heading" className="text-2xl font-extrabold tracking-tight text-fg">
              Related posts
            </h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
