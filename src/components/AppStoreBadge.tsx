import Image from "next/image";
import { Clock3 } from "lucide-react";
import { APP_STORE_URL } from "@/lib/site";

/*
 * Sized to line up with GooglePlayBadge at the same `height`: the Play PNG keeps 16.4% clear
 * space on each side, so the visible badge is 67.2% of the box.
 */
const PAD = 0.164;
const VISIBLE = 0.672;

export function AppStoreBadge({ height = 56, className = "" }: { height?: number; className?: string }) {
  const h = Math.round(height * VISIBLE);
  const w = Math.round((h * 135) / 40);
  const pad = Math.round(height * PAD);

  if (APP_STORE_URL) {
    return (
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className={`inline-block rounded-xl transition-transform duration-300 hover:scale-[1.02] ${className}`}
        style={{ padding: pad }}
      >
        <Image
          src="/badges/app-store-badge.svg"
          alt="Download on the App Store"
          width={w}
          height={h}
          unoptimized
          style={{ width: w, height: h, maxWidth: "100%" }}
        />
      </a>
    );
  }

  return (
    <span className={`inline-block ${className}`} style={{ padding: pad }}>
      <span
        className="flex items-center justify-center gap-[0.35em] border border-[#A6A6A6] bg-black text-white"
        style={{ width: w, height: h, borderRadius: h * 0.17, fontSize: h }}
      >
        <Clock3 aria-hidden strokeWidth={2} style={{ width: "0.5em", height: "0.5em" }} />
        <span className="flex flex-col leading-none">
          <span style={{ fontSize: "0.2em" }} className="font-medium tracking-wide">
            Coming soon on the
          </span>
          <span style={{ fontSize: "0.4em", marginTop: "0.08em" }} className="font-semibold tracking-tight">
            App Store
          </span>
        </span>
      </span>
    </span>
  );
}
