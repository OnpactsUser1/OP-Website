import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadings, type Heading } from "./headings";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const LEGAL_DIR = path.join(process.cwd(), "content", "legal");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  readingTime: string;
  featured: boolean;
};

export type Post = PostMeta & { body: string; headings: Heading[] };

export type LegalDoc = {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  body: string;
  headings: Heading[];
};

function required<T>(value: T | undefined, field: string, file: string): T {
  if (value === undefined || value === null || value === "") {
    throw new Error(`Missing frontmatter field "${field}" in ${file}`);
  }
  return value;
}

function estimateReadingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "");
  return {
    slug,
    title: required(data.title, "title", file),
    description: required(data.description, "description", file),
    date: new Date(required(data.date, "date", file)).toISOString().slice(0, 10),
    author: required(data.author, "author", file),
    tags: required<string[]>(data.tags, "tags", file),
    cover: required(data.cover, "cover", file),
    coverAlt: data.coverAlt ?? "",
    readingTime: data.readingTime ?? estimateReadingTime(content),
    featured: Boolean(data.featured),
    body: content,
    headings: extractHeadings(content),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    author: post.author,
    tags: post.tags,
    cover: post.cover,
    coverAlt: post.coverAlt,
    readingTime: post.readingTime,
    featured: post.featured,
  };
}

export function getPostMetas(): PostMeta[] {
  return getAllPosts().map(toMeta);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getFeaturedPost(posts: PostMeta[]) {
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getRelatedPosts(post: PostMeta, limit = 3): PostMeta[] {
  return getPostMetas()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map(({ p }) => p);
}

export function getLegalDoc(slug: string): LegalDoc {
  const file = `${slug}.mdx`;
  const raw = fs.readFileSync(path.join(LEGAL_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: required(data.title, "title", file),
    description: required(data.description, "description", file),
    lastUpdated: required(data.lastUpdated, "lastUpdated", file),
    body: content,
    headings: extractHeadings(content, 2),
  };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
