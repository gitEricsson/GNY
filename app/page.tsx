'use client';

import Hero from '@/components/hero';
import Services from '@/components/services';
import About from '@/components/about';
import Values from '@/components/values';
import Contact from '@/components/contact';
// import Footer from "@/components/footer";
import { ScrollingText } from '@/components/scrolling-text';
import Testimonials from '@/components/testimonials';
import { useContext } from 'react';
import { LoadingContext } from '@/components/client-layout-wrapper';

export default function Home() {
  const isLoadingComplete = useContext(LoadingContext);

  return (
    <>
      <main className="min-h-screen">
        <Hero isLoadingComplete={isLoadingComplete ?? false} />
        <Services />
        {/* <ScrollingText /> */}
        <About />
        <Testimonials />
        <Values />
        <Contact />
      </main>
      {/* <Footer /> */}
    </>
  );
}
