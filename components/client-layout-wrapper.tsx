'use client';

import { useState, createContext } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { LoadingScreen } from '@/components/loading-screen';
import GlobalHeader from '@/components/global-header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

export const LoadingContext = createContext<boolean | undefined>(undefined);

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoadingComplete(true)} />
      <GlobalHeader />
      <div
        style={{
          opacity: isLoadingComplete ? 1 : 0,
          pointerEvents: isLoadingComplete ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <LoadingContext.Provider value={isLoadingComplete}>
          {children}
        </LoadingContext.Provider>
      </div>
      <Footer />
      <Toaster />
      <Analytics />
    </>
  );
}
