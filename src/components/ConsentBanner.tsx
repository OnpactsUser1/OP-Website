"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Button } from "./Button";

const CONSENT_KEY = "onpacts-analytics-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Choice = "granted" | "denied" | "unset" | "server";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readChoice(): Choice {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

function saveChoice(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {}
  listeners.forEach((l) => l());
}

function loadGoogleAnalytics(id: string) {
  if (document.getElementById("ga-loader")) return;
  const script = document.createElement("script");
  script.id = "ga-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
}

/**
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set. Analytics (and its cookies)
 * load only after the visitor explicitly accepts.
 */
export function ConsentBanner() {
  const choice = useSyncExternalStore<Choice>(subscribe, readChoice, () => "server");

  useEffect(() => {
    if (GA_ID && choice === "granted") loadGoogleAnalytics(GA_ID);
  }, [choice]);

  if (!GA_ID || choice !== "unset") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Analytics consent"
      className="fade-in fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line-strong bg-surface p-5 shadow-2xl sm:bottom-6"
    >
      <p className="text-sm leading-relaxed text-fg-2">
        We&apos;d like to use analytics cookies to understand how visitors use this site.
        Nothing loads unless you accept.
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => saveChoice("granted")}>
          Accept
        </Button>
        <Button size="sm" variant="secondary" onClick={() => saveChoice("denied")}>
          Decline
        </Button>
      </div>
    </div>
  );
}
