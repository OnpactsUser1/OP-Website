# OnPacts website (onpacts.com)

The official marketing, blog and legal site for **OnPacts : Commit to Fitness**, the fitness discipline app by OnPacts Limited, Nashik, India (live on Android, iOS coming soon).

> Commit. Perform. Deserve the Outcome

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components) + **TypeScript**
- **Tailwind CSS v4** with CSS-variable design tokens (dark default, light theme via `data-theme`)
- **MDX** for blog posts and legal documents (`@mdx-js/mdx`, `gray-matter`, `remark-gfm`, `rehype-slug`)
- **Lucide** icons, **Inter** + **JetBrains Mono** via `next/font`
- Every page is prerendered at build time. The only server code is `POST /api/contact/`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks)
npm run start      # serve the production build
npm run lint
```

Requires Node.js 20.9 or newer.

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No (defaults to `https://onpacts.com`) | Canonical URLs, sitemap, Open Graph and JSON-LD. Set it on preview deployments if you want previews to self-reference. |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics 4 measurement ID. When set, a consent banner appears and analytics loads **only after the visitor accepts**. Leave unset and the site sets no tracking cookies at all. |

## Project structure

```
content/
  blog/*.mdx              Blog posts (one file per post; filename = slug)
  legal/*.mdx             Terms, privacy, payments/refunds, account deletion
public/
  badges/                 Official Google Play and App Store badges
  blog/*.svg              Blog cover art
  brand/                  App icon logo, full size and 256px (see "Logo" below)
  icons/                  Web app manifest icons
src/
  app/                    Routes (all with trailing slashes)
    api/contact/route.ts  Contact form endpoint (placeholder, see TODO)
    og/[image]/route.tsx  Open Graph images served as /og/<page>.png
    sitemap.ts, robots.ts, manifest.ts, icon.png, apple-icon.png, not-found.tsx
  components/             Header, Footer, Button, Card, Accordion, ThemeToggle,
                          QuoteCarousel, PhoneMockup, LegalLayout, TableOfContents,
                          ContactForm, BlogExplorer, ShareButtons, ConsentBanner, ...
  lib/                    Site constants, FAQ, content loaders, MDX renderer,
                          JSON-LD builders, metadata helper
```

### Routes

| Page | URL |
| --- | --- |
| Home | `/` |
| About us | `/about-us/` |
| Contact us | `/contact-us/` |
| Blog index | `/blog/` (tag filter: `?tag=Habits`, pagination: `?page=2`) |
| Blog post | `/blog/[slug]/` |
| Privacy policy | `/privacy-policy/` |
| Terms and conditions | `/terms-and-conditions/` |
| Payments and refunds | `/payments-and-refunds/` |
| Account deletion policy | `/account-deletion-policy/` |

`trailingSlash: true` is set in `next.config.ts`, so `/about-us` permanently redirects to `/about-us/`. Unknown URLs render the styled 404 page.

## Editing content

### Blog posts

Add `content/blog/<slug>.mdx`:

```mdx
---
title: "Your title"
description: One or two sentences used for the excerpt, meta description and social cards.
date: 2026-10-20
author: The OnPacts Team
tags: [Habits, Planning]
cover: /blog/<slug>.svg        # any image in /public; 1200×630 recommended
coverAlt: Describe the cover image for screen readers.
readingTime: 4 min read        # optional; estimated from word count if omitted
featured: false                # the featured post (or newest) leads the blog index
---

Write in Markdown. Use `##` and `###` headings; they build the table of contents.
```

Avoid raw `{` and `<` characters in MDX text (they are parsed as JSX). Each post automatically gets an Open Graph image, BlogPosting JSON-LD, a sitemap entry and related-post links (by shared tags).

The blog index shows 6 posts per page (`PAGE_SIZE` in `src/components/BlogExplorer.tsx`); pagination controls appear once there are more posts than that.

### Legal documents

Edit the MDX files in `content/legal/`. Update `lastUpdated` in the frontmatter when the text changes. `##` headings become the sticky table of contents. Any `[CONFIRM: …]` text is automatically highlighted in amber on the page so it can't be missed; remove each one once confirmed.

### FAQ, quotes and site details

- FAQ (home page + FAQPage JSON-LD): `src/lib/faq.ts`
- Hero quotes, nav, emails, store URLs, company details: `src/lib/site.ts`

### App Store launch

Until the iOS app is live, the site shows a non-clickable "Coming soon on the App Store" badge next to the Google Play badge (Apple only allows its official badge for apps that can be downloaded). On launch day:

1. Set `APP_STORE_URL` in `src/lib/site.ts` to the `https://apps.apple.com/...` URL. Every badge switches to Apple's official "Download on the App Store" badge (`public/badges/app-store-badge.svg`) linking there, and the MobileApplication / Organization JSON-LD adds iOS automatically.
2. Search for `iOS coming soon`, `iOS on the way`, `iOS soon` and `once released` in `src/` and `content/` and update that copy.
3. Resolve the iOS `[CONFIRM: …]` items in the privacy policy.

### Logo

All logo files are generated from the 500×500 app icon (the mark on a white circle):

| File | Used for |
| --- | --- |
| `public/brand/app_icon.png` | Original 500px; Organization / app logo in JSON-LD |
| `public/brand/logo-mark.png` | 256px copy used on the page (header, footer, hero, blog CTA) and in the Open Graph cards |
| `src/app/icon.png` | Favicon (64px) |
| `src/app/apple-icon.png` | iOS home screen icon (180px, white background) |
| `public/icons/icon-192.png`, `icon-512.png` | Web app manifest icons |
| `public/icons/maskable-512.png` | Manifest maskable icon (mark scaled to 80% so Android's mask doesn't crop it) |

If the logo changes, regenerate each size from the new 500px PNG (for example with `sharp`, which Next.js already installs) and keep the same file names.

## Items to confirm before launch

### `[CONFIRM: …]` placeholders (legal review)

**Terms and conditions** (`content/legal/terms-and-conditions.mdx`)

1. Minimum age to create an account and receive rewards (section 2)
2. Whether failed withdrawal amounts return to the wallet automatically (section 9)
3. Payout processor, timing and fees (section 9)
4. Registered office address and company registration number (section 13)
5. Governing jurisdiction / courts (section 14)

**Privacy policy** (`content/legal/privacy-policy.mdx`)

6. Registered address, and whether a data protection officer or grievance officer must be named (Who we are)
7. Whether GPS coordinates are stored on servers or only used on the phone (Activity data)
8. Payout processor that receives bank/PayPal details (Wallet and withdrawals)
9. Ads consent tool, e.g. Google User Messaging Platform (Ads)
10. Whether the iOS app requests App Tracking Transparency permission (Ads)
11. Payout processor (Storage and processors)
12. iOS permission list and screen-off tracking on iPhone, once the iOS app is released (Permissions explained)
13. Retention periods for account, activity, payment and support data (Retention and deletion)
14. Minimum age (Children's privacy)
15. Hosting regions for Supabase and Firebase (International transfers)

**Payments and refunds** (`content/legal/payments-and-refunds.mdx`)

16. Typical payout time, any fees, currency conversion (Withdrawals)
17. Whether failed amounts return to the wallet automatically (Failed or incorrect payouts)

**Account deletion policy** (`content/legal/account-deletion-policy.mdx`)

18. Response time for email deletion requests
19. Complete list of deleted data and the deletion timeframe
20. Retention period for payment and withdrawal records
21. Retention period for support conversations
22. Retention period for fraud and abuse records
23. Backup retention period
24. Firebase (Crashlytics / Analytics) data retention settings

Find them all with:

```bash
rg -n "\[CONFIRM:" content src
```

### Other placeholders

- **About us team section:** `[Founder name, photo, short bio]` in `src/app/about-us/page.tsx` (two cards).
- **Contact email delivery:** `src/app/api/contact/route.ts` validates submissions and returns a ticket reference, but doesn't send anything yet. Wire up an email provider (Resend, Postmark, SendGrid, Amazon SES…) at the `TODO(email-provider)` comment, and add its API key as a server-only environment variable.
- **Attachment size on Vercel:** Vercel Functions accept request bodies up to 4.5 MB, while the form allows 3 × 5 MB attachments. Before launch, either upload attachments directly to storage (e.g. signed upload URLs to Supabase Storage or S3) and send only the links to `/api/contact/`, or lower the per-file limit in `src/lib/contact.ts`.

## Deploying to Vercel

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected **Next.js** framework preset (build command `next build`, no output directory override).
3. Under **Environment Variables**, optionally add `NEXT_PUBLIC_SITE_URL=https://onpacts.com` and `NEXT_PUBLIC_GA_ID`, plus your email provider key once the contact route is wired up.
4. Deploy.
5. In **Settings → Domains**, add `onpacts.com` and `www.onpacts.com`, set `onpacts.com` as primary (redirecting `www`), and update DNS at your registrar as Vercel instructs.
6. After the domain is live:
   - Check that the in-app links still resolve: `/privacy-policy/`, `/terms-and-conditions/`, `/account-deletion-policy/`.
   - Add `https://onpacts.com/account-deletion-policy/` as the **account deletion URL** in Google Play Console (App content → Data safety / Data deletion).
   - Submit `https://onpacts.com/sitemap.xml` in Google Search Console.
   - Validate structured data with the [Rich Results Test](https://search.google.com/test/rich-results) on `/` (FAQPage, MobileApplication) and on a blog post (BlogPosting).
   - Run Lighthouse against the production URL (mobile and desktop).

## Accessibility and performance notes

- Semantic landmarks, skip link, visible `:focus-visible` rings, labelled controls, and alt text on every meaningful image.
- `prefers-reduced-motion` disables the pulse rings and fades, and pauses the quote carousel by default; the carousel always has a pause/play control.
- Theme choice is stored in `localStorage` (`onpacts-theme`) and applied by an inline script before first paint, so there's no flash.
- The FAQ accordion uses native `<details>`, so it works without JavaScript.
