'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

// Define the animation variants for the staggered text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between each child's animation
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      // ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Increase duration to ensure all staggered elements are visible before unmounting
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 3000); // Increased to 4.5s for a smoother, longer animation sequence

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white h-screen w-full"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* 1. Logo Fade-In */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mb-6"
            >
              <Image
                src="/logo.png"
                alt="Gloria & Young Logo"
                width={150}
                height={150}
                priority={true} // High priority for loading screen logo
              />
            </motion.div>

            {/* 2. Text Fade-In (Staggered) */}
            <motion.h1
              className="text-3xl font-bold text-[#1A3A52] font-serif"
              variants={itemVariants}
            >
              Gloria & Young
            </motion.h1>
            <motion.p
              className="text-gold mt-1 tracking-widest uppercase text-lg"
              variants={itemVariants}
            >
              HR Consulting Ltd
            </motion.p>
            {/* 3. Motto Fade-In (Slightly more delayed) */}
            <motion.p
              className="text-[#1A3A52] mt-4 text-sm font-medium italic"
              variants={itemVariants}
            >
              Your Culture. Your People. Your Growth. Our Expertise.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
