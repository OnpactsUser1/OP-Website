import type { MetadataRoute } from "next";
import { getPostMetas } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about-us/", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact-us/", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy-policy/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/terms-and-conditions/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/payments-and-refunds/", priority: 0.4, changeFrequency: "monthly" },
  { path: "/account-deletion-policy/", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPostMetas();
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: absoluteUrl(r.path),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}/`),
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
