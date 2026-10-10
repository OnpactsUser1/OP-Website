import { LegalPage, legalMetadata } from "@/components/LegalPage";

const SLUG = "account-deletion-policy";

export const metadata = legalMetadata(SLUG);

export default function AccountDeletionPolicyPage() {
  return <LegalPage slug={SLUG} />;
}
