import { Download } from "lucide-react";
import { ButtonLink, buttonClasses } from "./Button";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/site";

export function DownloadButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap ${className}`}>
      <ButtonLink href={PLAY_STORE_URL} size="lg" className="px-5!">
        <Download aria-hidden className="size-5" />
        Download for Android
      </ButtonLink>
      {APP_STORE_URL ? (
        <ButtonLink href={APP_STORE_URL} variant="secondary" size="lg" className="px-5!">
          <Download aria-hidden className="size-5" />
          Download for iOS
        </ButtonLink>
      ) : (
        <span
          aria-disabled="true"
          className={buttonClasses(
            "secondary",
            "lg",
            "px-5! cursor-not-allowed opacity-70 hover:bg-transparent active:scale-100",
          )}
        >
          <Download aria-hidden className="size-5" />
          Download for iOS
          <span
            aria-hidden
            className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider"
          >
            Soon
          </span>
          <span className="sr-only">(coming soon)</span>
        </span>
      )}
    </div>
  );
}
