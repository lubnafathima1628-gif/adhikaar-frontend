'use client';

import { DiscoveryForm } from '@/components/discovery/discovery-form';
import { useParams } from 'next/navigation';

export default function DiscoveryCategoryPage() {
  const params = useParams();
  const category = params.category as string;

  return <DiscoveryForm category={category} />;
}
