'use client';

import { useState, useEffect, createContext } from 'react';
import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LoadingScreen } from '@/components/loading-screen';
import GlobalHeader from '@/components/global-header';
import Footer from '@/components/footer';

// Create a context for the loading state
export const LoadingContext = createContext<boolean | undefined>(undefined);

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const metadata: Metadata = {
  title:
    'Gloria & Young HR Consulting Ltd - Your People. Your Growth. Our Expertise.',
  description:
    'Strategic HR solutions for businesses in Nigeria. Expert recruitment, training, compliance, and organizational development services.',
  keywords: [
    'HR consulting Nigeria',
    'HR services Lagos',
    'recruitment services',
    'talent acquisition',
    'HR compliance',
    'performance management',
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${playfair.className} font-sans antialiased`}
      >
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

        <Analytics />
      </body>
    </html>
  );
}
