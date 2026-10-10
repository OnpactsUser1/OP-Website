import { LegalPage, legalMetadata } from "@/components/LegalPage";

const SLUG = "terms-and-conditions";

export const metadata = legalMetadata(SLUG);

export default function TermsPage() {
  return <LegalPage slug={SLUG} />;
}
