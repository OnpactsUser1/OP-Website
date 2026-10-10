import { Activity, Footprints, Radar, Target, Timer } from "lucide-react";
import type { ReactNode } from "react";

const RING_RADIUS = 84;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const REMAINING_FRACTION = (21 * 60 + 6) / (30 * 60);

function Tile({
  icon,
  label,
  value,
  sub,
  tone = "text-accent-ink",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#020617] p-3">
      <div className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.14em] text-[#94A3B8]">
        <span className={tone}>{icon}</span>
        {label}
      </div>
      <p className={`mt-1.5 font-mono text-lg font-bold leading-none ${tone}`}>{value}</p>
      <p className="mt-1 text-[10px] leading-tight text-[#94A3B8]">{sub}</p>
    </div>
  );
}

/** Static illustration of the app's live workout screen. Always rendered with the dark app palette. */
export function PhoneMockup() {
  return (
    <figure
      className="relative mx-auto w-[290px] sm:w-[310px]"
      aria-label="OnPacts live workout screen showing 21:06 time remaining, sensor confidence 90%, a 5,000 step target and 08:54 elapsed of a 30 minute session"
    >
      <div
        aria-hidden
        className="hero-glow absolute -inset-16 rounded-full"
      />
      <div className="relative rounded-[2.75rem] border border-white/12 bg-[#0b1020] p-2.5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
        <div className="overflow-hidden rounded-[2.2rem] bg-[#020617] text-white" aria-hidden>
          <div className="flex items-center justify-between px-6 pt-3 font-mono text-[10px] text-[#94A3B8]">
            <span>9:41</span>
            <span className="h-5 w-20 rounded-full bg-black" />
            <span>100%</span>
          </div>

          <div className="px-4 pb-5 pt-4">
            <div className="flex items-center justify-center gap-2">
              <span className="live-dot size-2 rounded-full bg-[#FB7185]" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#E2E8F0]">
                LIVE WORKOUT SESSION
              </p>
            </div>

            <div className="relative mx-auto mt-4 grid size-[188px] place-items-center">
              <svg viewBox="0 0 200 200" className="absolute inset-0 -rotate-90">
                <circle cx="100" cy="100" r={RING_RADIUS} fill="none" stroke="#141B2A" strokeWidth="12" />
                <circle
                  cx="100"
                  cy="100"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="#8DFF57"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - REMAINING_FRACTION)}
                  style={{ filter: "drop-shadow(0 0 8px rgb(141 255 87 / 0.55))" }}
                />
              </svg>
              <div className="text-center">
                <p className="font-mono text-[2.6rem] font-bold leading-none tracking-tight">21:06</p>
                <p className="mt-2 text-[9px] font-semibold tracking-[0.2em] text-[#94A3B8]">
                  TIME REMAINING
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Tile
                icon={<Footprints className="size-3" />}
                label="LIVE SCORE"
                value="1,284"
                sub="steps taken"
                tone="text-[#8DFF57]"
              />
              <Tile
                icon={<Radar className="size-3" />}
                label="SENSOR CONF."
                value="90%"
                sub="GPS + Pedometer"
                tone="text-[#10B981]"
              />
              <Tile
                icon={<Target className="size-3" />}
                label="TARGET"
                value="5,000"
                sub="steps"
                tone="text-[#60A5FA]"
              />
              <Tile
                icon={<Timer className="size-3" />}
                label="ELAPSED"
                value="08:54"
                sub="of 30 min"
                tone="text-[#FBBF24]"
              />
            </div>

            <div className="mt-3 flex h-11 items-center justify-center gap-2 rounded-[14px] bg-[#8DFF57] text-sm font-bold text-[#10210C]">
              <Activity className="size-4" />
              Check out
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
