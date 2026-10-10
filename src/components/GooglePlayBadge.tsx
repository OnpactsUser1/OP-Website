import Image from "next/image";
import { PLAY_STORE_URL } from "@/lib/site";

/** Official Google Play badge. Google's brand rules require at least the badge's own clear space around it. */
export function GooglePlayBadge({ height = 56, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 646) / 250);
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get it on Google Play"
      className={`inline-block rounded-xl transition-transform duration-300 hover:scale-[1.02] ${className}`}
    >
      <Image
        src="/badges/google-play-badge.png"
        alt="Get it on Google Play"
        width={width}
        height={height}
        className="h-auto"
        style={{ width, maxWidth: "100%" }}
      />
    </a>
  );
}
