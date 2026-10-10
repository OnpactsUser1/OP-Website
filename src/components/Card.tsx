import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...rest
}: CardProps<T>) {
  const Tag = as ?? "div";
  return (
    <Tag className={`card p-6 ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function IconBadge({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "emerald" | "amber" | "info" | "rose";
}) {
  const tones = {
    accent: "bg-accent/12 text-accent-ink ring-accent/25",
    emerald: "bg-emerald/12 text-emerald ring-emerald/25",
    amber: "bg-amber/12 text-amber ring-amber/25",
    info: "bg-info/12 text-info ring-info/25",
    rose: "bg-rose/12 text-rose ring-rose/25",
  };
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 ${tones[tone]}`}
      aria-hidden
    >
      {children}
    </span>
  );
}
