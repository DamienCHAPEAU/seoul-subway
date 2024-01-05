'use client';

import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

export const RefreshDataButton = () => {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated((lastUpdated) => lastUpdated + 1);
    }, 2000);
    if (lastUpdated > 20) {
      router.refresh();
      setLastUpdated(0);
    }
    return () => clearInterval(interval);
  }, [lastUpdated, router]);

  return (
    <aside className="fixed bottom-0 right-0 m-6">
      <Button
        className="flex items-center justify-center gap-3 rounded-full"
        variant="outline"
        onClick={() => router.refresh()}
      >
        <RotateCw className="h-4 w-4" />
        Last updated {lastUpdated} sec ago
      </Button>
    </aside>
  );
};
