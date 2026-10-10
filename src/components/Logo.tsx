import Image from "next/image";
import { LOGO_SRC } from "@/lib/site";

export function LogoMark({
  size = 36,
  priority = false,
  className = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={size}
      height={size}
      priority={priority}
      unoptimized
      className={`rounded-full light:ring-1 light:ring-line-strong ${className}`}
    />
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-mono font-bold tracking-tight ${className}`}>
      OnPacts
    </span>
  );
}

/** Logo with the splash-screen glow and slow concentric pulse rings. */
export function GlowingLogo({ size = 112 }: { size?: number }) {
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size * 2.6, height: size * 2.6 }}
    >
      <div className="hero-glow absolute inset-0 rounded-full" aria-hidden />
      {[0, 1.6, 3.2].map((delay) => (
        <span
          key={delay}
          aria-hidden
          className="pulse-ring absolute inset-[8%] rounded-full border border-accent/40"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <span
        aria-hidden
        className="absolute rounded-full border border-line-strong"
        style={{ width: size * 1.55, height: size * 1.55 }}
      />
      <LogoMark
        size={size}
        priority
        className="relative shadow-[0_0_60px_rgb(141_255_87/0.35)]"
      />
    </div>
  );
}
