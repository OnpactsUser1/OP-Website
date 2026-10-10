import { getAllPosts } from "./content";

export type OgCard = { kicker: string; title: string };

export const OG_SIZE = { width: 1200, height: 630 };

const PAGE_CARDS: Record<string, OgCard> = {
  home: { kicker: "Fitness discipline app · Android now, iOS soon", title: "Commit. Perform. Deserve the Outcome" },
  "about-us": { kicker: "About OnPacts", title: "Intentions are easy. Follow-through is hard." },
  "contact-us": { kicker: "Contact us", title: "Need help or have a question? We're here to assist you!" },
  blog: { kicker: "The OnPacts blog", title: "Notes on discipline, written for real weeks." },
  "privacy-policy": { kicker: "Legal", title: "Privacy policy" },
  "terms-and-conditions": { kicker: "Legal", title: "Terms and conditions" },
  "payments-and-refunds": { kicker: "Legal", title: "Payments and refunds" },
  "account-deletion-policy": { kicker: "Legal", title: "Account deletion policy" },
};

/** All Open Graph cards, keyed by the file name served at /og/<key>.png. */
export function getOgCards(): Record<string, OgCard> {
  const cards: Record<string, OgCard> = { ...PAGE_CARDS };
  for (const post of getAllPosts()) {
    cards[`blog-${post.slug}`] = { kicker: "OnPacts blog", title: post.title };
  }
  return cards;
}

/** Image extensions bypass the trailingSlash redirect, so scrapers get a direct 200. */
export function ogImagePath(key: string) {
  return `/og/${key}.png`;
}
