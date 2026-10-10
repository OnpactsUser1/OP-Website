"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";

const INTERVAL_MS = 4000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function QuoteCarousel({ quotes }: { quotes: string[] }) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const paused = userPaused ?? reducedMotion;

  useEffect(() => {
    if (paused || hovered) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % quotes.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, hovered, quotes.length]);

  return (
    <div
      className="flex flex-col items-center gap-4 lg:items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className="relative grid min-h-[3.5rem] w-full place-items-center sm:min-h-[2rem] lg:place-items-start"
        aria-live={paused ? "polite" : "off"}
        aria-atomic="true"
        role="region"
        aria-roledescription="carousel"
        aria-label="OnPacts quotes"
      >
        <p
          key={index}
          className="fade-in text-center text-lg font-medium text-fg-2 sm:text-xl lg:text-left"
        >
          “{quotes[index]}”
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center" role="group" aria-label="Choose a quote">
          {quotes.map((quote, i) => (
            <button
              key={quote}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i + 1} of ${quotes.length}`}
              aria-current={i === index ? "true" : undefined}
              className="grid h-6 min-w-6 place-items-center rounded-full"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ease-out ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-muted/50 hover:bg-muted"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setUserPaused(!paused)}
          aria-label={paused ? "Play quote rotation" : "Pause quote rotation"}
          className="grid size-7 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:text-fg"
        >
          {paused ? <Play aria-hidden className="size-3" /> : <Pause aria-hidden className="size-3" />}
        </button>
      </div>
    </div>
  );
}
