import type { Metadata } from "next";
import { ArrowLeft, Compass } from "lucide-react";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2"
      />
      <div className="container-site relative flex flex-col items-center py-28 text-center sm:py-36">
        <p className="font-mono text-7xl font-bold text-accent-ink sm:text-8xl">404</p>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          This page skipped its workout.
        </h1>
        <p className="mt-4 max-w-md text-lg text-fg-2">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on plan.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg">
            <ArrowLeft aria-hidden className="size-4" />
            Back to home
          </ButtonLink>
          <ButtonLink href="/blog/" variant="secondary" size="lg">
            <Compass aria-hidden className="size-4" />
            Read the blog
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
