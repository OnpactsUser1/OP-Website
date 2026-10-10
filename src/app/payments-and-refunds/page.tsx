import { LegalPage, legalMetadata } from "@/components/LegalPage";

const SLUG = "payments-and-refunds";

export const metadata = legalMetadata(SLUG);

export default function PaymentsAndRefundsPage() {
  return <LegalPage slug={SLUG} />;
}
