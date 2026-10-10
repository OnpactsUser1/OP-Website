import GithubSlugger from "github-slugger";

export type Heading = { id: string; text: string; depth: 2 | 3 };

/** Extracts h2/h3 headings from markdown, producing the same ids rehype-slug assigns. */
export function extractHeadings(markdown: string, maxDepth: 2 | 3 = 3): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1].length as 2 | 3;
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    const id = slugger.slug(text);
    if (depth <= maxDepth) headings.push({ id, text, depth });
  }
  return headings;
}
