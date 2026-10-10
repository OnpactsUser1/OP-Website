import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export type AccordionItem = { id: string; title: string; content: ReactNode };

/** Native <details> accordion: works without JavaScript and is keyboard accessible by default. */
export function Accordion({ items, name }: { items: AccordionItem[]; name?: string }) {
  return (
    <div className="card divide-y divide-line overflow-hidden p-0">
      {items.map((item) => (
        <details key={item.id} name={name} id={item.id} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-fg transition-colors duration-300 hover:bg-surface-2 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span>{item.title}</span>
            <ChevronDown
              aria-hidden
              className="size-5 shrink-0 text-accent-ink transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <div className="fade-in px-5 pb-6 leading-relaxed text-fg-2 sm:px-6">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
}
