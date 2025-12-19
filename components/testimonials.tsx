'use client';

import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import Image from 'next/image';

const testimonials = [
  {
    name: 'Chijoke Uguenyi',
    role: 'MD',
    company: 'PWAN Homes',
    content:
      'Gloria & Young transformed our recruitment process. Their professionalism was unmatched.',
    rating: 5,
  },
  {
    name: 'Edwin Ifeadigo',
    role: 'CEO/CSO',
    company: 'Authentic Heritage Ltd',
    content: 'You are a golden fish to us. Always a pleasure working with you.',
    rating: 5,
  },
  {
    name: 'Joy',
    role: 'Operations Manager',
    company: 'Rasify Real Estate',
    content:
      "Our team's productivity improved dramatically after their training.",
    rating: 5,
  },
  {
    name: 'Desmond Amobi',
    role: 'CEO',
    company: 'Villa Distel Apartments',
    content:
      'We finally found an HR partner who understands both compliance and culture.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate carousel (mobile only)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Sticky scroll effect on desktop
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialsListRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: testimonialsListRef,
    offset: ['start end', 'end start'],
  });

  const outerRotation = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 360 * 1]),
    { stiffness: 100, damping: 30 }
  );

  const innerRotation = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -360 * 1]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section
      ref={containerRef}
      className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-clip"
    >
      {/* --- Global Background Texture (UPDATED TO STICKY) --- */}
      {/* 1. The outer div is 'absolute inset-0' to fill the entire section height behind content.
          2. The inner div is 'sticky top-0 h-screen' so the image stays fixed in the viewport 
             while the section scrolls.
      */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] mix-blend-overlay opacity-90"></div>
        </div>
      </div>

      {/* --- Section Background Pattern (Animated Dots) --- */}
      {/* Optional: I added 'z-0' here to keep it on the same layer level as the texture 
          so it doesn't accidentally cover text.
      */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 5,
          ease: 'easeInOut',
        }}
        className="absolute top-6 left-[50%] grid grid-cols-8 gap-2 opacity-10 pointer-events-none z-0"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-navy rounded-full" />
        ))}
      </motion.div>

      {/* Added 'relative z-10' to container to ensure text sits above the sticky background */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start md:w-full md:items-center">
          {/* LEFT SIDE (Sticky Content) */}
          <div className="lg:w-[40%] lg:sticky lg:top-32 h-max">
            <div className="space-y-3 sm:justify-items-center md:justify-items-center">
              <h2 className="text-4xl md:text-5xl font-bold text-navy">
                What Our <span className="text-gold">Clients Say</span>
              </h2>

              <p className="text-xl text-center text-gray-700">
                Real feedback from businesses we've helped transform.
              </p>

              {/* <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <img
                        src={`/placeholder?u=${i}`}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-navy pl-4">
                  Trusted by 100+ Clients
                </div>
              </div> */}
            </div>

            {/* SCROLL-DRIVEN GEAR ANIMATION (Desktop Only) */}
            <div className="hidden lg:flex lg:justify-center lg:pt-8">
              <motion.div
                style={{ rotate: outerRotation }}
                className="relative w-48 h-48 text-gold"
              >
                <svg
                  viewBox="0 0 511.999 511.999"
                  className="w-full h-[80%] absolute top-5 left-0 text-gold"
                  style={{ overflow: 'visible' }}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="10"
                    d="M498.553,214.41l-47.521-9.429c-4.567-17.936-11.559-35.036-20.882-51.063l26.77-40.021 c4.43-6.623,3.563-15.453-2.071-21.088l-35.657-35.657c-5.635-5.635-14.466-6.502-21.088-2.071l-39.644,26.518 c-16.168-9.592-33.455-16.797-51.615-21.513l-9.253-46.639C296.041,5.631,289.183,0,281.214,0h-50.429 c-7.968,0-14.826,5.631-16.376,13.447l-9.253,46.639c-18.159,4.716-35.446,11.921-51.614,21.513L113.898,55.08 c-6.625-4.432-15.456-3.563-21.088,2.071L57.153,92.81c-5.635,5.635-6.502,14.465-2.071,21.088l26.77,40.021 c-9.323,16.027-16.315,33.128-20.882,51.063l-47.521,9.429C5.631,215.959,0,222.818,0,230.786v50.429 c0,7.968,5.632,14.826,13.447,16.376l48.135,9.549c4.693,17.532,11.713,34.243,20.965,49.901L55.08,398.102 c-4.43,6.623-3.563,15.455,2.071,21.088l35.657,35.657c5.634,5.635,14.465,6.5,21.088,2.071l41.438-27.717 c15.524,8.995,32.052,15.811,49.355,20.353l9.72,48.997c1.55,7.816,8.408,13.447,16.376,13.447h50.429 c7.968,0,14.826-5.631,16.376-13.447l9.72-48.997c17.302-4.542,33.831-11.359,49.355-20.353l41.438,27.717 c14.747,9.864,22.941-3.925,56.745-37.729c5.635-5.634,6.502-14.465,2.071-21.088l-27.467-41.062 c9.253-15.658,16.273-32.37,20.965-49.901l48.135-9.549c7.815-1.55,13.447-8.408,13.447-16.376v-50.429 C512,222.818,506.369,215.959,498.553,214.41z M478.609,267.506l-45.193,8.966c-6.568,1.302-11.723,6.404-13.094,12.96 c-4.389,20.995-12.682,40.717-24.646,58.616c-3.754,5.617-3.753,12.945,0.003,18.561l25.863,38.665l-16.271,16.27l-38.953-26.056 c-5.571-3.726-12.828-3.761-18.434-0.087c-17.828,11.682-37.404,19.753-58.188,23.986c-6.594,1.342-11.736,6.512-13.045,13.111 l-9.146,46.111h-23.011l-9.148-46.112c-1.309-6.599-6.451-11.768-13.045-13.111c-20.784-4.233-40.361-12.304-58.188-23.986 c-5.604-3.674-12.865-3.64-18.434,0.087l-38.953,26.056l-16.269-16.271l25.863-38.665c3.757-5.616,3.758-12.944,0.003-18.561 c-11.964-17.899-20.256-37.621-24.646-58.616c-1.37-6.556-6.525-11.658-13.094-12.96l-45.192-8.964v-23.011l44.725-8.873 c6.646-1.319,11.836-6.521,13.136-13.171c4.182-21.374,12.389-41.463,24.395-59.71c3.69-5.608,3.663-12.88-0.07-18.46 l-25.12-37.553l16.271-16.271l37.266,24.928c5.626,3.762,12.966,3.757,18.586-0.014c18.334-12.302,38.57-20.739,60.143-25.076 c6.612-1.329,11.775-6.505,13.087-13.119l8.685-43.784h23.011l8.686,43.784c1.312,6.615,6.475,11.79,13.087,13.119 c21.575,4.336,41.809,12.773,60.142,25.075c5.621,3.772,12.962,3.778,18.586,0.014l37.266-24.928l16.27,16.271l-25.12,37.554 c-3.733,5.58-3.76,12.852-0.07,18.46c12.005,18.247,20.213,38.335,24.395,59.71c1.3,6.649,6.49,11.852,13.136,13.171l44.725,8.873 V267.506z"
                  />
                </svg>

                <motion.div
                  style={{ rotate: innerRotation }}
                  className="absolute inset-0 flex items-center justify-center w-full h-full p-12 text-gold"
                >
                  <Image
                    src="/handshake-icon.svg"
                    alt="Handshake"
                    width={0}
                    height={0}
                    style={{
                      width: '100%',
                      height: '50%',
                      position: 'absolute',
                      top: '50px',
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-[60%] md:w-full">
            {/* MOBILE & TABLET: AUTO CAROUSEL */}
            <div className="lg:hidden block">
              <div className="relative h-[460px] flex items-center justify-center">
                {testimonials.map((t, index) => (
                  <Card
                    key={index}
                    className={`absolute w-full max-w-xl p-10 bg-white shadow-xl transition-all duration-700 ${
                      index === currentIndex
                        ? 'opacity-100 scale-100 z-10'
                        : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <Quote className="text-gold opacity-80 w-16 h-16 mb-6" />

                    <p className="text-xl text-gray-700 leading-relaxed italic mb-6">
                      "{t.content}"
                    </p>

                    {/* <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div> */}

                    <div className="font-semibold text-gold text-lg">
                      {t.name}
                    </div>
                    <div className="text-gray-700">
                      {t.role}, {t.company}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-3 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentIndex
                        ? 'w-8 h-3 bg-gold'
                        : 'w-3 h-3 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* DESKTOP: SCROLL-REVEAL TESTIMONIALS */}
            <div
              ref={testimonialsListRef}
              className="hidden lg:block space-y-12"
            >
              {testimonials.map((t, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: '-100px' }}
                >
                  <Card className="p-10 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm hover:shadow-xl transition duration-300">
                    <Quote className="text-gold opacity-80 w-14 h-14 mb-4" />
                    <p className="text-xl text-gray-700 italic leading-relaxed mb-4">
                      {t.content}
                    </p>

                    {/* <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                      ))}
                    </div> */}

                    <div className="font-bold text-gold text-lg">{t.name}</div>
                    <div className="text-gray-700">
                      {t.role}, {t.company}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
