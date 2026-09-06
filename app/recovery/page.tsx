'use client';

import { RecoveryGuide } from '@/components/recovery/recovery-guide';
import { DOCUMENT_REQUIREMENTS } from '@/lib/constants';

export default function RecoveryPage() {
  const mockDocuments = (
    DOCUMENT_REQUIREMENTS.bank as Array<any>
  ).map((doc) => ({
    ...doc,
    status: 'pending' as const,
  }));

  return (
    <RecoveryGuide
      assetId="1"
      assetName="Savings Account - ICICI Bank (₹45,000)"
      documents={mockDocuments}
    />
  );
}
