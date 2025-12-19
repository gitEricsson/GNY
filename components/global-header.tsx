'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';

export default function GlobalHeader() {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (!isHomePage) {
    return null;
  }
  return <Navigation />;
}