import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostMetaLine, TagChip } from "@/components/BlogCard";
import { BlogExplorer } from "@/components/BlogExplorer";
import { PageHero } from "@/components/Section";
import { getFeaturedPost, getPostMetas } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Practical, honest writing on commitment, consistency and building a workout habit that sticks, from the team behind OnPacts.",
  path: "/blog/",
  ogKey: "blog",
});

export default function BlogIndexPage() {
  const posts = getPostMetas();
  const featured = getFeaturedPost(posts);

  return (
    <>
      <PageHero
        eyebrow="The OnPacts blog"
        title="Notes on discipline, written for real weeks."
        intro="Short, practical reads on commitment, consistency and getting your workouts done. No hype, no medical claims."
      />

      <div className="container-site py-14">
        {featured && (
          <section aria-labelledby="featured-heading" className="mb-16">
            <h2 id="featured-heading" className="eyebrow mb-5">
              Featured
            </h2>
            <article className="card group relative grid overflow-hidden transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent-ink md:grid-cols-[1.25fr_1fr]">
              <div className="relative aspect-[1200/630] border-b border-line bg-well md:aspect-auto md:min-h-[320px] md:border-b-0 md:border-r">
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt}
                  fill
                  unoptimized
                  priority
                  sizes="(min-width: 768px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((t) => (
                    <TagChip key={t} tag={t} />
                  ))}
                </div>
                <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-fg sm:text-3xl">
                  <Link
                    href={`/blog/${featured.slug}/`}
                    className="after:absolute after:inset-0 focus-visible:outline-none"
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-relaxed text-fg-2">{featured.description}</p>
                <div className="mt-5">
                  <PostMetaLine post={featured} />
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent-ink">
                  Read the post
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </section>
        )}

        <section aria-labelledby="all-posts-heading">
          <h2 id="all-posts-heading" className="mb-5 text-2xl font-extrabold tracking-tight text-fg">
            All posts
          </h2>
          <BlogExplorer posts={posts} featuredSlug={featured?.slug} />
        </section>
      </div>
    </>
  );
}
