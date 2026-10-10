import { evaluate } from "@mdx-js/mdx";
import { cacheLife } from "next/cache";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { rehypeConfirm } from "./rehype-confirm";

function MdxLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  );
}

const components = { a: MdxLink, table: MdxTable };

/** Compiles MDX at build time; cached so prerendering treats it as static work. */
export async function MdxContent({ source }: { source: string }) {
  "use cache";
  cacheLife("max");
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeConfirm],
  });
  return <Content components={components} />;
}
