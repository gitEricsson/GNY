'use client';

import { useRef, useContext, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  Target,
  Lightbulb,
  Heart,
  Shield,
  Star,
  Users,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoadingContext } from '@/components/client-layout-wrapper';

// --- Components ---

// 1. Kinetic Geometric Background
const KineticBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] border border-navy/5 rounded-full border-dashed"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[10%] -left-[10%] w-[60vw] h-[60vw] border border-gold/10 rounded-full"
      />
    </div>
  );
};

// 2. Animated Value Card (I.I.E.E.P)
const ValueCard = ({
  title,
  desc,
  icon: Icon,
  index,
  letter,
}: {
  title: string;
  desc: string;
  icon: any;
  index: number;
  letter: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white p-8 border-l-4 border-navy hover:border-gold shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-8xl font-serif font-bold text-navy">
          {letter}
        </span>
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-navy mb-4 font-serif">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

// 3. Parallax Image Component
const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={ref}
      className="relative w-full h-[600px] overflow-hidden rounded-2xl"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy/10 hover:bg-transparent transition-colors duration-500" />
    </div>
  );
};

export default function AboutPage() {
  const isLoadingComplete = useContext(LoadingContext);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-navy">
        {/* Animated Geometric Abstract (The "System") */}
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-dark to-navy opacity-90 z-10" />
          {/* Abstract geometric lines representing structure */}
          <svg className="absolute inset-0 w-full h-full z-0">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        <div className="container mx-auto p-8 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-block mb-8 px-4 py-1 border border-gold/50 rounded-full text-gold text-sm tracking-widest uppercase bg-navy-dark/50 backdrop-blur-md">
              Who We Are
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12 font-serif tracking-tight text-balance leading-tight">
              Building <span className="text-gold italic">People.</span> <br />
              Strengthening{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
                Systems.
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              We combine strategic insight with practical execution to create
              workplaces where talent, culture, and business strategy work
              seamlessly together.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isLoadingComplete
              ? {
                  opacity: 1,
                  y: [0, 10, 0],
                  transition: {
                    y: {
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: 'easeInOut',
                    },
                    opacity: { duration: 0.8 },
                  },
                }
              : {}
          }
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div> */}
      </section>

      {/* --- INTRODUCTION & PHILOSOPHY (Split Layout) --- */}
      <section className="py-24 relative">
        <KineticBackground />
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/#about">
            <Button variant="ghost" className="mb-12 hover:bg-gray-100 group">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to About
            </Button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/*  */}
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl" />
                <h2 className="text-5xl md:text-6xl font-bold text-navy mb-8 font-serif leading-none">
                  Unlocking <br /> Workforce <br /> Potential.
                </h2>
                <div className="h-2 w-24 bg-gold mb-8" />
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Gloria & Young HR Consulting Ltd is a people–focused
                  consulting firm. Built on the pillars of{' '}
                  <strong>integrity, excellence, and innovation</strong>, we
                  deliver tailored HR solutions that strengthen systems, empower
                  people, and drive long-term organizational success.
                </p>
                <p className="text-lg text-gray-600 italic border-l-4 border-gold pl-6 py-2">
                  "We believe that when people thrive, businesses transform."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-navy p-12 rounded-3xl text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="space-y-12 relative z-10">
                <div>
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-3">
                    Our Core Focus
                  </h3>
                  <p className="text-lg font-light">
                    Delivering strategic, data-driven HR solutions that enhance
                    organizational performance, improve employee productivity,
                    and support sustainable business growth.
                  </p>
                </div>
                <div>
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-3">
                    Mission
                  </h3>
                  <p className="text-lg font-light">
                    To provide innovative, ethical, and result-oriented HR
                    solutions tailored to the unique needs of every client.
                  </p>
                </div>
                <div>
                  <h3 className="text-gold text-sm uppercase tracking-widest mb-3">
                    Vision
                  </h3>
                  <p className="text-lg font-light">
                    To become a leading HR consulting firm recognized for
                    transforming workplaces and empowering people across the
                    globe.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CORE VALUES (I.I.E.E.P) --- */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        {/* Animated Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03]">
          <h1 className="text-[20vw] font-bold font-serif text-navy">VALUES</h1>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 font-serif">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The I.I.E.E.P Framework that guides every interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <ValueCard
              letter="I"
              index={0}
              icon={Lightbulb}
              title="Innovation"
              desc="We think forward, embrace change, and continuously evolve to deliver modern, effective HR practices."
            />
            <ValueCard
              letter="I"
              index={1}
              icon={Shield}
              title="Integrity"
              desc="We do what is right always, with honesty, transparency, and accountability."
            />
            <ValueCard
              letter="E"
              index={2}
              icon={Star}
              title="Excellence"
              desc="We uphold high standards, delivering solutions that exceed expectations and create measurable impact."
            />
            <ValueCard
              letter="E"
              index={3}
              icon={Heart}
              title="Empathy"
              desc="We treat every individual with fairness, respect, and understanding."
            />
            <ValueCard
              letter="P"
              index={4}
              icon={Users}
              title="Professionalism"
              desc="We operate with competence, confidentiality, and global HR best practices in every engagement."
            />
          </div>
        </div>
      </section>

      {/* --- OUR STORY (Timeline/Parallax) --- */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              {/*  */}
              <ParallaxImage src="/brand-office.jpg" alt="Our Story Visual" />
            </div>
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-8 font-serif">
                  Our Story
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Gloria & Young began from a genuine passion for people,
                    leadership, and organizational transformation. The firm was
                    born from{' '}
                    <span className="font-semibold text-navy">
                      Dr. Gloria’s
                    </span>{' '}
                    long-standing commitment to supporting
                    organizations—particularly after repeatedly being sought out
                    by business leaders who relied on her expertise for their HR
                    challenges.
                  </p>
                  <p>
                    What started as a personal desire to help others evolve has
                    grown into a full-fledged HR consulting company known for
                    bridging the gap between organizations and their most
                    valuable asset:{' '}
                    <span className="bg-gold/20 px-2 py-1 rounded">
                      their people
                    </span>
                    .
                  </p>
                  <p>
                    Today, we are proud to partner with businesses across
                    industries, helping them build stronger teams, better
                    systems, and thriving workplaces.
                  </p>
                </div>
                <div className="mt-10">
                  <Link href="/#contact">
                    <Button
                      size="lg"
                      className="bg-navy text-white border hover:border-navy hover:bg-white hover:text-navy text-lg transition-all duration-300 relative overflow-hidden group"
                    >
                      Start Your Transformation{' '}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full origin-center"></div>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE FOUNDER (Dr. Gloria) --- */}
      <section className="py-32 bg-navy text-white relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/classy-fabric.png')] mix-blend-overlay opacity-90" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold text-gold tracking-widest uppercase mb-4">
              Leadership
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif">
              Meet Our Founder
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                {/*  */}
                {/* <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold/30"> */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image
                    src="/founder.png"
                    alt="Dr. Gloria Nnedinso Raphael"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy to-transparent p-8">
                    <h4 className="text-2xl font-bold font-serif">
                      Dr. Gloria N. Raphael
                    </h4>
                    <p className="text-gold">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="prose prose-lg prose-invert text-gray-300">
                <p className="text-lg leading-relaxed font-light text-white">
                  Dr. Gloria Nnedinso Raphael is a visionary HR leader and
                  organizational strategist with a distinguished career spanning
                  leadership development, human capital management, and business
                  transformation. As the Founder and CEO/Managing Director of
                  Gloria & Young HR Consulting Ltd, she brings decades of
                  expertise in building empowered teams, strengthening workplace
                  systems, and guiding organizations through sustainable growth.
                  Before establishing Gloria & Young, Dr. Gloria served in
                  several top-level executive roles, including Group Executive
                  Director, Franchise Development, and Executive Director, Human
                  Capital Management at PWAN Group/Homes Ltd.
                </p>
              </div>

              {/* Leadership Grid */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/50 transition-colors">
                  <Target className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-xl font-bold mb-4 font-serif">
                    Leadership Approach
                  </h4>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Identify root problems
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Craft creative, practical solutions
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Align HR interventions with goals
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Drive performance & accountability
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/50 transition-colors">
                  <Lightbulb className="w-8 h-8 text-gold mb-4" />
                  <h4 className="text-xl font-bold mb-4 font-serif">
                    Core Strengths
                  </h4>
                  <ul className="space-y-3 text-gray-300 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Public speaking and facilitation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Teaching, training, and coaching
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      HR strategy & organizational analysis
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold mt-1 shrink-0" />{' '}
                      Authentic & Purpose-driven
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gold/10 p-8 rounded-xl border-l-4 border-gold mt-8">
                <Quote className="w-8 h-8 text-gold mb-4 opacity-50" />
                <p className="italic text-lg text-white">
                  I believe strongly in collaborative teamwork, agile thinking,
                  and building work environments where people are valued and
                  inspired to do their best.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 pb-48 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-navy mb-8 font-serif">
            Ready to transform your workforce?
          </h2>
          <Link href="/#contact">
            <Button
              size="lg"
              className="bg-navy text-white border hover:border-navy hover:bg-white hover:text-navy px-12 py-8 text-xl transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              Connect With Us
              <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full origin-center"></div>
            </Button>
          </Link>
        </div>
      </section>

      {/* Curved Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-navy-dark"
        style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}
      />
    </div>
  );
}
