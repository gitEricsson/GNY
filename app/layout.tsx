import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/client-layout-wrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
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
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
