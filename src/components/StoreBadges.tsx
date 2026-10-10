import { AppStoreBadge } from "./AppStoreBadge";
import { GooglePlayBadge } from "./GooglePlayBadge";

export function StoreBadges({ height = 56, className = "" }: { height?: number; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      <GooglePlayBadge height={height} />
      <AppStoreBadge height={height} />
    </div>
  );
}
