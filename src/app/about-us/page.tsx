import { HeartHandshake, MapPin, Repeat, ShieldCheck, Handshake, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/Button";
import { Card, IconBadge } from "@/components/Card";
import { StoreBadges } from "@/components/StoreBadges";
import { PageHero, SectionHeading } from "@/components/Section";
import { pageMetadata } from "@/lib/metadata";
import { COMPANY, MISSION } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About us",
  description:
    "OnPacts exists because intentions are easy and follow-through is hard. Learn how we use plans, time slots, verified activity and honest rewards to build discipline through fitness.",
  path: "/about-us/",
  ogKey: "about-us",
});

const VALUES: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Commitment",
    body: "A plan you set before the week begins is a promise to yourself. We help you make it, and keep it.",
    icon: <Handshake className="size-5" />,
  },
  {
    title: "Honesty",
    body: "Verified effort only. Phone sensors confirm the work, so every reward reflects something you really did.",
    icon: <ShieldCheck className="size-5" />,
  },
  {
    title: "Consistency over intensity",
    body: "Thirty steady minutes in your slot beats one heroic session followed by three weeks off.",
    icon: <Repeat className="size-5" />,
  },
  {
    title: "Encouragement over competition",
    body: "No leaderboards, no ranking against strangers. Your only benchmark is the pact you made.",
    icon: <HeartHandshake className="size-5" />,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            Intentions are easy. <span className="text-accent-ink">Follow-through is hard.</span>
          </>
        }
        intro={MISSION}
      />

      <section className="py-20">
        <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-fg-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-fg">Our story</h2>
            <p>
              Most of us know what we should do for our health. We plan to walk every evening, to
              train three times a week, to finally make it a habit. Then the week happens. The plan
              quietly slips, and nobody notices except us.
            </p>
            <p>
              OnPacts exists because intentions are easy and follow-through is hard. Instead of
              relying on motivation, it uses gentle enforcement: a weekly plan you set in advance, a
              3-hour time slot you commit to, activity verified by your phone&apos;s sensors, and
              rewards tied only to what you actually did.
            </p>
            <p>
              There&apos;s no luck involved and no one to beat. You aren&apos;t ranked against
              anyone. You simply compare what you said you&apos;d do with what you did, week after
              week, until showing up becomes who you are. That is how we build discipline through
              fitness.
            </p>
          </div>

          <Card className="h-fit space-y-5 p-7">
            <IconBadge>
              <MapPin className="size-5" />
            </IconBadge>
            <div>
              <p className="eyebrow">Made in</p>
              <p className="mt-2 text-2xl font-extrabold text-fg">
                {COMPANY.city}, {COMPANY.country}
              </p>
              <p className="mt-2 text-fg-2">
                {COMPANY.legalName} is based in {COMPANY.city}, {COMPANY.region}. We build OnPacts
                for anyone, anywhere, who wants their effort to count.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t border-line bg-surface-2/50 py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Our values" title="What we stand for" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <li key={v.title}>
                <Card className="h-full p-7">
                  <IconBadge>{v.icon}</IconBadge>
                  <h3 className="mt-4 text-xl font-bold text-fg">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-fg-2">{v.body}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="container-site">
          <SectionHeading eyebrow="The team" title="The people behind the pact" />
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
            {[1, 2].map((n) => (
              <Card key={n} className="flex flex-col items-center p-8 text-center">
                <span
                  aria-hidden
                  className="grid size-24 place-items-center rounded-full border border-dashed border-line-strong bg-well text-muted"
                >
                  <UserRound className="size-10" />
                </span>
                <p className="mt-5">
                  <mark className="confirm">[Founder name, photo, short bio]</mark>
                </p>
                <p className="mt-2 text-sm text-muted">Placeholder: replace before launch.</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="container-site flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
            Make your first pact this week.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <StoreBadges height={56} className="justify-center" />
            <ButtonLink href="/contact-us/" variant="secondary" size="lg">
              Talk to us
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
