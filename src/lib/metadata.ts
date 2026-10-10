import type { Metadata } from "next";
import { OG_SIZE, ogImagePath } from "./og-cards";
import { absoluteUrl, SITE_NAME } from "./site";

/** Per-page metadata with canonical URL, Open Graph and Twitter card fields filled in consistently. */
export function pageMetadata({
  title,
  description,
  path,
  ogKey,
  type = "website",
  extra,
}: {
  title: string;
  description: string;
  path: string;
  ogKey: string;
  type?: "website" | "article";
  extra?: Record<string, unknown>;
}): Metadata {
  const url = absoluteUrl(path);
  const image = { url: absoluteUrl(ogImagePath(ogKey)), ...OG_SIZE, alt: title, type: "image/png" };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [image],
      ...extra,
    } as Metadata["openGraph"],
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
