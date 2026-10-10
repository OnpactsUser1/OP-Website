import type { FaqItem } from "./faq";
import type { PostMeta } from "./content";
import { ogImagePath } from "./og-cards";
import {
  absoluteUrl,
  APP_STORE_URL,
  COMPANY,
  LOGO_FULL_SRC,
  PLAY_STORE_NAME,
  PLAY_STORE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: COMPANY.legalName,
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: absoluteUrl(LOGO_FULL_SRC),
    slogan: "Commit. Perform. Deserve the Outcome",
    email: SUPPORT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.city,
      addressRegion: COMPANY.region,
      addressCountry: COMPANY.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SUPPORT_EMAIL,
        availableLanguage: ["English"],
      },
    ],
    sameAs: APP_STORE_URL ? [PLAY_STORE_URL, APP_STORE_URL] : [PLAY_STORE_URL],
  };
}

export function mobileApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: PLAY_STORE_NAME,
    alternateName: SITE_NAME,
    description: SITE_DESCRIPTION,
    operatingSystem: APP_STORE_URL ? "Android, iOS" : "Android",
    applicationCategory: "HealthApplication",
    url: PLAY_STORE_URL,
    downloadUrl: PLAY_STORE_URL,
    installUrl: PLAY_STORE_URL,
    image: absoluteUrl(LOGO_FULL_SRC),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function blogPostingJsonLd(post: PostMeta) {
  const url = absoluteUrl(`/blog/${post.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: absoluteUrl(ogImagePath(`blog-${post.slug}`)),
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: COMPANY.legalName, logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_FULL_SRC) } },
  };
}
