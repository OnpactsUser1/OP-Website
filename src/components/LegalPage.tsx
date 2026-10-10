import type { Metadata } from "next";
import { getLegalDoc } from "@/lib/content";
import { MdxContent } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { LegalLayout } from "./LegalLayout";

export function legalMetadata(slug: string): Metadata {
  const doc = getLegalDoc(slug);
  return pageMetadata({ title: doc.title, description: doc.description, path: `/${slug}/`, ogKey: slug });
}

export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug);
  return (
    <LegalLayout
      title={doc.title}
      intro={doc.description}
      lastUpdated={doc.lastUpdated}
      headings={doc.headings}
    >
      <MdxContent source={doc.body} />
    </LegalLayout>
  );
}
