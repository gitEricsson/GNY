'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react'; // Import for string-based icon resolution
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Interactive 3D Card Component
function Card3D({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative preserve-3d ${className}`}
      whileHover={{ scale: 1.02, rotateY: 5, rotateX: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function ServiceClient({
  service,
  isLoadingComplete,
}: {
  service: any;
  isLoadingComplete: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [showFirstVisual, setShowFirstVisual] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowFirstVisual((prev) => !prev);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Handle both String names (old data) and Component references (new data) for icons
  const Icon =
    service?.icon && typeof service.icon === 'string'
      ? (LucideIcons as any)[service.icon]
      : service?.icon || Zap;

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section with Parallax */}
      <section className="relative h-[55vh] overflow-hidden flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy-light">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: headerY, scale: 1.1 }}
            className="w-full h-full bg-[url('/office-team-meeting.jpg?height=1080&width=1920')] bg-cover bg-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy" />
        </div>

        {/* Animated Background Elements */}
        <motion.div
          animate={
            isLoadingComplete
              ? {
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }
              : {}
          }
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-[10%] opacity-10"
        >
          <Icon size={300} className="text-white" />
        </motion.div>

        {/* Floating accent shapes */}
        <motion.div
          animate={
            isLoadingComplete
              ? {
                  y: [0, 30, 0],
                  x: [0, 10, 0],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-[5%] w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            // FIX: Use animate based on loading state to ensure visibility after client-nav
            animate={
              isLoadingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8 }}
          >
            <Badge className="hidden md:inline-flex mb-8 bg-gold text-navy hover:bg-gold/90 animate-bounce ">
              {service.subtitle}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 tracking-tight font-serif text-balance">
              {service.title}
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section with Kinetic Typography */}
      {service.fullContent && (
        <section className="pt-12 pb-24 bg-gray-50 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Link href="/#services">
              <Button variant="ghost" className="mb-12 hover:bg-gray-100 group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Services
              </Button>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              // FIX: Use animate with delay instead of whileInView for the first content block
              // This fixes the "invisible on load" bug for content near the fold
              animate={isLoadingComplete ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                <h2 className="text-4xl font-bold text-navy mb-8 font-serif">
                  The Challenge
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
                  {service.fullContent.overview}
                </p>
                <div className="h-1 w-24 bg-gold rounded-full mb-8" />
                <h3 className="text-2xl font-bold text-navy mb-6">
                  Our Partnership Approach
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed text-justify">
                  {service.fullContent.pitch}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Approach Section - Interactive Split Layout */}
      {service.fullContent && (
        <section className="py-24 bg-navy relative overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="absolute -top-1/4 -right-1/4 w-[50%] h-[50%] bg-gold/20 rounded-full blur-[120px]" />
            <div className="absolute -bottom-1/4 -left-1/4 w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: The Content List */}
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <Badge className="bg-gold/20 text-gold hover:bg-gold/30 mb-4 border-none">
                    Our Process
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold text-white font-serif leading-tight">
                    Why Partner With Us?
                  </h2>
                </motion.div>

                {service.fullContent.approach.map(
                  (item: any, index: number) => {
                    const isActive =
                      hoveredFeature === index ||
                      (hoveredFeature === null && index === 0);

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredFeature(index)}
                        className={`group cursor-pointer relative pl-8 py-6 border-l-2 transition-all duration-300 ${
                          isActive ? 'border-gold' : 'border-white/10'
                        }`}
                      >
                        {/* Active Indicator Line */}
                        <div
                          className={`absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gold transition-all duration-500 ${
                            isActive ? 'h-full opacity-100' : 'h-0 opacity-0'
                          }`}
                        />

                        <h3
                          className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                            isActive
                              ? 'text-white'
                              : 'text-white/50 group-hover:text-white/80'
                          }`}
                        >
                          {item.title}
                        </h3>

                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? 'auto' : '0px',
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-300 leading-relaxed max-w-md">
                            {item.description}
                          </p>
                        </motion.div>
                      </motion.div>
                    );
                  }
                )}
              </div>

              {/* Right Column: Sticky Dynamic Visual */}
              <div className="hidden lg:block relative h-full min-h-[500px]">
                <div className="sticky top-32">
                  <div className="relative aspect-square max-w-md mx-auto">
                    {/* Glowing Backdrops */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 rounded-full border border-white/5 border-dashed"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-12 rounded-full border border-white/5"
                    />

                    {/* Dynamic Visual Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {service.fullContent.approach.map(
                          (_: any, index: number) => {
                            // Logic to determine active state
                            const isActive =
                              hoveredFeature === index ||
                              (hoveredFeature === null && index === 0);
                            if (!isActive) return null;

                            return (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                  opacity: 0,
                                  scale: 0.8,
                                  filter: 'blur(10px)',
                                }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                                className="relative flex items-center justify-center w-64 h-64"
                              >
                                {/* Glowing Atmospheric Backlight */}
                                <div className="absolute inset-0 bg-gold/10 blur-[60px] rounded-full" />

                                {/* VISUAL 1: PRECISION / DIAGNOSIS (Rotating Radar Rings) */}
                                {index === 0 && (
                                  <div className="relative w-48 h-48 flex items-center justify-center">
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: 'linear',
                                      }}
                                      className="absolute inset-0 border border-gold/30 rounded-full border-dashed"
                                    />
                                    <motion.div
                                      animate={{ rotate: -360 }}
                                      transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: 'linear',
                                      }}
                                      className="absolute inset-4 border border-white/20 rounded-full"
                                    />
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                      }}
                                      className="w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_rgba(201,169,97,0.8)]"
                                    />
                                    {/* Crosshairs */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-full h-[1px] bg-gold/20" />
                                      <div className="h-full w-[1px] bg-gold/20 absolute" />
                                    </div>
                                    {/* Scanning Beam */}
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: 'linear',
                                      }}
                                      className="absolute inset-0 bg-gradient-to-t from-transparent via-gold/10 to-transparent w-[1px] h-full mx-auto"
                                    />
                                  </div>
                                )}

                                {/* VISUAL 2: STRUCTURE / CLARITY (Floating Isometric Stack) */}
                                {/* --- VISUAL 2: THE CONSTRUCT (Structure, Design, Strategy) --- */}
                                {index === 1 && (
                                  <AnimatePresence mode="wait">
                                    {showFirstVisual ? (
                                      // Floating Stack (First Animation)
                                      <motion.div
                                        key="floating-stack"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-40 h-40"
                                      >
                                        {/* Floating stack content */}
                                        {[0, 1, 2].map((i) => (
                                          <motion.div
                                            key={i}
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{
                                              y: i * -15,
                                              opacity: 1 - i * 0.2,
                                            }}
                                            transition={{
                                              delay: i * 0.2,
                                              duration: 0.8,
                                            }}
                                            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-navy-light to-[#1A3A52] border border-white/10 rounded-xl shadow-lg transform rotate-3"
                                            style={{
                                              zIndex: 3 - i,
                                              transform: `scale(${
                                                1 - i * 0.1
                                              })`,
                                            }}
                                          >
                                            <div className="absolute inset-0 bg-white/5 rounded-xl" />
                                          </motion.div>
                                        ))}
                                      </motion.div>
                                    ) : (
                                      <motion.div
                                        key="grid-construct"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-40 h-40 grid grid-cols-2 grid-rows-2 gap-2 transform rotate-45"
                                      >
                                        {/* Grid construct content */}
                                        {[0, 1, 2, 3].map((i) => (
                                          <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                              delay: i * 0.1,
                                              duration: 0.5,
                                            }}
                                            className="relative bg-navy-light/30 border border-white/10 rounded-lg backdrop-blur-sm overflow-hidden"
                                          >
                                            <motion.div
                                              animate={{
                                                opacity: [0.2, 0.6, 0.2],
                                                x: ['-100%', '100%'],
                                              }}
                                              transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.5,
                                                ease: 'easeInOut',
                                              }}
                                              className="absolute inset-0 bg-gold/20 skew-x-12"
                                            />
                                          </motion.div>
                                        ))}
                                        <div className="absolute inset-0 border-2 border-gold/20 rounded-lg scale-110" />
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                )}

                                {/* VISUAL 3: PEOPLE / CULTURE (Network Constellation) */}
                                {index === 2 && (
                                  <div className="relative w-48 h-48">
                                    {/* Central Hub */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-navy-light rounded-full border-2 border-gold/50 flex items-center justify-center z-10 shadow-xl">
                                      <Users className="text-white w-8 h-8" />
                                    </div>

                                    {/* Orbiting Nodes */}
                                    {[0, 1, 2, 3].map((i) => (
                                      <motion.div
                                        key={i}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                          duration: 20 - i * 2,
                                          repeat: Infinity,
                                          ease: 'linear',
                                        }}
                                        className="absolute inset-0"
                                      >
                                        <motion.div
                                          className="absolute w-3 h-3 bg-white rounded-full shadow-lg"
                                          style={{
                                            top: '50%',
                                            left: '50%',
                                            transform: `translate(${
                                              50 + i * 25
                                            }px, -50%)`,
                                          }}
                                        >
                                          <div className="absolute inset-0 animate-ping bg-white/50 rounded-full" />
                                        </motion.div>
                                        {/* Connecting Line */}
                                        <div
                                          className="absolute top-1/2 left-1/2 h-[1px] bg-white/10 origin-left"
                                          style={{ width: `${50 + i * 25}px` }}
                                        />
                                        {/* Orbital Path */}
                                        <div
                                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                                          style={{
                                            width: `${100 + i * 50}px`,
                                            height: `${100 + i * 50}px`,
                                          }}
                                        />
                                      </motion.div>
                                    ))}
                                  </div>
                                )}

                                {/* VISUAL 4: IMPACT / PERFORMANCE (Rising Data Bars) */}
                                {index === 3 && (
                                  <div className="relative w-48 h-48 flex items-end justify-center gap-3 pb-8">
                                    {[0, 1, 2, 3].map((i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ height: '10%' }}
                                        animate={{
                                          height: [
                                            `${20 + i * 15}%`,
                                            `${40 + i * 20}%`,
                                            `${20 + i * 15}%`,
                                          ],
                                        }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          delay: i * 0.2,
                                        }}
                                        className="w-8 bg-gradient-to-t from-gold/20 to-gold rounded-t-lg relative"
                                      >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/50" />
                                      </motion.div>
                                    ))}
                                    {/* <motion.div
                                      animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0.5, 1.5, 0.5],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                      }}
                                      className="absolute top-10 right-10"
                                    >
                                      <Sparkles className="text-white w-8 h-8" />
                                    </motion.div> */}
                                  </div>
                                )}

                                {/* Decorative Number Background */}
                                <div className="absolute -top-12 -right-12 text-[140px] font-serif font-bold text-white/5 pointer-events-none select-none z-0">
                                  0{index + 1}
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {service.fullContent && (
        <section className="pt-24 pb-48 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-navy mb-8 font-serif">
                {service.fullContent.cta}
              </h2>
              <div className="container mx-auto px-4 text-center">
                <p className="text-gray-600 mb-6">
                  Ready to transform your {service.title.toLowerCase()}?
                </p>
                <Link href="/#contact">
                  <Button
                    size="lg"
                    className="bg-gold text-white border border-gold hover:border-gold hover:bg-white hover:text-gold transition-all duration-300 font-semibold relative overflow-hidden group"
                  >
                    Get in Touch Today
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-black/10 transform scale-0 group-active:scale-150 transition-transform duration-500 rounded-full origin-center"></div>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
      {/* Curved Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-navy-dark"
        style={{ clipPath: 'ellipse(100% 100% at 50% 100%)' }}
      />
    </div>
  );
}

// {/* Alternative Content Section */}
//        <section className="py-24 relative overflow-hidden">
//          <div className="container mx-auto px-4">
//            <Link href="/#services">
//              <Button variant="ghost" className="mb-12 hover:bg-gray-100 group">
//                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
//                Back to Services
//              </Button>
//            </Link>

//             <div className="grid lg:grid-cols-2 gap-16 items-center">
//              {/* Animated Features List */}
//              <motion.div
//                  initial={{ opacity: 0, x: -50 }}
//                  // This ensures the element is visible on mount after client-side navigation.
//                  animate={isLoadingComplete ? { opacity: 1, x: 0 } : {}}
//                  // whileInView={isLoadingComplete ? { opacity: 1, x: 0 } : {}}

//                  viewport={{ once: true }}

//                  transition={{ duration: 0.6, delay: 0.2 }}
//              >
//                <h2 className="text-3xl font-bold text-navy mb-8">
//                  Key Benefits
//                </h2>
//                <div className="space-y-6">
//                  {service.features.map((feature: string, index: number) => (
//                    <Card3D key={index}>
//                      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all group cursor-default">
//                        <div className="flex items-center gap-4">
//                          <div
//                            className={`p-3 rounded-full ${service.bg} group-hover:scale-110 transition-transform`}
//                          >
//                            <CheckCircle2
//                              className={`h-6 w-6 ${service.color}`}
//                            />
//                          </div>
//                          <span className="text-lg font-medium text-navy group-hover:text-gold transition-colors">
//                            {feature}
//                          </span>
//                        </div>
//                      </div>
//                    </Card3D>
//                  ))}
//                </div>
//              </motion.div>

//              {/* Interactive Visual */}
//                 <motion.div
//                  initial={{ opacity: 0, scale: 0.8 }}
//                  animate={isLoadingComplete ? { opacity: 1, scale: 1 } : {}}
//                  // whileInView={isLoadingComplete ? { opacity: 1, scale: 1 } : {}}

//                  viewport={{ once: true }}
//                  transition={{ duration: 0.8, delay: 0.4 }}
//                  className="relative"
//              >
//                <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
//                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-6 relative group">
//                    <motion.div
//                      className="absolute inset-0 bg-gradient-to-br from-navy/5 to-gold/5"
//                      whileHover={{ scale: 1.05 }}
//                      transition={{ duration: 0.4 }}
//                    />
//                    <div className="absolute inset-0 flex items-center justify-center">
//                      {/* use resolved Icon component here as well */}
//                      <Icon
//                        size={80}
//                        className={`${service.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}
//                      />
//                    </div>
//                  </div>
//                  <h3 className="text-2xl font-bold text-navy mb-2">
//                    Ready to transform?
//                  </h3>
//                  <p className="text-gray-600 mb-6">
//                    Get in touch with our expert team to discuss how we can help
//                    implement {service.title.toLowerCase()} in your organization.
//                  </p>
//                  <Link href="/#contact">
//                    <Button className="w-full bg-navy hover:bg-navy-light text-white group">
//                      Get Started{" "}
//                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                    </Button>
//                  </Link>
//                </div>

//                {/* Background Blob (No change needed - using CSS animation) */}
//                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-navy-light/20 to-gold/20 rounded-full blur-3xl -z-10 animate-pulse-subtle" />
//              </motion.div>
//            </div>
//          </div>
//        </section>
