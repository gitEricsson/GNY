'use client';

import { motion } from 'framer-motion';

export function ScrollingText() {
  const words = [
    'HR',
    'CONSULTING',
    'PEOPLE',
    'GROWTH',
    'STRATEGY',
    'SUCCESS',
    'TALENT',
  ];

  // Repeat words enough times to ensure no gaps during the loop
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    // Reduced padding and height by half
    <section className="py-5 bg-white relative overflow-hidden flex flex-col justify-center min-h-[100px]">
      {/* LAYER 1: Background Text */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: 'linear',
          }}
        >
          {repeatedWords.map((word, i) => (
            <span
              key={i}
              // Reduced text size by half
              className="text-3xl md:text-4xl font-bold mx-4 font-serif select-none"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* LAYER 2: Foreground Text (Masked) */}
      <div
        className="absolute inset-0 flex items-center z-10 pointer-events-none"
        style={{
          // Reduced clip radius by half
          clipPath: 'circle(96px at 50% 50%)',
          WebkitClipPath: 'circle(96px at 50% 50%)',
          // clipPath: 'circle(48px at 50% 50%)',
          // WebkitClipPath: 'circle(48px at 50% 50%)',
        }}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: 'linear',
          }}
        >
          {repeatedWords.map((word, i) => (
            <span
              key={i}
              // Reduced text size by half
              className="text-3xl md:text-4xl font-bold text-[#C9A961] mx-4 font-serif select-none"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>

      {/* LAYER 3: Lens Border */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {/* Reduced circle size by half */}
        {/* <div className="w-24 h-24 rounded-full border-[1px] border-[#C9A961]/50 shadow-[0_0_15px_rgba(201,169,97,0.2)] backdrop-blur-[1px]"></div> */}
      </div>
    </section>
  );
}
