'use client';

import { Button } from '@/components/ui/button';
import { Award, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

function Counter({
  from,
  to,
  label,
  to: number,
  label: string,
  symbol = '',
  isLoadingComplete,
}: {
  from: number;
  to: number;
  label: string;
  symbol?: string;
  isLoadingComplete?: boolean;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && isLoadingComplete) {
      const duration = 2500;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = (to - from) / steps;
      let current = from;

      const timer = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, from, to, isLoadingComplete]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-navy mb-1">
        {count}
        {symbol}
      </div>
      {label && <div className="text-sm text-gray-700">{label}</div>}
    </div>
  );
}

function TypewriterText({
  isLoadingComplete,
}: {
  isLoadingComplete?: boolean;
}) {
  const words = ['Growth', 'People', 'Culture'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    if (!isLoadingComplete) return;

    const handleType = () => {
      const fullText = words[currentWordIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    words,
    currentWordIndex,
    typingSpeed,
    isLoadingComplete,
  ]);

  return (
    <span className="text-gold relative">
      {currentText}
      <span className="typewriter-cursor"></span>
    </span>
  );
}

export default function Hero({
  isLoadingComplete,
}: {
  isLoadingComplete?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* <div className="absolute inset-0 opacity-100 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[200%] h-full flex animate-wave">
          <div className="w-1/2 h-full bg-[url('/wave-pattern.jpg?key=no8l3')] bg-repeat-x bg-contain opacity-30"></div>
          <div className="w-1/2 h-full bg-[url('/wave-pattern.jpg?key=8eltn')] bg-repeat-x bg-contain opacity-30"></div>
        </div>
      </div> */}

      {/* Background Decorative Elements */}
      <div
        className={`absolute top-20 left-0 w-96 h-96 bg-navy-light/15 rounded-full blur-3xl ${
          isLoadingComplete ? 'animate-float' : ''
        }`}
      />
      <div
        className={`absolute bottom-20 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl ${
          isLoadingComplete ? 'animate-float' : ''
        }`}
        style={{ animationDelay: '1s' }}
      />

      {/* Dot Pattern */}
      {/* <motion.div
        animate={isLoadingComplete ? { y: [0, -15, 0] } : { y: 0 }}
        transition={
          isLoadingComplete
            ? {
                repeat: Number.POSITIVE_INFINITY,
                duration: 12,
                ease: 'easeInOut',
                delay: 1,
              }
            : {}
        }
        className="absolute top-40 left-10 grid grid-cols-6 gap-2 opacity-30"
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-navy rounded-full" />
        ))}
      </motion.div> */}

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-0 lg:gap-12 items-center relative z-10">
        <motion.div
          initial={false}
          animate={
            isLoadingComplete ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.8, delay: isLoadingComplete ? 0.5 : 0 }}
          className="text-white space-y-6"
        >
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy text-balance">
              Your <TypewriterText isLoadingComplete={isLoadingComplete} />
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy text-balance mb-12">
              Our Expertise
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed max-w-xl">
              At Gloria & Young HR Consulting Ltd, we help businesses build
              stronger teams, optimize workplace systems, and create
              environments where people thrive.
            </p>
          </div>

          <div className="flex lg:flex-wrap gap-4 mb-12">
            <a href="#services" className="block w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-[#1A3A52] text-white border hover:border-[#1A3A52] hover:bg-white hover:text-[#1A3A52] transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">View Our Services</span>
                <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full origin-center"></div>
              </Button>
            </a>
            <a href="#contact" className="block w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-gold text-white border hover:border-gold hover:bg-white hover:text-gold transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-black/10 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full origin-center"></div>
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 justify-items-start">
            {[
              { icon: Users, value: 100, label: 'Clients Served', symbol: '+' },
              {
                icon: Award,
                value: 15,
                label: 'Years Experience',
                symbol: '+',
              },
              {
                icon: TrendingUp,
                value: 98,
                label: 'Success Rate',
                symbol: '%',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-gold" />
                <div className="text-4xl font-bold text-navy">
                  <Counter
                    from={0}
                    to={stat.value}
                    label=""
                    symbol={stat.symbol}
                    isLoadingComplete={isLoadingComplete}
                  />
                </div>
                <div className="text-sm text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ y }}
          initial={false}
          animate={
            isLoadingComplete
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: isLoadingComplete ? 0.7 : 0 }}
          className="relative h-[400px] md:h-[600px] lg:h-[600px] lg:block will-change-transform"
        >
          <Image
            src="/hand-drawn-african-american-businesswoman-cartoon-illustration.png"
            alt="HR Consultation"
            fill
            className="object-contain md:object-cover lg:object-cover"
            priority
          />

          {/* Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute top-62 lg:top-85 md:top-85 -left-2 md:-left-10 lg:-left-10"
          >
            <motion.div
              className="bg-white p-2.5 rounded-lg shadow-xl"
              animate={isLoadingComplete ? { y: [0, -15, 0] } : { y: 0 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                <div className="bg-green-100 p-2 rounded-full flex items-center justify-center">
                  <Award
                    className="w-4 h-4 md:w-6 md:h-6 lg:w-6 lg:h-6 text-green-600"
                    size={24}
                  />
                </div>
                <div>
                  <div className="text-sm md:text-lg lg:text-lg font-bold text-navy">
                    100%
                  </div>
                  <div className="text-xs md:text-xs lg:text-xs text-gray-500">
                    Client Satisfaction
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
