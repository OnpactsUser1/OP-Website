export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://onpacts.com"
).replace(/\/$/, "");

export const SITE_NAME = "OnPacts";
export const TAGLINE = "Commit. Perform. Deserve the Outcome";
export const MISSION = "We turn intentions into results.";
export const SITE_DESCRIPTION =
  "OnPacts is a fitness discipline app, free on Android with iOS coming soon. Commit to a weekly fitness plan, perform it with sensor-verified tracking, and get rewarded only for what you actually did.";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.onpacts.app";
export const PLAY_STORE_NAME = "OnPacts : Commit to Fitness";

/**
 * Set to the apps.apple.com URL once the iOS app is live. Until then the site shows a
 * non-clickable "Coming soon" badge: Apple's badge guidelines only allow the official
 * App Store badge for apps that are available to download.
 */
export const APP_STORE_URL: string | null = null;

export const SUPPORT_EMAIL = "support@onpacts.com";
export const PAYMENTS_EMAIL = "Payments@onpacts.com";

export const COMPANY = {
  legalName: "OnPacts Limited",
  city: "Nashik",
  region: "Maharashtra",
  country: "India",
  countryCode: "IN",
};

/** 256px copy of the app icon for on-page use; LOGO_FULL_SRC is the 500px original for structured data. */
export const LOGO_SRC = "/brand/logo-mark.png";
export const LOGO_FULL_SRC = "/brand/app_icon.png";

export const HERO_QUOTES = [
  "Building discipline through fitness",
  "Turning Intentions into Actions",
  "Making you better than Yesterday",
  "Stay true to your Fitness goals",
  "Commit to a weekly plan and verify habits",
  "Get Rewarded for Keeping commitments",
  "Earn the outcome you committed to",
  "Rewards follow the weeks you keep",
  "Show up for the pact you made",
];

export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/about-us/", label: "About" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact-us/", label: "Contact" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Product",
    links: [
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
      { href: "/blog/", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about-us/", label: "About us" },
      { href: "/contact-us/", label: "Contact us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy/", label: "Privacy policy" },
      { href: "/terms-and-conditions/", label: "Terms and conditions" },
      { href: "/payments-and-refunds/", label: "Payments and refunds" },
      { href: "/account-deletion-policy/", label: "Account deletion policy" },
    ],
  },
] as const;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
