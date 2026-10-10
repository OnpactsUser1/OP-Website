import Link from "next/link";
import { ArrowRight, CircleHelp, Clock, FileText, Mail, Wallet } from "lucide-react";
import { IconBadge } from "@/components/Card";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { PAYMENTS_EMAIL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact us",
  description:
    "Need help or have a question about OnPacts? Send us a message about activities, rewards, withdrawals, scheduling or your account. We typically respond within 24 hours on business days.",
  path: "/contact-us/",
  ogKey: "contact-us",
});

const SHORTCUTS = [
  { href: "/#faq", title: "FAQ's", sub: "Common questions", icon: <CircleHelp className="size-5" /> },
  { href: "/terms-and-conditions/", title: "T&C", sub: "Policies & legal", icon: <FileText className="size-5" /> },
];

const EMAILS = [
  { email: SUPPORT_EMAIL, label: "General support", icon: <Mail className="size-5" />, tone: "accent" as const },
  { email: PAYMENTS_EMAIL, label: "Payments and withdrawals", icon: <Wallet className="size-5" />, tone: "emerald" as const },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="container-site relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div>
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-fg sm:text-5xl">
            Need help or have a question? We&apos;re here to{" "}
            <span className="text-accent-ink">assist you!</span>
          </h1>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {SHORTCUTS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="card group flex items-center gap-4 p-4 transition-colors duration-300 hover:border-line-strong"
                >
                  <IconBadge>{s.icon}</IconBadge>
                  <span className="flex-1">
                    <span className="block font-bold text-fg">{s.title}</span>
                    <span className="block text-sm text-muted">{s.sub}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="my-10 flex items-center gap-4" role="separator" aria-label="Or reach us via">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-xs font-semibold tracking-[0.18em] text-muted">
              OR REACH US VIA
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <ul className="space-y-3">
            {EMAILS.map((e) => (
              <li key={e.email}>
                <a
                  href={`mailto:${e.email}`}
                  className="card flex items-center gap-4 p-4 transition-colors duration-300 hover:border-line-strong"
                >
                  <IconBadge tone={e.tone}>{e.icon}</IconBadge>
                  <span>
                    <span className="block font-semibold text-fg">{e.email}</span>
                    <span className="block text-sm text-muted">{e.label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-center gap-2 text-sm text-fg-2">
            <Clock aria-hidden className="size-4 text-accent-ink" />
            We typically respond within 24 hours on business days.
          </p>
        </div>

        <div>
          <h2 className="sr-only">Send us a message</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
