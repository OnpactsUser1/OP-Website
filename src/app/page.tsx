import {
  Ban,
  CalendarCheck,
  CalendarClock,
  CalendarOff,
  ChartColumn,
  CircleCheck,
  Clock,
  Flame,
  Footprints,
  Handshake,
  History,
  KeyRound,
  Lock,
  MoonStar,
  Radar,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Accordion } from "@/components/Accordion";
import { ButtonLink } from "@/components/Button";
import { Card, IconBadge } from "@/components/Card";
import { DownloadButtons } from "@/components/DownloadButtons";
import { StoreBadges } from "@/components/StoreBadges";
import { JsonLd } from "@/components/JsonLd";
import { GlowingLogo, Wordmark } from "@/components/Logo";
import { PhoneMockup } from "@/components/PhoneMockup";
import { QuoteCarousel } from "@/components/QuoteCarousel";
import { SectionHeading } from "@/components/Section";
import { FAQ } from "@/lib/faq";
import { faqJsonLd, mobileApplicationJsonLd } from "@/lib/jsonld";
import { HERO_QUOTES, PLAY_STORE_URL } from "@/lib/site";

const STEPS = [
  {
    n: "01",
    title: "Commit",
    icon: <Handshake className="size-5" />,
    body: "Before the week starts, pick how many days you'll work out and a 3-hour time slot.",
  },
  {
    n: "02",
    title: "Perform",
    icon: <Footprints className="size-5" />,
    body: "Walk or run for steps, or train for calories. Phone sensors track and verify it live.",
  },
  {
    n: "03",
    title: "Deserve the outcome",
    icon: <Trophy className="size-5" />,
    body: "Check out inside your slot on committed days, complete the week, and get rewarded.",
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <Flame className="size-5" />,
    title: "Steps and Calories challenges",
    body: "Walk or run toward a step target, or train toward a calorie goal. Pick what suits your week.",
  },
  {
    icon: <Radar className="size-5" />,
    title: "Live, verified tracking",
    body: "GPS and the pedometer work together, with a sensor confidence score shown as you move.",
  },
  {
    icon: <MoonStar className="size-5" />,
    title: "Keeps tracking with the screen off",
    body: "Pocket your phone. Your workout keeps running in the background until you check out.",
  },
  {
    icon: <History className="size-5" />,
    title: "Weekly History",
    body: "Every week at a glance, marked Reward Earned or Rewards Missed, so you see your pattern.",
  },
  {
    icon: <TrendingUp className="size-5" />,
    title: "Discipline score and streaks",
    body: "A score built on showing up when you said you would, plus streaks that reward consistency.",
  },
  {
    icon: <CalendarOff className="size-5" />,
    title: "2 leaves per month",
    body: "Life happens. Use a leave on a committed day and keep your week intact.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Demo week for new members",
    body: "Joined mid-week? Try it out with no commitment. Completed days are still rewarded.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Community connections",
    body: "Connect with people who encourage you. Support, not rankings.",
  },
  {
    icon: <ChartColumn className="size-5" />,
    title: "Behavioral insights",
    body: "Understand when you show up best and where your weeks tend to slip.",
  },
  {
    icon: <Share2 className="size-5" />,
    title: "Share your day",
    body: "Turn today's activity into a clean image and share it wherever you like.",
  },
  {
    icon: <KeyRound className="size-5" />,
    title: "Google or email sign-in",
    body: "Get started in seconds with your Google account or your email address.",
  },
];

const REWARD_RULES = [
  "Rewards vary week to week.",
  "On a committed week, your wallet is credited after the week ends, and only if every committed day was fulfilled by a completed activity or a leave.",
  "Only days checked out inside your time slot earn rewards. Leave days earn nothing.",
  "Missing a committed day means that week earns no reward, but nothing is ever deducted.",
  "Withdraw $5–$50 at a time to a bank account or PayPal.",
];

const HISTORY = [
  { week: "Week 41", days: "4 / 4 days", status: "Pending", tone: "text-amber" },
  { week: "Week 40", days: "4 / 4 days", status: "Reward Earned", tone: "text-emerald" },
  { week: "Week 39", days: "3 / 4 days", status: "Rewards Missed", tone: "text-muted" },
  { week: "Week 38", days: "5 / 5 days", status: "Reward Earned", tone: "text-emerald" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={[mobileApplicationJsonLd(), faqJsonLd(FAQ)]} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--glow-soft),transparent_60%)]"
        />
        <div className="container-site relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="-my-10 lg:-ml-14">
              <GlowingLogo size={84} />
            </div>
            <p className="mt-2 text-fg">
              <Wordmark className="text-2xl" />
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              Commit. Perform.{" "}
              <span className="text-accent-ink">Deserve the Outcome</span>
            </h1>
            <div className="mt-6 w-full">
              <QuoteCarousel quotes={HERO_QUOTES} />
            </div>
            <DownloadButtons className="mt-8 justify-center lg:justify-start" />
            <p className="mt-5 text-sm text-muted">
              Free on Android · iOS coming soon ·{" "}
              <Link
                href="#how-it-works"
                className="font-semibold text-accent-ink underline-offset-4 hover:underline"
              >
                See how it works
              </Link>
            </p>
          </div>
          <PhoneMockup />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps. Every week."
            intro="Intentions are easy. OnPacts gives yours a structure: a plan, a slot, and proof you showed up."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n}>
                <Card className="relative h-full overflow-hidden p-7">
                  <span
                    aria-hidden
                    data-n={step.n}
                    className="absolute -right-2 -top-4 font-mono text-8xl font-bold text-fg/[0.04] before:content-[attr(data-n)]"
                  />
                  <div className="flex items-center gap-3">
                    <IconBadge>{step.icon}</IconBadge>
                    <span className="font-mono text-sm font-bold text-accent-ink">Step {step.n}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-fg">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-2">{step.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Weekly cycle */}
      <section className="border-t border-line bg-surface-2/50 py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="The weekly cycle"
            title="Monday to Sunday, planned ahead."
            intro="Each week is a small pact with yourself. You set it before it starts, then you keep it."
          />

          <div className="card mt-14 p-6 sm:p-8">
            <div className="grid grid-cols-7 gap-1.5 sm:gap-3" aria-hidden>
              {DAYS.map((day, i) => (
                <div key={day} className="text-center">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-muted sm:text-xs">
                    {day}
                  </p>
                  <div
                    className={`mt-2 h-12 rounded-xl border sm:h-16 ${
                      i === 6
                        ? "border-amber/50 bg-amber/10"
                        : i % 2 === 0
                          ? "border-accent/40 bg-accent/12"
                          : "border-line bg-well"
                    }`}
                  >
                    {i === 6 && (
                      <Lock className="mx-auto mt-3.5 size-4 text-amber sm:mt-5 sm:size-5" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="sr-only">
              A week runs Monday to Sunday. The upcoming week locks on Sunday at 11:55 PM.
            </p>

            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              <li className="flex gap-4">
                <IconBadge>
                  <CalendarCheck className="size-5" />
                </IconBadge>
                <div>
                  <h3 className="font-bold text-fg">Weeks run Monday to Sunday</h3>
                  <p className="mt-1 text-fg-2">
                    The current week is locked once it starts. Show up in your slot on the days you committed.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <IconBadge tone="amber">
                  <CalendarClock className="size-5" />
                </IconBadge>
                <div>
                  <h3 className="font-bold text-fg">
                    Plan by <span className="font-mono">Sunday 11:55 PM</span>
                  </h3>
                  <p className="mt-1 text-fg-2">
                    Plan, change, or take a break until then. After that, the upcoming week locks.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <IconBadge tone="info">
                  <WandSparkles className="size-5" />
                </IconBadge>
                <div>
                  <h3 className="font-bold text-fg">Auto Week Planner</h3>
                  <p className="mt-1 text-fg-2">
                    Didn&apos;t plan? Your saved default plan is applied, or an automatic break.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Features"
            title="Everything that keeps you honest, and kind to yourself."
          />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <Card className="h-full transition-colors duration-300 hover:border-line-strong">
                  <IconBadge>{f.icon}</IconBadge>
                  <h3 className="mt-4 font-bold text-fg">{f.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-2">{f.body}</p>
                </Card>
              </li>
            ))}
            <li>
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] border border-accent/30 bg-deep p-6">
                <div aria-hidden className="hero-glow pointer-events-none absolute -right-16 -top-16 size-48" />
                <div className="relative">
                  <h3 className="font-bold text-fg">See it in your hand</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-2">
                    Free on Android, with iOS on the way. Plan your first week in a couple of minutes.
                  </p>
                </div>
                <ButtonLink href={PLAY_STORE_URL} size="sm" className="relative mt-5 self-start">
                  Get the app
                </ButtonLink>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Rewards */}
      <section className="border-t border-line bg-surface-2/50 py-20 sm:py-24">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Rewards, explained honestly"
              title="You're rewarded for what you actually did."
            />
            <ul className="mt-8 space-y-4">
              {REWARD_RULES.map((rule) => (
                <li key={rule} className="flex gap-3 text-fg-2">
                  <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-emerald" />
                  <span className="leading-relaxed">{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-lg font-bold text-fg">
              No luck. No competition. No gambling.
            </p>
          </div>

          <Card className="p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <IconBadge tone="emerald">
                  <Wallet className="size-5" />
                </IconBadge>
                <div>
                  <p className="text-sm text-muted">Weekly History</p>
                  <p className="font-semibold text-fg">Your last four weeks</p>
                </div>
              </div>
              <Clock aria-hidden className="size-5 text-muted" />
            </div>
            <ul className="mt-6 divide-y divide-line rounded-2xl border border-line bg-well">
              {HISTORY.map((row) => (
                <li key={row.week} className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div>
                    <p className="font-mono text-sm font-bold text-fg">{row.week}</p>
                    <p className="font-mono text-xs text-muted">{row.days}</p>
                  </div>
                  <span className={`text-sm font-semibold ${row.tone}`}>{row.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              A settled week shows “Pending” on Monday and Tuesday, and the amount from Wednesday.
              Missed weeks never take anything away.
            </p>
          </Card>
        </div>
      </section>

      {/* Demo week */}
      <section className="border-t border-line py-20 sm:py-24">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-deep p-8 sm:p-12">
            <div
              aria-hidden
              className="hero-glow pointer-events-none absolute -right-24 -top-24 size-80"
            />
            <div className="relative max-w-2xl">
              <p className="eyebrow">Demo week</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                Joined mid-week? Start with a trial.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-2">
                Your first week is a no-commitment Demo week that runs through Sunday. Try the
                workouts, learn the rhythm, and know that completed trial days are still rewarded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-labelledby="trust-heading" className="border-y border-line bg-surface-2/50">
        <div className="container-site grid gap-8 py-12 md:grid-cols-[1.2fr_2fr] md:items-center">
          <div className="flex items-start gap-4">
            <IconBadge tone="emerald">
              <ShieldCheck className="size-5" />
            </IconBadge>
            <h2 id="trust-heading" className="text-xl font-extrabold leading-snug text-fg">
              Not a medical service. Not a contest. Not gambling.
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            <li className="flex gap-3 text-sm text-fg-2">
              <Radar aria-hidden className="size-5 shrink-0 text-accent-ink" />
              Only sensor-verified activity counts toward your week.
            </li>
            <li className="flex gap-3 text-sm text-fg-2">
              <Ban aria-hidden className="size-5 shrink-0 text-accent-ink" />
              Rooted or jailbroken phones are blocked to keep it fair for everyone.
            </li>
            <li className="flex gap-3 text-sm text-fg-2">
              <Clock aria-hidden className="size-5 shrink-0 text-accent-ink" />
              Mismatched clocks and time zones are blocked too.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Common questions"
            intro={
              <>
                Can&apos;t find your answer?{" "}
                <Link href="/contact-us/" className="font-semibold text-accent-ink underline underline-offset-4">
                  Contact us
                </Link>
                .
              </>
            }
          />
          <Accordion
            items={FAQ.map((item, i) => ({
              id: `faq-${i + 1}`,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-line py-24">
        <div
          aria-hidden
          className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2"
        />
        <div className="container-site relative flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-4xl font-black tracking-tight text-fg sm:text-5xl">
            Show up for the pact you made.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-fg-2">
            Download OnPacts, plan your first week, and let your effort speak for itself.
          </p>
          <StoreBadges height={64} className="mt-8 justify-center" />
        </div>
      </section>
    </>
  );
}
