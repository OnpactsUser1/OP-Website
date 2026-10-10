import { LegalPage, legalMetadata } from "@/components/LegalPage";

const SLUG = "privacy-policy";

export const metadata = legalMetadata(SLUG);

export default function PrivacyPolicyPage() {
  return <LegalPage slug={SLUG} />;
}
