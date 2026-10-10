"use client";

import { Check, Link2, Mail, MessageCircle, Share2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

const chip =
  "inline-flex h-9 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-semibold text-fg-2 transition-colors duration-300 hover:border-line-strong hover:text-fg";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(
    noopSubscribe,
    () => "share" in navigator,
    () => false,
  );

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {canNativeShare && (
        <button type="button" className={chip} onClick={() => navigator.share({ title, url }).catch(() => {})}>
          <Share2 aria-hidden className="size-4" />
          Share
        </button>
      )}
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={chip}
          aria-label={`Share on ${l.label} (opens in a new tab)`}
        >
          {l.label}
        </a>
      ))}
      <a
        href={`https://wa.me/?text=${t}%20${u}`}
        target="_blank"
        rel="noopener noreferrer"
        className={chip}
        aria-label="Share on WhatsApp (opens in a new tab)"
      >
        <MessageCircle aria-hidden className="size-4" />
        WhatsApp
      </a>
      <a href={`mailto:?subject=${t}&body=${u}`} className={chip} aria-label="Share by email">
        <Mail aria-hidden className="size-4" />
        Email
      </a>
      <button type="button" className={chip} onClick={copy}>
        {copied ? <Check aria-hidden className="size-4 text-emerald" /> : <Link2 aria-hidden className="size-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
