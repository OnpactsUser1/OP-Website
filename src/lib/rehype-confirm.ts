import type { Element, ElementContent, Root, Text } from "hast";
import { visit, SKIP } from "unist-util-visit";

const CONFIRM_PATTERN = /\[CONFIRM:[^\]]*\]/g;

/** Wraps every "[CONFIRM: …]" placeholder in <mark class="confirm"> so legal review items stand out. */
export function rehypeConfirm() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      if ((parent as Element).tagName === "mark") return;
      const value = node.value;
      if (!CONFIRM_PATTERN.test(value)) return;
      CONFIRM_PATTERN.lastIndex = 0;

      const parts: ElementContent[] = [];
      let last = 0;
      for (const match of value.matchAll(CONFIRM_PATTERN)) {
        const start = match.index ?? 0;
        if (start > last) parts.push({ type: "text", value: value.slice(last, start) });
        parts.push({
          type: "element",
          tagName: "mark",
          properties: { className: ["confirm"] },
          children: [{ type: "text", value: match[0] }],
        });
        last = start + match[0].length;
      }
      if (last < value.length) parts.push({ type: "text", value: value.slice(last) });

      parent.children.splice(index, 1, ...parts);
      return [SKIP, index + parts.length];
    });
  };
}
