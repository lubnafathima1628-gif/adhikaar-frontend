'use client';

import { ResultsDisplay } from '@/components/results/results-display';

const MOCK_ASSETS = [
  {
    id: '1',
    type: 'Bank Deposit',
    name: 'Savings Account - ICICI Bank',
    amount: '₹45,000',
    status: 'verified' as const,
    source: 'ICICI Bank Database',
    discoveredDate: '2024-01-15',
    details: {
      accountNumber: 'XXXX-XXXX-1234',
      branchName: 'Mumbai Central',
      lastTransaction: '2022-03-20',
    },
  },
  {
    id: '2',
    type: 'Insurance Claim',
    name: 'Life Insurance Benefit',
    amount: '₹2,00,000',
    status: 'unverified' as const,
    source: 'LIC Database',
    discoveredDate: '2024-01-15',
    details: {
      policyNumber: 'POL-2024-XXXX',
      issuer: 'Life Insurance Corporation',
      maturityDate: '2025-06-30',
    },
  },
  {
    id: '3',
    type: 'Dividend - IEPF',
    name: 'Unclaimed Dividend - TCS Shares',
    amount: '₹12,500',
    status: 'pending' as const,
    source: 'IEPF Database',
    discoveredDate: '2024-01-15',
    details: {
      companyName: 'Tata Consultancy Services',
      shareholderID: 'TCS-XXXX-5678',
      yearOfDividend: '2021-2022',
    },
  },
];

export default function ResultsPage() {
  return (
    <ResultsDisplay
      assets={MOCK_ASSETS}
      totalAmount="₹2,57,500"
      matchScore={92}
    />
  );
}
